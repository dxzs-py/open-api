ESB_TO_PLATFORM_BODY_MAPPING = {
    "ipAdr": {"target": "ip", "required": True, "max_length": 50},
    "bgnTm": {"target": "source_time", "required": True, "max_length": 19},
    "eventType": {"target": "alarm_type", "required": True, "max_length": 19},
    "evltLvl": {"target": "level", "required": True, "max_length": 10},
    "qstNm": {"target": "alarm_name", "required": True, "max_length": 128},
    "cntntInf": {"target": "alarm_content", "required": True, "max_length": 1000},
    "rmkInf": {"target": "meta_info", "required": False, "max_length": 256},
    "actnType": {"target": "action", "required": False, "max_length": 3, "default": "firing"},
    "kbObjId": {"target": "bk_obj_id", "required": False, "max_length": 32},
    "bkInstId": {"target": "bk_inst_id", "required": False, "max_length": 32},
    "kbBizId": {"target": "bk_biz_id", "required": False, "max_length": 32},
}

PLATFORM_TO_ESB_BODY_MAPPING = {}
for _esb_field, _cfg in ESB_TO_PLATFORM_BODY_MAPPING.items():
    PLATFORM_TO_ESB_BODY_MAPPING[_cfg["target"]] = _esb_field

ESB_ACTION_TO_PLATFORM = {
    "fir": "firing",
    "res": "resolved",
    "clo": "close",
    "FIR": "firing",
    "RES": "resolved",
    "CLO": "close",
}

ESB_LEVEL_TO_PLATFORM = {
    "remind": "remind",
    "warning": "warning",
    "fatal": "fatal",
}

PLATFORM_LEVEL_TO_ESB = {v: k for k, v in ESB_LEVEL_TO_PLATFORM.items()}

PLATFORM_CODE_TO_ESB = {
    "1200": {"retCd": "000000", "retCdType": "N", "retInf": "交易成功"},
    "1400": {"retCd": "140000", "retCdType": "E", "retInf": "数据格式校验失败"},
    "1500": {"retCd": "150000", "retCdType": "S", "retInf": "暂时未能处理您的请求"},
}

DEFAULT_ERROR_MAPPING = {
    "retCd": "150000",
    "retCdType": "S",
    "retInf": "暂时未能处理您的请求",
}
