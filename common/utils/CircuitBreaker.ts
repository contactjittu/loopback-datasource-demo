'use strict';

const hystrix = require('hystrixjs');

function errorHandler(error: any) {
  if (error) {
    return error;
  }
  else {
    return null;
  }
}


function circuitBreaker(commandName: string, makeRequest: any, config: any) {
  this.hystrixConfig = hystrix.hystrixConfig;
  //this.hystrixConfig.init({});
  this.CommandsFactory = hystrix.commandFactory;
  this.CommandsFactory.resetCache();
  this.serviceCommand = this.CommandsFactory.getOrCreate(commandName)
    .circuitBreakerRequestVolumeThreshold(config.requestvolumethreshold)
    .circuitBreakerErrorThresholdPercentage(config.errorThreshold)
    .circuitBreakerSleepWindowInMilliseconds(config.sleepwindow)
    .timeout(config.timeout)
    .statisticalWindowLength(config.statisticalwindowlength)
    .run(makeRequest)
    .errorHandler(errorHandler)
    .build();
}

circuitBreaker.prototype = {
  getServiceCommand: function () {
    return this.serviceCommand;
  }
};

module.exports = circuitBreaker;
