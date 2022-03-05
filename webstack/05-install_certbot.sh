#!/usr/bin/env bash
# install snapd and certbot

sudo apt update
sudo apt  install snapd
sudo apt-get upgrade
sudo snap install hello-world
sudo snap install core; sudo snap refresh core
sudo apt-get remove certbot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
