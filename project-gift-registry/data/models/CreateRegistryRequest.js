const defaultAccount = require('../registry-create-account.json');

class CreateRegistryRequest {
  constructor() {
    this.locale = 'cb-en-us';
    this.type = 'BR';
    this.typeName = 'Wedding';
    this.eventDate = '2024-01-01T00:00:00';
    this.biography = 'TestBiograpgy';
    this.registrantImage = null;
    this.primaryRegistrant = {
      profileId: defaultAccount.profileId,
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      address: {
        streetOne: '1250 Techny Rd',
        streetTwo: null,
        locality: 'Northbrook',
        region: 'IL',
        postalCode: '60062'
      },
      email: defaultAccount.email,
      password: defaultAccount.password,
      isOptInToEmails: true,
      dayPhone: '33333333333',
      eveningPhone: '33333333333',
      optIn: false
    };
    this.coRegistrant = null;
    this.beforeEventAddress = {
      streetOne: '1250 Techny Rd',
      streetTwo: null,
      locality: 'Northbrook',
      region: 'IL',
      postalCode: '60062'
    };
    this.beforeEventAddressCode = 'P';
    this.beforeEventName = 'beforeEventName';
    this.afterEventAddress = {
      streetOne: '1250 Techny Rd',
      streetTwo: null,
      locality: 'Northbrook',
      region: 'IL',
      postalCode: '60062'
    };
    this.afterEventAddressCode = 'P';
    this.afterEventName = 'afterEventName';
    this.estimatedNumberOfGuests = 0;
    this.giftCardWelcome = true;
    this.howDidYouHearAboutUs = 0;
    this.isCoRegistrantSameAsRegistrant = false;
    this.isOnWebSite = true;
    this.isRemote = false;
    this.isUserEnabledThankYouManager = true;
    this.preferredStoreNumber = 0;
    this.status = 1;
    this.babyGender = 0;
    this.babyDueDate = null;
    this.referral = null;
    this.registryPreferences = {
      displayPreference: 'publicGlobal',
      communicationPreferences: {
        email: '',
        phone: '',
        emailOptIn: false,
        smsOptIn: false
      }
    };
  }
}

module.exports = { CreateRegistryRequest };
