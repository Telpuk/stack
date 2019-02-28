const uuidv1 = require('uuid/v1');

class BaseEntity {
    /**
     *
     * @returns {string}
     */
    get id() {
        return this._id;
    }

    /**
     *
     * @param {string} value
     */
    set id(value) {
        this._id = value;
    }

    /**
     * @constructor
     */
    constructor() {
        this._id = uuidv1();
    }
}


module.exports = BaseEntity;