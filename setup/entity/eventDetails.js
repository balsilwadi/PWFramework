class EventDetails {
  constructor() {
    this.eventDate = '';
    this.estimatedGuests = '';
    this.babyDueDate = '';
    this.babyGender = '';
  }

  get eventDate() {
    return this._eventDate;
  }

  set eventDate(eventDate) {
    this._eventDate = eventDate;
  }

  get estimatedGuests() {
    return this._estimatedGuests;
  }

  set estimatedGuests(estimatedGuests) {
    this._estimatedGuests = estimatedGuests;
  }

  get babyDueDate() {
    return this._babyDueDate;
  }

  set babyDueDate(babyDueDate) {
    this._babyDueDate = babyDueDate;
  }

  get babyGender() {
    return this._babyGender;
  }

  set babyGender(babyGender) {
    this._babyGender = babyGender;
  }
}

module.exports = { EventDetails };
