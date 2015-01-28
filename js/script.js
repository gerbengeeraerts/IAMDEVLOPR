(function(){

  fallback.load({
    jQuery: [
    '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
    'js/vendor/jquery/dist/jquery.min.js'
    ],
    Handlebars: [
    '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.min.js',
    'js/vendor/handlebars/handlebars.min.js'
    ]
  });

  function init(){
    
  }

  fallback.ready(init);

})();
