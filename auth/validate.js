const config = require('../config');

class AuthValidate {
  constructor(user) {
    this.user = user;
  }

  isAuthenticated(reject) {
    if (!this.user) {
      reject('Forbidden. You must by logged to do that.');
    }
  }
  isAssigned(id, reject) {
    this.isAuthenticated(reject);
    if (this.user.assigned != id) {
      {
        reject(`Forbidden. Only User with assigned Id: ${id} can do that.`);
      }
    }
  }
  hasRole(role, reject) {
    this.isAuthenticated(reject);

    if (
      config.userRoles.indexOf(this.user.role) < config.userRoles.indexOf(role)
    ) {
      reject(`Forbidden. Only ${role} or greater role can do that.`);
    }
  }
}

module.exports = AuthValidate;
