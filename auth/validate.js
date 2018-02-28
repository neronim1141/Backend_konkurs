const config = require('../config');

class AuthValidate {
  constructor(user) {
    this.user = user;
  }

  isAuthenticated() {
    if (!this.user) {
      throw 'Forbidden. You must by logged to do that.';
    }
  }
  isSelf(id, reject) {
    this.isAuthenticated(reject);
    if (this.user.id != id && this.user.role != config.userRoles[2]) {
      {
        reject(`Forbidden. Only User with assigned Id: ${id} can do that.`);
      }
    }
  }
  isAssigned(id, reject) {
    this.isAuthenticated(reject);
    if (this.user.assigned != id && this.user.role != config.userRoles[2]) {
      {
        reject(`Forbidden. Only User with assigned Id: ${id} can do that.`);
      }
    }
  }
  hasRole(role, reject) {
    this.isAuthenticated();

    if (
      config.userRoles.indexOf(this.user.role) < config.userRoles.indexOf(role)
    ) {
      reject(`Forbidden. Only ${role} or greater role can do that.`);
    }
  }
}

module.exports = AuthValidate;
