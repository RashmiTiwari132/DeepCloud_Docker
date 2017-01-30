'use strict';

var url = require('url');


var MNIST = require('./MNISTService');


module.exports.getAqi = function getAqi (req, res, next) {
  MNIST.getAqi(req.swagger.params, res, next);
};
