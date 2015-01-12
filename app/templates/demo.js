(function(){
  exports.scrape = function(){
    var noodle = require('noodlejs');
    var _ = require('underscore');
    var q = require('q');

    var query = {
      url: 'http://google.com/search?q=javascript',
      type: 'html',
      selector: 'h3.r a',
      extract: 'text'
    };

    noodle.query(query).then(function (results) {
      _.each(results.results[0].results, function(result){
        console.log(result);
      })
    });
  };
})();