'use strict';
module.exports = function(server) {
  // console.log('load config invoked');
  var configService = server.models.configservice;
  configService.find({'app': server}, null);
};
