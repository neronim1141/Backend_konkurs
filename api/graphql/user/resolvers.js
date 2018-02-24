const User = require('../../schema/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const AuthValidate = require('../../../auth/validate');
//#region Read object
module.exports.getOne = (parentValue, args, context) => {
  new AuthValidate(context.user).hasRole('admin', errors => {
    throw errors;
  });
  return User.findByIdAsync(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  new AuthValidate(context.user).hasRole('admin', errors => {
    throw errors;
  });
  // throw 'not logged';
  return User.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createUser = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    var newUser = new User({
      login: args.login,
      password: args.password,
      email: args.email,
      schoolEmail: args.schoolEmail
    });

    newUser
      .saveAsync((err, res) => {
        if (err) throw err;
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
module.exports.updateUser = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdateAsync(args.id, args, {
      new: true
    })
      .then(res => {
        if (!res) throw 'not found';
        new AuthValidate(context.user).isSelf(res.id, reject);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
module.exports.deleteUser = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).hasRole('admin', reject);

    User.findByIdAsync(args.id)
      .then(user => {
        if (!user) {
          throw 'Not Found';
        }
        user
          .removeAsync((err, res) => {
            if (err) throw err;
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
//#endregion

//#region authenticate
module.exports.login = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      login: args.login.toLowerCase()
    })
      .select(
        'login email schoolEmail assigned role creationTime salt password'
      )
      .then(function(user) {
        if (!user) {
          reject('This User is not registered.');
        }
        user.authenticate(args.password, function(authError, authenticated) {
          if (authError) {
            reject(authError);
          }
          if (!authenticated) {
            reject('This password is not correct.');
          } else {
            let token = jwt.sign(
              {
                _id: user._id,
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
