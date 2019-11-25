'use strict';

module.exports = function(server) {
  var configService = server.models.configservice;
  configService.find({'app': server}, null);
};
