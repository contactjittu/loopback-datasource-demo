"use strict";
module.exports = function(app) {
    // modify all returned values
  function initializeOptions(ctx, next) {
    ctx.args.options.req  = ctx.req;
    ctx.args.options.res  = ctx.res;
    next();
  }
    //
  app.remotes().before("**", initializeOptions);
};
