import logging

import requests

from open_api.alarm_adapter.datadict.constraints import PLATFORM_API_URL, PLATFORM_API_TIMEOUT, X_SECRET

logger = logging.getLogger(__name__)


class AlarmPlatformClient:
    def __init__(self):
        self.api_url = PLATFORM_API_URL
        self.timeout = PLATFORM_API_TIMEOUT
        self.headers = {
            "Content-Type": "application/json",
            "X-Secret": X_SECRET,
        }

    def report_alarm(self, platform_body):
        logger.info(
            "调用平台接口: url=%s, body=%s",
            self.api_url,
            platform_body,
        )
        try:
            resp = requests.post(
                self.api_url,
                json=platform_body,
                headers=self.headers,
                timeout=self.timeout,
                verify=False,
            )
            resp.raise_for_status()
            result = resp.json()
            logger.info(
                "平台接口响应: code=%s, result=%s",
                result.get("code"),
                result.get("result"),
            )
            return result
        except requests.Timeout:
            logger.error("平台接口调用超时: url=%s", self.api_url)
            return {
                "result": False,
                "code": "1500",
                "message": "平台接口调用超时",
                "data": None,
            }
        except requests.RequestException as e:
            logger.error("平台接口调用异常: url=%s, error=%s", self.api_url, str(e))
            return {
                "result": False,
                "code": "1500",
                "message": "平台接口调用异常",
                "data": None,
            }
        except (ValueError, KeyError) as e:
            logger.error("平台接口响应解析异常: error=%s", str(e))
            return {
                "result": False,
                "code": "1500",
                "message": "平台接口响应解析异常",
                "data": None,
            }


alarm_platform_client = AlarmPlatformClient()
