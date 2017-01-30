'use strict';

exports.getAQI2 = function(args, res, next) {
  /**
   * parameters expected in the args:
  * upload (file)
  **/
    var examples = {};
    if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end("test");
    //res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end("this is a dummy text");
  }
  
}

