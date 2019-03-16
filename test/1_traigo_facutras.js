const assert = require('assert');

const TraigoFacturas = artifacts.require('TraigoFacturas');

contract('TraigoFacturas', async (accounts) => {
  var traigoFacturas;

  beforeEach(async () => {
    traigoFacturas = await TraigoFacturas.new();
  });

  it('should have no entires at beginning', async () => {
    const index = await traigoFacturas.index();
    assert.equal(index, 0);

    const entry = await traigoFacturas.entries(0);
    assert.equal(entry[0], 0);
  });

  it('should input one entry', async () => {
    await traigoFacturas.newEntry();

    const index = await traigoFacturas.index();
    assert.equal(index, 1);

    const entry = await traigoFacturas.entries(0);
    assert.notEqual(entry[0], 0);
    assert.equal(entry[1], true);

    const emptyEntry = await traigoFacturas.entries(1);
    assert.equal(emptyEntry[0], 0);
  });

  it('should input and close one entry', async () => {
    await traigoFacturas.newEntry();

    await traigoFacturas.closeEntry(0);

    const entry = await traigoFacturas.entries(0);
    assert.equal(entry[1], false);

    const index = await traigoFacturas.index();
    assert.equal(index, 1);
  });
});
