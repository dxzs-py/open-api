import logging

from open_api.alarm_adapter.converters.converter import build_response_syshead, convert_platform_resp_to_esb_body
from open_api.alarm_adapter.datadict.mapping import PLATFORM_CODE_TO_ESB, DEFAULT_ERROR_MAPPING

logger = logging.getLogger(__name__)

def build_esb_response(request_sys_head, platform_resp):
    platform_code = str(platform_resp.get("code", ""))

    mapping = PLATFORM_CODE_TO_ESB.get(platform_code, DEFAULT_ERROR_MAPPING)
    ret_cd_type = mapping["retCdType"]
    ret_cd = mapping["retCd"]
    ret_inf = mapping["retInf"]

    if ret_cd_type == "N":
        err_sys_ind = ""
    else:
        err_sys_ind = "IOMMP"
        if ret_cd_type == "S":
            ret_inf = "暂时未能处理您的请求"
        elif ret_cd_type == "E":
            platform_message = platform_resp.get("message", "")
            if platform_message:
                ret_inf = platform_message

    sys_header = build_response_syshead(
        request_syshead=request_sys_head,
        ret_cd_type=ret_cd_type,
        ret_cd=ret_cd,
        ret_inf=ret_inf,
        err_sys_ind=err_sys_ind,
    )

    esb_body = convert_platform_resp_to_esb_body(platform_resp)
    esb_body["retCd"] = ret_cd

    response = {
        "sysHead": sys_header,
        "body": esb_body,
    }

    logger.info(
        "ESB响应构建完成: retCdType=%s, retCd=%s, glbSrlNo=%s",
        ret_cd_type,
        ret_cd,
        request_sys_head.get("glbSrlNo", ""),
    )

    return response


def build_esb_error_response(request_sys_head, ret_cd_type, ret_cd, ret_inf, err_sys_ind="IOMMP"):
    sys_header = build_response_syshead(
        request_syshead=request_sys_head,
        ret_cd_type=ret_cd_type,
        ret_cd=ret_cd,
        ret_inf=ret_inf,
        err_sys_ind=err_sys_ind,
    )

    return {
        "sysHead": sys_header,
        "body": {
            "rsltInf": False,
            "retCd": ret_cd,
            "dataFieldAry": [],
            "msgCntntDsc": ret_inf,
        },
    }
