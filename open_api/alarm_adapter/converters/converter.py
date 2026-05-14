import logging
from datetime import datetime
import uuid

from open_api.alarm_adapter.datadict.constraints import SYSHEAD_ECHO_FIELDS, PROVIDER_CONFIG
from open_api.alarm_adapter.datadict.mapping import (
    ESB_TO_PLATFORM_BODY_MAPPING,
    ESB_ACTION_TO_PLATFORM,
    ESB_LEVEL_TO_PLATFORM,
)

logger = logging.getLogger(__name__)

_INT_CONVERT_FIELDS = {"bk_inst_id", "bk_biz_id"}

_MAPPING_FIELDS = {
    "action": ESB_ACTION_TO_PLATFORM,
    "level": ESB_LEVEL_TO_PLATFORM,
}


def build_response_syshead(request_syshead, ret_cd_type, ret_cd, ret_inf, err_sys_ind=""):
    sysHead = {}

    sysHead["retCdType"] = ret_cd_type
    sysHead["retCd"] = ret_cd
    sysHead["retInf"] = ret_inf
    sysHead["errSysInd"] = err_sys_ind

    now = datetime.now()
    sysHead["pvdrTxnDt"] = now.strftime("%Y%m%d")
    sysHead["pvdrTxnTm"] = now.strftime("%H%M%S")
    sysHead["pvdrSysInd"] = PROVIDER_CONFIG["pvdrSysInd"]
    sysHead["pvdrSysSrlNo"] = _generate_provider_serial_no()

    for field in SYSHEAD_ECHO_FIELDS:
        sysHead[field] = request_syshead.get(field, "")

    return sysHead


def _generate_provider_serial_no():
    raw = datetime.now().strftime("%Y%m%d%H%M%S") + uuid.uuid4().hex[:16]
    return raw[:30]


def _try_convert_int(value, field_name):
    if field_name in _INT_CONVERT_FIELDS and isinstance(value, str):
        try:
            return int(value)
        except (ValueError, TypeError):
            logger.warning("字段%s值'%s'无法转为整数，保留原始字符串", field_name, value)
    return value


def _try_convert_mapping(value, field_name):
    mapping = _MAPPING_FIELDS.get(field_name)
    if mapping and isinstance(value, str):
        mapped = mapping.get(value)
        if mapped:
            logger.info("字段%s值'%s'通过映射转换为'%s'", field_name, value, mapped)
            return mapped
    return value


def convert_esb_body_to_platform(esb_body):
    platform_body = {}
    for esb_field, config in ESB_TO_PLATFORM_BODY_MAPPING.items():
        target_field = config["target"]
        value = esb_body.get(esb_field)

        if value is None or value == "":
            default = config.get("default")
            if default is not None:
                value = default
            elif not config.get("required"):
                continue
            else:
                continue

        value = _try_convert_mapping(value, target_field)
        value = _try_convert_int(value, target_field)
        platform_body[target_field] = value

    return platform_body


def convert_platform_resp_to_esb_body(platform_resp):
    from open_api.alarm_adapter.datadict.constraints import PLATFORM_RESP_TO_ESB_BODY

    esb_body = {}
    for platform_key, esb_key in PLATFORM_RESP_TO_ESB_BODY.items():
        value = platform_resp.get(platform_key)
        esb_body[esb_key] = value

    return esb_body
