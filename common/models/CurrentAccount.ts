import { Model } from '@mean-expert/model';

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
    var loopbackapi = this.model.app.models.loopbackapi;
    loopbackapi.findDetails('apikeyvalue', 'jitendra')
      .then((resp: any) => {
        cb(null, resp);
      }).catch((err: any) => {
        cb(err);
      })
  }
}
module.exports = CurrentAccount;
