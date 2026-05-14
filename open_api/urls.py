from django.conf.urls import url

from open_api.views import AlarmEventReportView, HealthCheckView

urlpatterns = [
    url(r"^alarm/event/$", AlarmEventReportView.as_view(), name="alarm-event-report"),
    url(r"^health/$", HealthCheckView.as_view(), name="health-check"),
]
