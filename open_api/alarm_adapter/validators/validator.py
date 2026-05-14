import re
from datetime import datetime

from open_api.alarm_adapter.datadict.constraints import SYSHEAD_CONSTRAINTS
from open_api.alarm_adapter.datadict.mapping import ESB_TO_PLATFORM_BODY_MAPPING


class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__("[{field}]: {message}".format(field=field, message=message))


class SysHeadValidationError(ValidationError):
    pass


class BodyValidationError(ValidationError):
    pass


def validate_syshead(sys_head):
    errors = []
    for field, constraint in SYSHEAD_CONSTRAINTS.items():
        value = sys_head.get(field, "")

        if constraint.get("required") and not value:
            errors.append(SysHeadValidationError(field, "必输字段不能为空"))
            continue

        if not value:
            continue

        str_value = str(value)

        fixed_value = constraint.get("fixed_value")
        if fixed_value and str_value != fixed_value:
            errors.append(
                SysHeadValidationError(
                    field,
                    "固定值校验失败, 期望={expected}, 实际={actual}".format(
                        expected=fixed_value, actual=str_value
                    ),
                )
            )
            continue

        length = constraint.get("length")
        if length and len(str_value) != length:
            errors.append(
                SysHeadValidationError(
                    field,
                    "长度校验失败, 期望={expected}, 实际={actual}".format(
                        expected=length, actual=len(str_value)
                    ),
                )
            )

        max_length = constraint.get("max_length")
        if max_length and len(str_value) > max_length:
            errors.append(
                SysHeadValidationError(
                    field,
                    "长度超限, 最大={max_len}, 实际={actual}".format(
                        max_len=max_length, actual=len(str_value)
                    ),
                )
            )

        min_length = constraint.get("min_length")
        if min_length and len(str_value) < min_length:
            errors.append(
                SysHeadValidationError(
                    field,
                    "长度不足, 最小={min_len}, 实际={actual}".format(
                        min_len=min_length, actual=len(str_value)
                    ),
                )
            )

        pattern = constraint.get("pattern")
        if pattern and not re.match(pattern, str_value):
            errors.append(
                SysHeadValidationError(
                    field,
                    "格式校验失败, 不匹配规则={pattern}".format(pattern=pattern),
                )
            )

    glb_stop_tm = sys_head.get("glbStopTm", "")
    if glb_stop_tm:
        try:
            stop_time = datetime.strptime(str(glb_stop_tm), "%Y%m%d%H%M%S")
            if datetime.now() > stop_time:
                errors.append(
                    SysHeadValidationError("glbStopTm", "全局截止时间已超时")
                )
        except ValueError:
            errors.append(
                SysHeadValidationError("glbStopTm", "时间格式错误, 应为YYYYMMDDHHMMSS")
            )

    return errors


def validate_body(body):
    errors = []
    for esb_field, config in ESB_TO_PLATFORM_BODY_MAPPING.items():
        value = body.get(esb_field)

        if config.get("required") and (value is None or value == ""):
            errors.append(BodyValidationError(esb_field, "必输字段不能为空"))
            continue

        if value is None or value == "":
            continue

        str_value = str(value)
        max_length = config.get("max_length")
        if max_length and len(str_value) > max_length:
            errors.append(
                BodyValidationError(
                    esb_field,
                    "长度超限, 最大={max_len}, 实际={actual}".format(
                        max_len=max_length, actual=len(str_value)
                    ),
                )
            )

    return errors
