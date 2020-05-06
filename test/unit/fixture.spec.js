

describe('Fixture', function() {
  const sinon = require('sinon');
  let Fixture
    , testFixture
    , insertStub
    , batchInsertStub
    , removeStub;

  beforeAll(function() {
    Fixture = require('../../fixture');
  });

  beforeEach(function() {
    insertStub = sinon.stub().resolves('hi');
    batchInsertStub = sinon.stub().resolves('10000 hellos');
    removeStub = sinon.stub().resolves('bye');
  });

  describe('constructor', function() {
    let constructorFixture;

    beforeEach(function() {
      constructorFixture = new Fixture();
    });

    it('should register the insert and remove methods', function() {
      expect(constructorFixture.data).toEqual([]);
    });

    it('shouldn\'t have an initial insert', function() {
      try {
        constructorFixture.insert();
        throw new Error('why here?');
      } catch (err) {
        expect(err.message).toBe('insert must be implmented in your data fixture');
      }
    });


    it('shouldn\'t have an initial remove', function() {
      try {
        constructorFixture.remove();
        throw new Error('why here?');
      } catch (err) {
        expect(err.message).toBe('remove must be implmented in your data fixture');
      }
    });
  });

  describe('methods', function() {
    beforeEach(function() {
      testFixture = new Fixture();
      testFixture.insert = insertStub;
      testFixture.batchInsert = batchInsertStub;
      testFixture.remove = removeStub;
    });

    it('should invoke insert for each item passed to provision', function() {
      return testFixture.provision([1, 2, 3]).then((res) => {
        expect(res[0]).toBe(1);
        expect(res[1]).toBe(2);
        expect(res[2]).toBe(3);
        expect(insertStub.callCount).toBe(3);
        expect(testFixture.data.length).toBe(3);
      });
    });

    it('should invoke batchInsert once on a call to batchProvision', function() {
      return testFixture.batchProvision([1, 2, 3]).then((res) => {
        expect(res[0]).toBe(1);
        expect(res[1]).toBe(2);
        expect(res[2]).toBe(3);
        expect(insertStub.callCount).toBe(0);
        expect(batchInsertStub.callCount).toBe(1);
        expect(testFixture.data.length).toBe(3);
      });
    });

    it('should add an object to the data collection', function() {
      expect(testFixture.alsoRemove(1)).toBe(1);
      expect(testFixture.data.length).toBe(1);
    });

    it('should remove all data', function() {
      testFixture.data.push(1,2,3);

      return testFixture.cleanup().then(() => {
        expect(removeStub.callCount).toBe(3);
        expect(testFixture.data.length).toBe(0);
      });
    });
  });
});
