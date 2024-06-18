const { Brand, Country, Environment } = require('../env/env-global');
const ENV = require('../env/env');

class EnvironmentUtils {
  pageName = this.constructor.name;

  brand() {
    return ENV.BRAND;
  }

  country() {
    return ENV.COUNTRY;
  }

  environment() {
    return ENV.EXEC_ENV;
  }

  site() {
    return ENV.EXEC_SITE;
  }

  language() {
    return ENV.LANGUAGE;
  }

  baseURL() {
    return ENV.BASE_URL;
  }

  isCrate() {
    return this.brand() === Brand.Crate;
  }

  isCb2() {
    return this.brand() === Brand.CB2;
  }

  isUs() {
    return this.country() === Country.US;
  }

  isCa() {
    return this.country() === Country.CA;
  }

  isDev() {
    return this.environment() === Environment.DEV;
  }

  isQa() {
    return this.environment() === Environment.QA;
  }

  isProd() {
    return this.environment() === Environment.PROD;
  }
}

module.exports = { EnvironmentUtils };
