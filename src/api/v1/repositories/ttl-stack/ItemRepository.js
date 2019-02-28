const moment = require('moment');
const BaseRepository = require('../BaseRepository');
const ItemValidationSchema = require('../../entities/ttl-stack/ItemValidationSchema');
const ItemEntity = require('../../entities/ttl-stack/ItemEntity');
const EmptyEntity = require('../../entities/EmptyEntity');
const Persistence = require('../../persistance/ttl-stack/Persistence');

class ItemRepository extends BaseRepository {
    constructor() {
        super({validationSchema: () => ItemValidationSchema, persistence: () => Persistence})
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
                item = Object.assign({}, item);
                this.getPersistence().push(item);
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
        return this.findOne({condition: "key", value: key});
    }

    findItemConsiderTTl({item, currentTime}) {
        if (item.ttl) {
            return this.considerTTl({item: item, currentTime})
        }

        return item;
    }

    /**
     *
     * @param item ItemEntity
     * @param currentTime
     * @returns {ItemEntity|EmptyEntity}
     */
    considerTTl({item, currentTime}) {
        if ((currentTime - item.timeCreated) > item.ttl) {
            return new EmptyEntity();
        }
        return item;
    }
}

module.exports = ItemRepository;