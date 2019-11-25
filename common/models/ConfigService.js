"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("@mean-expert/model");
const loopback = require("loopback");
const DataSource = require("../utils/CreateDataSource");
const app = require("../../server/server");
let ConfigService = class ConfigService {
    constructor(model) {
        this.model = model;
        this.find = (filter, options, callback) => {
            const url = this.getUrl();
            const configAuth = this.generateBasicAuth('jitendra', 'kumar');
            const configAccessToken = 'sjdhf9823nsedhkj';
            const headers = { auth: configAuth, token: configAccessToken };
            const dataSourceObj = new DataSource(url, headers).getDataSource();
            app.dataSource("configservice", dataSourceObj);
            const loopbackapi = this.model.app.models.loopbackapi;
            loopbackapi.attachTo(this.model.app.dataSources.configservice);
            const configServicePromise = loopbackapi.configservice();
            configServicePromise.then((response) => {
                this.process(response);
            }).catch((rejected) => {
                console.info("ConfigService.ts :: rejected :: " + rejected);
            });
        };
        this.getUrl = () => {
            const url = 'http://localhost:3000/datasource.json';
            return url;
        };
        this.process = (response) => {
            if (response) {
                const datasources = response.datasources;
                const models = app.models();
                for (const key in datasources) {
                    if (datasources.hasOwnProperty(key)) {
                        models.forEach((model) => {
                            if (key === model.modelName) {
                                const ds = loopback.createDataSource(datasources[key]);
                                model.modelBuilder.models.loopbackapi.attachTo(ds);
                            }
                        });
                    }
                }
            }
        };
        this.generateBasicAuth = (username, password) => {
            const auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
            return auth;
        };
        model.find = this.find;
    }
};
ConfigService = __decorate([
    model_1.Model({
        hooks: {},
        remotes: {},
    })
], ConfigService);
module.exports = ConfigService;
//# sourceMappingURL=ConfigService.js.map