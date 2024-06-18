class User {
  constructor() {
    this.email = '';
    this.password = '';
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get password() {
    return this._password;
  }

  set password(password) {
    this._password = password;
  }
}

module.exports = { User };
