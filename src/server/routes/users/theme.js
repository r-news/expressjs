const authCtrl = require('../../controllers/theme.controller');

const theme = (router) => {
  // router.route('/api/users/list')
  //   .get(authCtrl.requireSignIn, authCtrl.hasAdminRol, usrCtrl.list);

  router.route('/api/users/signin')
    .post(authCtrl.signin);


  return router;
}

module.exports = theme;

