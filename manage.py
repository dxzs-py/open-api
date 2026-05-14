#!/usr/bin/env python

"""
$env:APP_ID="open-api"
$env:APP_TOKEN="f9f90e56-5ecc-4a47-9442-a55790a055dd"
$env:RUN_VER="test"
$env:BK_URL="http://paas.dev.com:80/t/open-api/"
$env:BK_PAAS_HOST="http://paas.dev.com:80/t/open-api/"
python manage.py runserver
"""


import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
