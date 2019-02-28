const BaseEntity = require('../BaseEntity');

class ItemEntity extends BaseEntity {
  constructor({ text }) {
    super();
    this.text = text;
  }
}

module.exports = ItemEntity;
