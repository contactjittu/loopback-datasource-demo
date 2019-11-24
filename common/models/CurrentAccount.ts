import { Model } from '@mean-expert/model';

@Model({
  hooks: {},
  remotes: {}
})

class CurrentAccount {
  constructor(public model: any) {
    model.find = this.find;
  }

  find = (filter: any, options: any, cb: Function) => {
    var coffeeShopService = this.model.app.dataSources.CoffeeShopService;
    console.log('this.model.app.dataSources = ', this.model.app.dataSources)
    coffeeShopService.findCoffie('apikeyvalue', 'jitendra')
      .then((resp: any) => {
        console.log('resp = ', resp);
        cb(null, resp);
      }).catch((err: any) => {
        cb(err);
      })
  }
}
module.exports = CurrentAccount;
