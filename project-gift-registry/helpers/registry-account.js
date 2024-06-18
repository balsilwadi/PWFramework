const { CreateRegistryAddress } = require('../data/models/CreateRegistryAddress');
const { CreateRegistryRegistrant } = require('../data/models/CreateRegistryRegistrant');
const { CreateRegistryRequest } = require('../data/models/CreateRegistryRequest');
const defaultAccount = require('../data/registry-create-account.json');
const { CommonUtils } = require('../../support/utils/common-utils');
const { RequestUtils } = require('../../support/utils/api-request-utils');
const { ApiUtils } = require('../../support/utils/api-utils');
const globalData = require('../../support/global-data-object/global-data-object');
const env = require('../../support/env/env');
const { getApiVersion } = require('./registry-api');

const common = new CommonUtils();
const requestUtils = new RequestUtils();
const apiUtils = new ApiUtils();

class RegistryAccount {
  constructor() {
    this.request = new CreateRegistryRequest();
  }

  /**
   * @Function_Name : withLocale
   * @Description : This Function sets the locale value of the CreateRegistryRequest.
   * @Params : string locale value
   * @returns : CreateRegistryRequestBuilder context, to get completed request, call the Build() function
   */
  withLocale(locale) {
    this.request.locale = locale;
    return this;
  }

  /**
   * @Function_Name : withRegistrant
   * @Description : This Function sets the primary registrant of the CreateRegistryRequest
   * @Params : CreateRegistryRegistrant object
   * @returns : CreateRegistryRequestBuilder context, to get completed request, call the Build() function
   */
  withRegistrant(primaryRegistrant = new CreateRegistryRegistrant()) {
    this.request.primaryRegistrant = {
      profileId: primaryRegistrant.profileId ?? defaultAccount.profileId,
      firstName: primaryRegistrant.firstName ?? 'TestFirstName',
      lastName: primaryRegistrant.lastName ?? 'TestLastName',
      email: primaryRegistrant.email ?? defaultAccount.email,
      dayPhone: primaryRegistrant.dayPhone ?? '3333333333',
      eveningPhone: primaryRegistrant.eveningPhone ?? '3333333333',
      address: {
        streetOne: primaryRegistrant.addressLineOne ?? '1250 Techny Road',
        streetTwo: primaryRegistrant.addressLineTwo ?? '',
        locality: primaryRegistrant.locality ?? 'Northbrook',
        region: primaryRegistrant.region ?? 'IL',
        postalCode: primaryRegistrant.postalCode ?? '60056'
      }
    };
    return this;
  }

  /**
   * @Function_Name : withCoRegistrant
   * @Description : This Function sets the co registrant of the CreateRegistryRequest
   * @Params : CreateRegistryRegistrant object
   * @returns : CreateRegistryRequestBuilder context, to get completed request, call the Build() function
   */
  withCoRegistrant(coRegistrant = new CreateRegistryRegistrant()) {
    this.request.coRegistrant = {
      profileId: coRegistrant.profileId ?? defaultAccount.profileId,
      firstName: coRegistrant.firstName ?? 'TestFirstName',
      lastName: coRegistrant.lastName ?? 'TestLastName',
      email: coRegistrant.email ?? defaultAccount.email,
      password: coRegistrant.password ?? defaultAccount.password,
      dayPhone: coRegistrant.dayPhone ?? '3333333333',
      eveningPhone: coRegistrant.eveningPhone ?? '3333333333',
      address: {
        streetOne: coRegistrant.addressLineOne ?? '1250 Techny Road',
        streetTwo: coRegistrant.addressLineTwo ?? '',
        locality: coRegistrant.locality ?? 'Northbrook',
        region: coRegistrant.region ?? 'IL',
        postalCode: coRegistrant.postalCode ?? '60056'
      }
    };

    return this;
  }

  /**
   * @Function_Name : withShipBeforeAddress
   * @Description : This Function sets the ShipBeforeAddress of the CreateRegistryRequest
   * @Params : CreateRegistryAddress object
   * @returns : CreateRegistryRequestBuilder context, to get completed request, call the Build() function
   */
  withShipBeforeAddress(shipAddress = new CreateRegistryAddress()) {
    this.request.beforeEventAddress = {
      streetOne: shipAddress.streetOne ?? '1250 Techny Road',
      streetTwo: shipAddress.streetTwo ?? '',
      locality: shipAddress.locality ?? 'Northbrook',
      region: shipAddress.region ?? 'IL',
      postalCode: shipAddress.postalCode ?? '60056'
    };
    return this;
  }

  /**
   * @Function_Name : withShipAfterAddress
   * @Description : This Function sets the ShipBeforeAddress of the CreateRegistryRequest
   * @Params : CreateRegistryAddress object
   * @returns : CreateRegistryRequestBuilder context, to get completed request, call the Build() function
   */
  withShipAfterAddress(shipAddress = new CreateRegistryAddress()) {
    this.request.afterEventAddress = {
      streetOne: shipAddress.streetOne ?? '1250 Techny Road',
      streetTwo: shipAddress.streetTwo,
      locality: shipAddress.locality ?? 'Northbrook',
      region: shipAddress.region ?? 'IL',
      postalCode: shipAddress.postalCode ?? '60056'
    };
    return this;
  }

  /**
   * @Function_Name : withSmsPreference
   * @Description : This Function sets the phone value of communicationPreferences
   * @Params : CreateRegistryRequest object
   * @returns : CreateRegistryRequestBuilder context, to get completed request, call the Build() function
   */
  withSmsPreference(registryPreferences = new CreateRegistryRequest()) {
    this.request.registryPreferences = {
      communicationPreferences: {
        email: '',
        phone: registryPreferences.communicationPreferences.phone ?? '3333333333',
        emailOptIn: false,
        smsOptIn: true
      }
    };
    return this;
  }

  /**
   * @Function_Name : withEmailPreference
   * @Description : This Function sets the email value of communicationPreferences
   * @Params : CreateRegistryRequest object
   * @returns : CreateRegistryRequestBuilder context, to get completed request, call the Build() function
   */
  withEmailPreference(registryPreferences = new CreateRegistryRequest()) {
    this.request.registryPreferences = {
      communicationPreferences: {
        email: registryPreferences.communicationPreferences.email ?? defaultAccount.email,
        phone: '',
        emailOptIn: true,
        smsOptIn: false
      }
    };
    return this;
  }

  /**
   * @Function_Name : buildCreateRegistryRequest
   * @Description : This function returns the completed CreateRegistryRequest. Note: this can be called right away and will return a request with default values.
   * @returns : CreateRegistryRequest
   */
  buildCreateRegistryRequest() {
    return this.request;
  }

  /**
   * @Function_Name : createRegistry
   * @Description : This function calls GRAPI to create a registry
   * @Params : createRegistryRequestBody object
   * @returns : Api response
   */
  async createRegistry(CreateRegistryRequestBody) {
    const xApiKey = await common.readSecureProperties('x-api-key');
    const apiUrl = `${env.API_URL}/gift-registry/${getApiVersion('get')}/registries`;
    await requestUtils.getBearerTokenData('get-write-token.json', 'project-gift-registry', 'x-api-key');
    const response = await apiUtils.postRequest(
      apiUrl,
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${globalData.accessToken}`,
        'x-api-key': xApiKey
      },
      CreateRegistryRequestBody
    );
    return response;
  }

  // // import registriesWithItems from '../../data/registry/users-with-items';
  // // import registriesWithoutItems from '../../data/registry/users-without-items';

  // function getUserWithRegistry() {
  //   // return random user from list registriesWithItems
  // }

  // function getUserWithEmptyRegistry() {
  //   // return random user from list registriesWithoutItems
  // }

  // function getRegistryForUser(user) {
  //   // var registryWithItems = registriesWithItems.filter(u => u.username == user);
  //   // if (!registryWithItems) return registryWithItems;
  //   // var registryWithoutItems = registriesWithoutItems.filter(u => u.username == user);
  //   // if (!registryWithoutItems) return registryWithoutItems;
  //   // return null;
  // }

  // module.exports = {
  //   getUserWithRegistry,
  //   getUserWithEmptyRegistry,
  //   getRegistryForUser
  // };
}

module.exports = { RegistryAccount };
