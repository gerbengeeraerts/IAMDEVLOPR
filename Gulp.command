cd "$(dirname "$0")"
if [ ! -d node_modules ];then
    npm install
fi
if [ ! -d js/vendor ];then
  bower install 
fi
gulp watch
