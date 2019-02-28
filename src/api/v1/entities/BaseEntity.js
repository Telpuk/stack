const uuidv1 = require('uuid/v1');

class BaseEntity {
    constructor() {
        this.id = uuidv1();
    }
}


module.exports = BaseEntity;