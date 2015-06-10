cd "$(dirname "$0")"
if [ ! -d node_modules ];then
    npm install
fi
if [ ! -d lib ];then
  bower install
fi
gulp watch
