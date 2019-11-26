'use strict';
const hystrix = require('hystrixjs');
function errorHandler(error) {
    if (error) {
        return error;
    }
    else {
        return null;
    }
}
function circuitBreaker(commandName, makeRequest, config) {
    this.hystrixConfig = hystrix.hystrixConfig;
    this.CommandsFactory = hystrix.commandFactory;
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
//# sourceMappingURL=CircuitBreaker.js.map