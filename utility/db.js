const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = global.Promise;
mongoose.set('debug', config.mongo.debug);

function open() {
  return new Promise((resolve, reject) => {
    if (config.debug) {
      let Mockgoose = require('mockgoose').Mockgoose;
      let mockgoose = new Mockgoose(mongoose);

      mockgoose.helper.setDbVersion('3.4.10');
      mockgoose
        .prepareStorage()
        .then(function() {
          mongoose.connect(
            config.mongo.test,
            config.mongo.options,
            (err, res) => {
              if (err) return reject(err);
              resolve();
            }
          );
        })
        .catch(reject);
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
