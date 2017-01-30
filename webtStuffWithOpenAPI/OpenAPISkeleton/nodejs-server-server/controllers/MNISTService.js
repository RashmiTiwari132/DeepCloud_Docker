'use strict';

exports.getAqi = function(args, res, next) {
  /**
   * parameters expected in the args:
  * width (Integer)
  * height (Integer)
  * nClass (Integer)
  * alpha (BigDecimal)
  * upload (file)
  **/
    var examples = {};
    if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end(JSON.stringify({ Accuracy : "dataString"  , trainedModel : "modelPath" }));
  }
  
}

