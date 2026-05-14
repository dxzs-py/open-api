import json
import logging

from django.http import JsonResponse

from open_api.alarm_adapter.datadict.constraints import X_SECRET

logger = logging.getLogger(__name__)

ESB_AUTH_PATH_PREFIX = "/api/esb/"
ESB_AUTH_SKIP_PATHS = ["/api/esb/health/"]


def _build_auth_error_response():
    from datetime import datetime

    now = datetime.now()
    return {
        "sysHead": {
            "retCdType": "A",
            "retCd": "150000",
            "retInf": "认证失败，请检查xSecret",
            "errSysInd": "IOMMP",
            "pvdrTxnDt": now.strftime("%Y%m%d"),
            "pvdrTxnTm": now.strftime("%H%M%S"),
            "pvdrSysInd": "IOMMP",
            "pvdrSysSrlNo": "",
        },
        "body": {
            "rsltInf": False,
            "retCd": "150000",
            "dataFieldAry": [],
            "msgCntntDsc": "认证失败，请检查xSecret",
        },
    }


class ESBAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not self._should_check(request):
            return self.get_response(request)

        auth_result = self._check_xsecret(request)
        if auth_result["should_block"]:
            logger.warning("ESB认证失败: %s", auth_result["error"])
            return JsonResponse(_build_auth_error_response(), status=200)

        return self.get_response(request)

    def _should_check(self, request):
        path = request.path
        if not path.startswith(ESB_AUTH_PATH_PREFIX):
            return False
        for skip_path in ESB_AUTH_SKIP_PATHS:
            if path.startswith(skip_path):
                return False
        if request.method != "POST":
            return False
        return True

    def _check_xsecret(self, request):
        body_raw = request.body
        try:
            body = json.loads(body_raw)
        except (json.JSONDecodeError, ValueError):
            logger.warning("请求体JSON解析失败，将由views层处理")
            return {"should_block": False, "error": "请求体JSON解析失败"}

        sys_head = body.get("sysHead", {})
        if not sys_head:
            logger.warning("sysHead为空，将由views层处理")
            return {"should_block": False, "error": "sysHead不能为空"}

        x_secret = sys_head.get("xSecret", "")
        if not x_secret:
            return {"should_block": True, "error": "xSecret不能为空"}

        if str(x_secret) != X_SECRET:
            return {"should_block": True, "error": "xSecret认证失败"}

        return {"should_block": False, "error": None}
