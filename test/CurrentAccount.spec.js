// // import server from '../server/server';
// const chai = require('chai');
// const expect = chai.expect;
// const nock = require('nock');
// const CurrentAccount = require('../common/models/CurrentAccount');

// const resp = {
//   "name": "Jitendra Kumar",
//   "branch": "Pune",
//   "appname": "loopback"
// };

// const options = {};
// options.req = {};
// options.req.headers = {
//   'X-apiKey': '6e5a65fe-b6ea-4b17-8d98-c545d8b9d945'
// };

// describe('CurrentAccount modules', () => {
//   beforeEach(() => {
//     nock('http://localhost:3000/api')
//       .get('/currentaccount')
//       .reply(200, resp)
//   });

//   it('Current acount find method', done => {
//     const currentAccount = new CurrentAccount({}, options, {});
//     console.log('currentAccount = ', currentAccount)
//     currentAccount.find({}, {}, (error, result) => {
//       if (error) {
//         return done(error);
//       }
//       expect(typeof result).to.equal('object');
//       done();
//     })
//   })
// })