const ItemValidationSchema = require('../../entities/stack/ItemValidationSchema');
const ItemEntity = require('../../entities/stack/ItemEntity');
const Persistence = require('../../persistance/stack/Persistence');
const BaseRepository = require('../BaseRepository');

class ItemRepository extends BaseRepository {
  constructor() {
    super({ validationSchema: () => ItemValidationSchema, persistence: () => Persistence });
  }

  /**
     *
     * @param item
     * @returns {ItemEntity}
     */
  persist(item) {
    if (item instanceof ItemEntity) {
      const newItem = Object.assign({}, item);
      this.getPersistence.push(newItem);
      return newItem;
    }
    throw new Error('Item isn\'t ItemEntity.');
  }

  /**
     * remove last element from stack
     *
     * @returns ItemEntity | null
     */
  takeOutLastItem() {
    return this.getPersistence.pop();
  }
}

module.exports = ItemRepository;
