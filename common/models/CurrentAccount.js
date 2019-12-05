"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("@mean-expert/model");
const CircuitBreaker = require('../utils/CircuitBreaker');
const config = {
    circuitbreaker: {
        requestvolumethreshold: 5,
        errorThreshold: 50,
        sleepwindow: 3000,
        timeout: 300,
        statisticalwindowlength: 10000
    }
};
let CurrentAccount = class CurrentAccount {
    constructor(model) {
        this.model = model;
        this.find = (filter, options, cb) => {
            const loopbackapi = this.model.app.models.loopbackapi;
            const version = options.req.headers.version;
            let getUser = () => {
                return new Promise((resolve, reject) => {
                    loopbackapi.getUser('a8JKLWXNw==&%#dsnfn', 'loopback', version, (err, data, response) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(getBalance(data));
                        }
                    });
                });
            };
            let getBalance = (userDetails) => {
                return new Promise((resolve, reject) => {
                    loopbackapi.getBalance('a8JKLWXNw==&%#dsnfn', 'loopback', version, (err, balance, response) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve({ balance, userDetails });
                        }
                    });
                });
            };
            const circuitBreaker = new CircuitBreaker('getUser', getUser, config);
            circuitBreaker.getServiceCommand().execute(options)
                .then((data) => {
                cb(null, data);
            }).catch((error) => {
                if (error) {
                    if (error.message === "CommandTimeOut") {
                        console.log("command Timed out", 503, JSON.stringify(error));
                        error = new Error('command Timed out');
                        error.statusCode = 516;
                    }
                    else if (error.message === "OpenCircuitError") {
                        console.log("Circuit Breaker Open", 516, JSON.stringify(error));
                        error = new Error('Circuit Breaker Open');
                        error.statusCode = 516;
                    }
                    cb(error);
                }
            });
        };
        model.find = this.find;
    }
};
CurrentAccount = __decorate([
    model_1.Model({
        hooks: {},
        remotes: {}
    })
], CurrentAccount);
module.exports = CurrentAccount;
//# sourceMappingURL=CurrentAccount.js.map