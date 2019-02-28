const BaseEntity = require('../BaseEntity');

class ItemEntity extends BaseEntity {
  constructor({ key, value, ttl = 0 }) {
    super();
    this.key = key;
    this.value = value;
    this.ttl = ttl;
    this.timeCreated = 0;
  }
}

module.exports = ItemEntity;
