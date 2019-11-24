import { Model } from "@mean-expert/model";
const loopback = require("loopback");
const DataSource = require("./CreateDataSource");
const app = require("../../server/server");

/**
 *
 *
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
   *
   *
   * @memberof ConfigService
   */
  public find = (filter: any, options: any, callback: Function) => {

    console.info("ConfigService.ts :: find called");
    let app: any;
    let registry: any;

    if (filter) {
      if (filter.app) {
        app = filter.app;
      } else {
        app = module.exports = loopback();
      }
      registry = filter.registry;
    } else {
      console.info("ConfigService.ts :: filter not provided");
      app = module.exports = loopback();
    }

    const url = this.getUrl(registry);
    const configAuth = this.generateBasicAuth('jitendra', 'kumar');
    const configAccessToken = 'sjdhf9823nsedhkj';

    /**
     * Begin: setting up datasource
     */
    const headers = { auth: configAuth, token: configAccessToken };
    const dataSourceObj = new DataSource(url, headers).getDataSource();
    app.dataSource("configservice", dataSourceObj);
    /**
     * End: setting up datasource
     */
    const medicalbillingapi = this.model.app.models.medicalbillingapi;
    medicalbillingapi.attachTo(this.model.app.dataSources.configservice);
    const configServicePromise = medicalbillingapi.configservice();

    configServicePromise.then((response: any) => {
      console.info("65 ConfigService.ts :: non-test mode :: configServicePromise :: ");
      console.log('response========', response)
      this.process(response, callback);
    }).catch((rejected: any) => {
      console.info("ConfigService.ts :: response rejected :: " + rejected);
    });
  }

  /**
   *
   *
   * @memberof ConfigService
   */
  public getUrl = (registry: any): string => {
    const url = 'http://localhost:3000/datasource.json';
    return url;
  }

  /**
   *
   *
   * @memberof ConfigService
   */
  public process = (response: any, callback: Function) => {
    console.info("ConfigService.ts :: process called", JSON.stringify(response));
    console.log('kkkkk');
    
    if (response) {
      console.log('\\\\\\')
      const datasources = response.datasources;
      const models = app.models();
      for (const key in datasources) {
        if (datasources.hasOwnProperty(key)) {
          models.forEach((model: any) => {
            if (key === model.modelName) {
              const ds = loopback.createDataSource(datasources[key]);
              model.modelBuilder.models.medicalbillingapi.attachTo(ds);
            }
          });
        }
      }
      //callback(null, response);
      /* if (process.env.NODE_ENV == 'Default_Env') {
        callback(null, response);
      }
      if (process.env.NODE_ENV != 'Default_Env') {
        console.log("ConfigService.ts :: non-test mode ::Post process");
        // delete response["datasources"];
        callback(null, response);
        
      } */
    }
  }

  /**
   *
   *
   * @memberof ConfigService
   */
  public generateBasicAuth = (username: string, password: string): string => {
    const auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
    return auth;
  }
}

module.exports = ConfigService;
