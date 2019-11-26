import { Model } from "@mean-expert/model";
const loopback = require("loopback");
const DataSource = require("../utils/CreateDataSource");
const app = require("../../server/server");

/**
 * @class ConfigService
 */
@Model({
  hooks: {
  },
  remotes: {
  },
})

class ConfigService {

  constructor(public model: any) {
    model.find = this.find;
  }

  /**
   * @memberof ConfigService
   */
  public find = (filter: any, options: any, callback: Function) => {

    const url = this.getUrl();
    const configAuth = this.generateBasicAuth('jitendra', 'kumar');
    const configAccessToken = 'sjdhf9823nsedhkj';

    /**
     * Begin: setting up datasource
     */
    const headers = { apikey: 'a8JKLWXNw==&%#dsnfn' };
    const dataSourceObj = new DataSource(url, headers).getDataSource();
    app.dataSource("configservice", dataSourceObj);
    /**
     * End: setting up datasource
     */
    const loopbackapi = this.model.app.models.loopbackapi;
    loopbackapi.attachTo(this.model.app.dataSources.configservice);
    const configServicePromise = loopbackapi.configservice();

    configServicePromise.then((response: any) => {
      this.process(response);
    }).catch((rejected: any) => {
      console.info("ConfigService.ts :: rejected :: " + rejected);
    });
  }

  /**
   * @memberof ConfigService
   */
  public getUrl = (): string => {
    const url = 'http://localhost:3000/datasource.json';
    return url;
  }

  /**
   * @memberof ConfigService
   */
  public process = (response: any) => {
    if (response) {
      const datasources = response.datasources;
      const models = app.models();
      for (const key in datasources) {
        if (datasources.hasOwnProperty(key)) {
          models.forEach((model: any) => {
            if (key === model.modelName) {
              const ds = loopback.createDataSource(datasources[key]);
              model.modelBuilder.models.loopbackapi.attachTo(ds);
            }
          });
        }
      }
    }
  }

  /**
   * @memberof ConfigService
   */
  public generateBasicAuth = (username: string, password: string): string => {
    const auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
    return auth;
  }
}

module.exports = ConfigService;
