const ItemValidationSchema = require('../../entities/stack/ItemValidationSchema');
const ItemEntity = require('../../entities/stack/ItemEntity');
const Persistence = require('../../persistance/stack/Persistence');
const BaseRepository = require('../BaseRepository');

class ItemRepository extends BaseRepository {
    constructor() {
        super({validationSchema: () => ItemValidationSchema, persistence: () => Persistence})
    }

    /**
     *
     * @param item
     * @returns {boolean}
     */
    persist(item) {
        if (item instanceof ItemEntity) {
            item = Object.assign({}, item);
            this.getPersistence.push(item);
            return item;
        }
        throw new Error('Item isn\'t ItemEntity.');
    }

    /**
     * remove last element from stack
     *
     * @returns ItemEntity | null
     */
    takeOutLastItem() {
        return this.getPersistence.pop()
    }
}

module.exports = ItemRepository;