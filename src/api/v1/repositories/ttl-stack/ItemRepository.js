const moment = require('moment');
const BaseRepository = require('../BaseRepository');
const ItemValidationSchema = require('../../entities/ttl-stack/ItemValidationSchema');
const ItemEntity = require('../../entities/ttl-stack/ItemEntity');
const EmptyEntity = require('../../entities/EmptyEntity');
const Persistence = require('../../persistance/ttl-stack/Persistence');

class ItemRepository extends BaseRepository {
  constructor() {
    super({ validationSchema: () => ItemValidationSchema, persistence: () => Persistence });
  }

  /**
     *
     * @param item
     * @returns {ItemEntity|Error}
     */
  persist(item) {
    if (item instanceof ItemEntity) {
      const old = this.findByKey(item.key);
      if (item.ttl) {
        item.timeCreated = moment().unix();
      }
      if (old instanceof EmptyEntity) {
        const newItem = Object.assign({}, item);
        this.getPersistence.push(newItem);
      } else {
        item = this.update(item);
      }

      return item;
    }
    throw new Error('Item isn\'t ItemEntity.');
  }

  /**
     *
     * @param key
     * @returns {ItemEntity|EmptyEntity}
     */
  findByKey(key) {
    const item = this.getPersistence.find(item => item.key === key);

    return item || (new EmptyEntity());
  }

  /**
     *
     * @param item
     * @param currentTime
     * @returns {ItemEntity|EmptyEntity}
     */
  findItemConsiderTTl({ item, currentTime }) {
    if (item.ttl) {
      return this.considerTTl({ item, currentTime });
    }

    return item;
  }

  /**
     *
     * @param {ItemEntity} item
     */
  remove(item) {
    const persistence = this.getPersistence;

    for (let i = 0, len = persistence.length; i < len; ++i) {
      if (item.key === persistence[i].key) {
        persistence.splice(i, 1);
        break;
      }
    }
  }

  /**
     *
     * @param item
     * @returns {ItemEntity}
     */
  update(item) {
    const persistence = this.getPersistence;
    for (let i = 0, len = persistence.length; i < len; ++i) {
      if (item.key === persistence[i].key) {
        const _item = Object.assign({}, item);
        persistence[i] = _item;
        return _item;
      }
    }

    throw new Error('Item wasn\'t found.');
  }

  /**
     *
     * @param item ItemEntity
     * @param currentTime
     * @returns {ItemEntity|EmptyEntity}
     */
  considerTTl({ item, currentTime }) {
    if ((currentTime - item.timeCreated) > item.ttl) {
      return new EmptyEntity();
    }
    return item;
  }
}

module.exports = ItemRepository;
