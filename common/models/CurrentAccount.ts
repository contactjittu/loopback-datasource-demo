import { Model } from '@mean-expert/model';
const CircuitBreaker = require('../utils/CircuitBreaker');
const config = {
  circuitbreaker: {
    requestvolumethreshold: 5,
    errorThreshold: 50,
    sleepwindow: 3000,
    timeout: 300,
    statisticalwindowlength: 10000
  }
}
/**
 * @class CurrentAccount
 */
@Model({
  hooks: {},
  remotes: {}
})

class CurrentAccount {
  constructor(public model: any) {
    model.find = this.find;
  }

  /**
   * @memberof CurrentAccount
   */

  find = (filter: any, options: any, cb: Function) => {

    const loopbackapi = this.model.app.models.loopbackapi;
    const version = options.req.headers.version;
    let getUser = () => {
      return new Promise((resolve, reject) => {
        loopbackapi.getUser('a8JKLWXNw==&%#dsnfn', 'loopback', version, (err: any, data: any, response: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(getBalance(data))
          }
        })
      })
    }



    let getBalance = (userDetails: any) => {
      return new Promise((resolve, reject) => {
        loopbackapi.getBalance('a8JKLWXNw==&%#dsnfn', 'loopback', version, (err: any, balance: any, response: any) => {
          if (err) {
            reject(err);
          } else {
            resolve({balance, userDetails});
          }
        })
      })
    }

    const circuitBreaker = new CircuitBreaker('getUser', getUser, config);
    circuitBreaker.getServiceCommand().execute(options)
      .then((data: any) => {
        cb(null, data);
      }).catch((error: any) => {
        if (error) {
          if (error.message === "CommandTimeOut") {
            console.log("command Timed out", 503, JSON.stringify(error));
            error = new Error('command Timed out')
            error.statusCode = 516;
          } else if (error.message === "OpenCircuitError") {
            console.log("Circuit Breaker Open", 516, JSON.stringify(error));
            error = new Error('Circuit Breaker Open')
            error.statusCode = 516;
          }
          cb(error);
        }
      });
  }

}
module.exports = CurrentAccount;
