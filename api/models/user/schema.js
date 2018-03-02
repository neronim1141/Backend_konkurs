const mongoose = require('bluebird').promisifyAll(require('mongoose'));
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const Schema = mongoose.Schema;

const schema = new Schema({
  login: { type: String },
  email: { type: String },
  schoolEmail: { type: String },
  assigned: {
    type: String
  },
  role: {
    type: String,
    default: 'user'
  },
  creationTime: {
    type: Date,
    default: Date.now
  },
  password: { type: String, select: false },
  salt: { type: String, select: false }
});

//#region Validators
// Validate empty email
schema.path('email').validate(function(email) {
  return email.length;
}, 'Email cannot be blank');
schema.path('schoolEmail').validate(function(email) {
  return email.length;
}, 'Email cannot be blank');

// Validate empty password
schema.path('password').validate(function(password) {
  return password.length;
}, 'Password cannot be blank');

// Validate email is not taken
schema.path('email').validate(function(value, respond) {
  let self = this;
  return this.constructor
    .findOne({ email: value })
    .then(function(user) {
      if (user) {
        if (self.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      return respond(true);
    })
    .catch(function(err) {
      throw err;
    });
}, 'The specified email address is already in use.');

schema.path('schoolEmail').validate(function(value, respond) {
  let self = this;
  return this.constructor
    .findOne({ schoolEmail: value })
    .then(function(user) {
      if (user) {
        if (self.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      return respond(true);
    })
    .catch(function(err) {
      throw err;
    });
}, 'The specified school email address is already in use.');

const validatePresenceOf = function(value) {
  return value && value.length;
};
//#endregion

//#region pre-save hook
schema.pre('save', function(next) {
  // Handle new passwords
  if (this.isModified('password')) {
    if (!validatePresenceOf(this.password)) {
      next(new Error('Invalid password'));
    }

    // Make salt with a callback
    let _this = this;
    this.makeSalt(function(saltErr, salt) {
      if (saltErr) {
        next(saltErr);
      }
      _this.salt = salt;

      _this.encryptPassword(_this.password, function(
        encryptErr,
        hashedPassword
      ) {
        if (encryptErr) {
          next(encryptErr);
        }
        _this.password = hashedPassword;
        next();
      });
    });
  } else {
    next();
  }
});
//#endregion

//#region Methods
schema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate: function(password, callback) {
    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    let _this = this;
    this.encryptPassword(password, function(err, pwdGen) {
      if (err) {
        callback(err);
      }
      if (_this.password === pwdGen) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  },

  /**
   * Make salt
   *
   * @param {Number} byteSize
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt: function(byteSize, callback) {
    let defaultByteSize = 10;

    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }
    if (!callback) {
      return bcrypt.genSalt(byteSize);
    }

    return bcrypt.genSalt(byteSize, (err, salt) => {
      if (err) callback(err);
      return callback(null, salt);
    });
  },
  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword: function(password, callback) {
    if (!password || !this.salt) {
      return null, false;
    }
    if (!callback) {
      bcrypt.hash(password, this.salt);
    }
    return bcrypt.hash(password, this.salt, (err, hash) => {
      if (err) callback(err);
      return callback(null, hash);
    });
  }
};
//#endregion

const thisSchema = mongoose.model('Users', schema, 'Users');

module.exports = thisSchema;

module.exports.getOne = id => {
  return thisSchema
    .findById(id)
    .then(res => {
      if (!res) throw new customErrors.NotFound();
      return res;
    })
    .catch(err => {
      return err;
    });
};
module.exports.getList = args => {
  return thisSchema
    .find()
    .then(res => res)
    .catch(err => err);
};
module.exports.createNew = schema => {
  return new Promise((resolve, reject) => {
    var newAddress = new thisSchema(schema);

    newAddress
      .save()
      .then(res => resolve(res))
      .catch(err => {
        reject(err);
      });
  })
    .then(res => res)
    .catch(err => err);
};
module.exports.updateId = (id, data) => {
  return new Promise((resolve, reject) => {
    thisSchema
      .findByIdAndUpdateAsync(id, data, { new: true })
      .then(res => {
        if (!res) throw new customErrors.NotFound();
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
module.exports.deleteId = id => {
  return new Promise((resolve, reject) => {
    thisSchema
      .findByIdAsync(id)
      .then(res => {
        if (!res) throw new customErrors.NotFound();
        res
          .remove((err, res) => {
            if (err) reject(err);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      })

      .catch(err => {
        reject(err);
      });
  });
};
module.exports.login = args => {
  return new Promise((resolve, reject) => {
    thisSchema
      .findOne({
        login: args.login.toLowerCase()
      })
      .select(
        'login email schoolEmail assigned role creationTime salt password'
      )
      .then(user => {
        if (!user) {
          reject('This User is not registered.');
        }
        user.authenticate(args.password, (authError, authenticated) => {
          if (authError) {
            reject(authError);
          }
          if (!authenticated) {
            reject('This password is not correct.');
          } else {
            let token = jwt.sign(
              {
                _id: user._id,
                assigned: user.assigned,
                role: user.role
              },
              config.secrets.session,
              {
                expiresIn: args.alwaysLogged ? '60d' : '10h'
              }
            );

            resolve({
              user: user,
              token: token
            });
          }
        });
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
