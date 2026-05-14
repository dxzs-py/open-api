import os

SYSHEAD_CONSTRAINTS = {
    "stdSvcInd": {"required": True, "fixed_value": "OpeMonAlarmAccessSVC"},
    "stdIntfcInd": {"required": True, "fixed_value": "alarmEvtCmnRpt"},
    "glbSrlNo": {"required": True, "length": 36},
    "xSecret": {"required": True,
                "fixed_value": os.environ.get("ALARM_ADAPTER_X_SECRET", "HhQcmFgeGFgFCHz6XZmovUoygtQHxXxV")},
    "consmSysInd": {"required": True, "max_length": 7, "min_length": 2},
    "consmSysSrlNo": {"required": True, "max_length": 30},
    "consmTxnDt": {"required": True, "pattern": r"^\d{8}$"},
    "consmTxnTm": {"required": True, "pattern": r"^\d{6}$"},
    "svcAuthCd": {"required": True},
    "chnlNo": {"required": False, "max_length": 4, "pattern": r"^\d{4}$"},
}

SYSHEAD_ECHO_FIELDS = [
    "stdSvcInd",
    "stdIntfcInd",
    "stdIntfcVerNo",
    "lglPrsnCd",
    "chnlNo",
    "glbSrlNo",
    "glbStopTm",
    "txnInstNo",
    "txnTlrNo",
    "srcIttrTxnCd",
    "srcIttrTxnNm",
    "consmSysInd",
    "consmSysSrlNo",
    "consmTxnDt",
    "consmTxnTm",
    "svcAuthCd",
    "sysRsrvFlgStrg",
    "sysRsrvCharStrg",
    "xSecret",
]

PROVIDER_CONFIG = {
    "pvdrSysInd": "IOMMP",
}

X_SECRET = os.environ.get("ALARM_ADAPTER_X_SECRET", "HhQcmFgeGFgFCHz6XZmovUoygtQHxXxV")

PLATFORM_API_URL = os.environ.get(
    "ALARM_ADAPTER_PLATFORM_API_URL",
    "https://apps.lzccb.dev/prod-kac-saas-kingeye-web-saas/alarm/collect/event/common/b06d9e1f-2176-4be9-aabb-888e099e48e6/",
)

PLATFORM_API_TIMEOUT = int(os.environ.get("ALARM_ADAPTER_API_TIMEOUT", 10))

PLATFORM_RESP_TO_ESB_BODY = {
    "result": "rsltInf",
    "code": "retCd",
    "data": "dataFieldAry",
    "message": "msgCntntDsc",
}
