const Joi = require('joi');

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
}

module.exports = BaseRepository;