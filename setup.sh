#!/usr/bin/env bash

git submodule init
git submodule update
npm install
ln -s ../tomato-service node_modules/tomato-service
ln -s ../tomato-service-client node_modules/tomato-service-client
