import json
import logging

from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from open_api.alarm_adapter.validators.validator import validate_syshead, validate_body
from open_api.alarm_adapter.converters.converter import convert_esb_body_to_platform
from open_api.alarm_adapter.converters.response_builder import build_esb_response, build_esb_error_response
from open_api.alarm_adapter.clients.alarm_client import alarm_platform_client

logger = logging.getLogger(__name__)


@method_decorator(csrf_exempt, name="dispatch")
class AlarmEventReportView(View):
    def post(self, request):
        try:
            request_data = json.loads(request.body)
        except (json.JSONDecodeError, ValueError) as e:
            logger.error("请求体JSON解析失败: %s", str(e))
            return JsonResponse(
                build_esb_error_response(
                    request_sys_head={},
                    ret_cd_type="E",
                    ret_cd="140000",
                    ret_inf="请求体JSON格式错误",
                ),
                status=200,
            )

        sys_head = request_data.get("sysHead", {})
        body = request_data.get("body", {})

        if not sys_head:
            return JsonResponse(
                build_esb_error_response(
                    request_sys_head={},
                    ret_cd_type="E",
                    ret_cd="140000",
                    ret_inf="sysHead不能为空",
                ),
                status=200,
            )

        if not body:
            return JsonResponse(
                build_esb_error_response(
                    request_sys_head=sys_head,
                    ret_cd_type="E",
                    ret_cd="140000",
                    ret_inf="body不能为空",
                ),
                status=200,
            )

        syshead_errors = validate_syshead(sys_head)
        if syshead_errors:
            error_msgs = "; ".join(["{field}:{message}".format(field=e.field, message=e.message) for e in syshead_errors])
            logger.warning("sysHead校验失败: %s", error_msgs)
            return JsonResponse(
                build_esb_error_response(
                    request_sys_head=sys_head,
                    ret_cd_type="E",
                    ret_cd="140000",
                    ret_inf=error_msgs,
                ),
                status=200,
            )

        body_errors = validate_body(body)
        if body_errors:
            error_msgs = "; ".join(["{field}:{message}".format(field=e.field, message=e.message) for e in body_errors])
            logger.warning("body校验失败: %s", error_msgs)
            return JsonResponse(
                build_esb_error_response(
                    request_sys_head=sys_head,
                    ret_cd_type="E",
                    ret_cd="140000",
                    ret_inf=error_msgs,
                ),
                status=200,
            )

        platform_body = convert_esb_body_to_platform(body)
        logger.info(
            "ESB body转换完成: glbSrlNo=%s, platform_body=%s",
            sys_head.get("glbSrlNo", ""),
            platform_body,
        )

        platform_resp = alarm_platform_client.report_alarm(platform_body)

        esb_response = build_esb_response(
            request_sys_head=sys_head,
            platform_resp=platform_resp,
        )

        return JsonResponse(esb_response, status=200)


@method_decorator(csrf_exempt, name="dispatch")
class HealthCheckView(View):
    def get(self, request):
        return JsonResponse({"status": "ok"})
