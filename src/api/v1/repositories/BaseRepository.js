const Joi = require('joi');
const EmptyEntity = require('../entities/EmptyEntity');

class BaseRepository {
    /**
     *
     * @returns {Function}
     */
    get getValidationSchema() {
        return this._getValidationSchema;
    }

    /**
     *
     * @returns {Array}
     */
    get getPersistence() {
        return this._getPersistence();
    }

    /**
     *
     * @param {Function} validationSchema
     * @param {Function} persistence
     */
    constructor({validationSchema, persistence}) {
        this._getValidationSchema = validationSchema;
        this._getPersistence = persistence;
    }

    /**
     *
     * @param item
     * @returns {*}
     */
    validate(item) {
        return Joi.validate(item, this._getValidationSchema());
    }

    /**
     *
     * @returns {Array}
     */
    findAll() {
        return this._getPersistence().slice();
    }

    /**
     *
     * @param item ItemEntity
     */
    remove(item) {
        let persistence = this._getPersistence();

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
        const persistence = this._getPersistence();
        for (let i = 0, len = persistence.length; i < len; ++i) {
            if (item.key === persistence[i].key) {
                const _item = Object.assign({}, item);
                persistence[i] = _item;
                return _item;
            }
        }

        throw new Error('Item wasn\'t found.');
    }
}

module.exports = BaseRepository;