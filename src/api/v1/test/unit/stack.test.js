const ItemRepository = require('../../repositories/stack/ItemRepository');
const ItemEntity = require('../../entities/stack/ItemEntity');

test('Validate error message', () => {
    const itemEntity = new ItemEntity({tex: ""});
    const stackRepository = new ItemRepository();
    const validated = stackRepository.validate(itemEntity);
    expect.stringContaining(validated.error && validated.error.message);
});

test('In­memory stack (LIFO):\n' +
    '1. Add "Hello" to stack 2. Add "World" to stack 3. Get item from stack\n' +
    'a. "World" would be returned 4. Add "Again" to stack\n' +
    '5. Get item from stack\n' +
    'a. "Again" would be returned\n' +
    '6. Get item from stack\n' +
    'a. "Hello" would be returned', () => {
    const stackRepository = new ItemRepository();

    const itemEntityHello = new ItemEntity({text: "Hello"});
    const itemEntityWorld = new ItemEntity({text: "World"});
    const itemEntityAgain = new ItemEntity({text: "Again"});

    const savedItemEntityHello = stackRepository.persist(itemEntityHello);
    const savedItemEntityWorld = stackRepository.persist(itemEntityWorld);

    expect(stackRepository.takeOutLastItem()).toEqual(savedItemEntityWorld);

    const savedItemEntityAgain = stackRepository.persist(itemEntityAgain);

    expect(stackRepository.takeOutLastItem()).toEqual(savedItemEntityAgain);
    expect(stackRepository.takeOutLastItem()).toEqual(savedItemEntityHello);
});