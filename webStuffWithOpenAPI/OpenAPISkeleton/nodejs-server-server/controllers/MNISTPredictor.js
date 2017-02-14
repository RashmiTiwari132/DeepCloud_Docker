'use strict';

var url = require('url');


var MNISTPredictor = require('./MNISTPredictorService');


module.exports.getAQI2 = function getAQI2 (req, res, next) {
  MNISTPredictor.getAQI2(req.swagger.params, res, next);
};
