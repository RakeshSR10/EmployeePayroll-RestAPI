#!/bin/bash -x

cp .env /home/ubuntu/Backend/
cd /home/ubuntu/Backend
directory=$(pwd)
echo "Directory is $directory"
# pm2 delete 0
npx kill-port 8000
npm install
npm start
echo "Successfully Deployed"