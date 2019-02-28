const Joi = require('joi');
const EmptyEntity = require('../entities/EmptyEntity');

class BaseRepository {
    constructor({validationSchema, persistence}) {
        this.getValidationSchema = validationSchema;
        this.getPersistence = persistence;
    }

    /**
     *
     * @param item
     * @returns {*}
     */
    validate(item) {
        return Joi.validate(item, this.getValidationSchema());
    }

    /**
     *
     * @returns {Array}
     */
    findAll() {
        return this.getPersistence().slice();
    }

    /**
     *
     * @param item ItemEntity
     */
    remove(item) {
        let persistence = this.getPersistence();

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
     * @returns {any}
     */
    update(item) {
        const persistence = this.getPersistence();
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
     * @param condition
     * @param value
     * @returns {ItemEntity | EmptyEntity}
     */
    findOne({condition, value}) {
        const item = this.getPersistence().find((item) => {
            return item[condition] === value;
        });

        return item || (new EmptyEntity());
    }
}

module.exports = BaseRepository;