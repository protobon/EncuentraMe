#!/usr/bin/env bash
# install mysql

sudo apt-get update
sudo apt-get upgrade
apt list --upgradable
sudo apt upgrade
sudo apt install wget -y
wget https://dev.mysql.com/get/mysql-apt-config_0.8.22-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.22-1_all.deb
sudo apt-get update
sudo apt-get install mysql-server
systemctl status mysql
sudo dpkg-reconfigure mysql-apt-config
sudo apt-get update