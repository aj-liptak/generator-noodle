(function(){
  exports.scrape = function(){
    var noodle = require('node-noodle');
    var _ = require('underscore');
    var q = require('q');
    var service = require('../service');

    var query = {
      url: 'http://google.com/search?q=west+monroe+partners',
      type: 'html',
      map: {
        'Title': {
          'selector': '.r > a',
          'extract': 'text'
        },
        'Description': {
          'selector': '.s .st',
          'extract': 'text'
        },
        'URL': {
          'selector': '.r > a',
          'extract': 'href'
        }
      }
    };
    noodle.query(query).then(function (results) {
      for(var i = 0; i < results.results[0].results.URL.length; i++){
        var result = {
          Title: results.results[0].results.Title[i],
          Description: results.results[0].results.Description[i - 1], //the first result doesn't include a description as it's a map result
          URL: 'https://www.google.com' + results.results[0].results.URL[i]
        };
        service.Post('Sites', result);
      }
    });
  };
})();