const ItemRepository = require('../../repositories/ttl-stack/ItemRepository');
const ItemEntity = require('../../entities/ttl-stack/ItemEntity');
const EmptyEntity = require('../../entities/EmptyEntity');

test('Validate error message', () => {
    const itemEntity = new ItemEntity({keu: ""});
    const stackRepository = new ItemRepository();
    const validated = stackRepository.validate(itemEntity);
    expect.stringContaining(validated.error && validated.error.message);
});

test('In­memory key­value store with TTL:\n' +
    '1. Set "name" to "John"' +
    '2. Get "name"\n' +
    'a. This returns John 3. Get "age"\n' +
    'a. This returns an empty value\n' +
    '4. Set "name" to "Larry" with a TTL of 30 seconds 5. Get "name" (within 30 seconds of the set)\n' +
    'a. This returns "Larry"\n' +
    '6. Get "name" (more than 30 seconds after the set)\n' +
    'a. This returns an empty value', () => {
    const stackRepository = new ItemRepository();
    const itemEntity = new ItemEntity({key: "name", value: "John"});
    const itemEntityWithTTl = new ItemEntity({key: "name", value: "Larry", ttl: 5});

    const savedItemEntity = stackRepository.persist(itemEntity);
    expect(stackRepository.findByKey("name")).toEqual(savedItemEntity);
    expect(stackRepository.findByKey("age")).toEqual(new EmptyEntity());

    const savedItemEntityWithTTl = stackRepository.persist(itemEntityWithTTl);
    expect(stackRepository.findByKey("name")).toEqual(savedItemEntityWithTTl);

    expect(stackRepository.findItemConsiderTTl({item: savedItemEntityWithTTl, currentTime: savedItemEntityWithTTl.timeCreated + 6}))
        .toEqual(new EmptyEntity());

    expect(stackRepository.findItemConsiderTTl({item: savedItemEntityWithTTl, currentTime: savedItemEntityWithTTl.timeCreated + 2}))
        .toEqual(savedItemEntityWithTTl);

    stackRepository.remove(savedItemEntity);
    stackRepository.remove(savedItemEntityWithTTl);

    expect(stackRepository.findAll()).toEqual([]);

});