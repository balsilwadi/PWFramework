class Address {
  constructor() {
    this.address1 = '';
    this.address2 = '';
    this.postalZipcode = '';
    this.city = '';
    this.stateOrProvince = '';
  }

  get address1() {
    return this._address1;
  }

  set address1(address1) {
    this._address1 = address1;
  }

  get address2() {
    return this._address2;
  }

  set address2(address2) {
    this._address2 = address2;
  }

  get postalZipcode() {
    return this._postalZipcode;
  }

  set postalZipcode(postalZipcode) {
    this._postalZipcode = postalZipcode;
  }

  get city() {
    return this._city;
  }

  set city(city) {
    this._city = city;
  }

  get stateOrProvince() {
    return this._stateOrProvince;
  }

  set stateOrProvince(stateOrProvince) {
    this._stateOrProvince = stateOrProvince;
  }
}

module.exports = { Address };
