#!/bin/sh
set -e

npm install
node src/scripts/create-user.js
npm run dev
