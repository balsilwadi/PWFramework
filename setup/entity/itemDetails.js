class ItemDetails {
  constructor() {
    this.sku = '';
    this.quantity = '';
    this.brand = '';
    this.description = '';
  }

  get sku() {
    return this._sku;
  }

  set sku(sku) {
    this._sku = sku;
  }

  get quantity() {
    return this._quantity;
  }

  set quantity(quantity) {
    this._quantity = quantity;
  }

  get brand() {
    return this._brand;
  }

  set brand(brand) {
    this._brand = brand;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }
}

module.exports = { ItemDetails };
