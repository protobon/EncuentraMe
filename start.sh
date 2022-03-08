#!/bin/bash
echo Starting Flask example app.
cd /var/www/flask
source hello-world/bin/activate
cd hello-world
gunicorn -w 2 -b 127.0.0.1:8080 app:app
