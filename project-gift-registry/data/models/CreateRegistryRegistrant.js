const defaultAccount = require('../registry-create-account.json');

class CreateRegistryRegistrant {
  constructor() {
    this.profileId = defaultAccount.profileId;
    this.firstName = 'TestFirstName';
    this.lastName = 'TestLastName';
    this.email = defaultAccount.email;
    this.password = defaultAccount.password;
    this.addressLineOne = '1250 Techny Road';
    this.addressLineTwo = '';
    this.locality = 'Northbrook';
    this.region = 'IL';
    this.postalCode = '60056';
    this.dayPhone = '3333333333';
    this.eveningPhone = '3333333333';
  }
}

module.exports = { CreateRegistryRegistrant };
