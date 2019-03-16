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

  it('should emit new entry event', async () => {
    const tx = await traigoFacturas.newEntry();

    const event = tx.logs[0].event;
    assert.equal(event, 'NewEntry');
  });

  it('should input and close one entry', async () => {
    await traigoFacturas.newEntry();

    await traigoFacturas.closeEntry(0);

    const entry = await traigoFacturas.entries(0);
    assert.equal(entry[1], false);

    const index = await traigoFacturas.index();
    assert.equal(index, 1);
  });

  it('should emit close entry event', async () => {
    await traigoFacturas.newEntry();
    const tx = await traigoFacturas.closeEntry(0);

    const event = tx.logs[0].event;
    const index = tx.logs[0].args.index;
    assert.equal(event, 'CloseEntry');
    assert.equal(index, 0);
  });

  it('should only close open auctions', async () => {
    assert.rejects(traigoFacturas.closeEntry(0));

    await traigoFacturas.newEntry();
    await traigoFacturas.closeEntry(0);

    assert.rejects(traigoFacturas.closeEntry(0));
  });
});
