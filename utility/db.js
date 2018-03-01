const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = global.Promise;
mongoose.set('debug', config.mongo.debug);

function open() {
  return new Promise((resolve, reject) => {
    if (config.debug) {
      mongoose.connect(config.mongo.test, config.mongo.options, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    } else {
      mongoose.connect(config.mongo.uri, config.mongo.options, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { close, open };
