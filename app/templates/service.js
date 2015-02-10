(function(){
  var request = require('request');
  exports.Post = function(type, data){
    request.post({url:'http://0.0.0.0:3000/api/' + type, form: data}, function(err,httpResponse,body){
      console.log(httpResponse);
    });
  };
})();