#!/usr/bin/env bash
#install nginx and create index.html file with Hello World text

sudo apt update
sudo apt-get -y install nginx
sudo service nginx restart
