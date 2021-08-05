var auth = require('basic-auth');

var admins = {
  'infinite-scroll': { password: 'google' },
};


module.exports = function(req, res, next) {

  var user = auth(req);
  console.log('username', user);

  if (!user || !admins[user.name.trim()] || admins[user.name.trim()].password !== user.pass.trim()) {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send();
  }


  return next();
};