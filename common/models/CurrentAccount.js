"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("@mean-expert/model");
let CurrentAccount = class CurrentAccount {
    constructor(model) {
        this.model = model;
        this.find = (filter, options, cb) => {
            var loopbackapi = this.model.app.models.loopbackapi;
            loopbackapi.findDetails('apikeyvalue', 'jitendra')
                .then((resp) => {
                cb(null, resp);
            }).catch((err) => {
                cb(err);
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