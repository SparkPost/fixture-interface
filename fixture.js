

const Promise = require('bluebird');
const _ = require('lodash');
const util = require('util');

/**
 * The Fixture class is meant to be extended so that specific implementations share the same interface.  A
 * fixture is meant to supply data for testing purposes so that tests can be reliably repeatable.  See
 * [README.md](/README.md) for more information to use fixtures and examples.
 */
class Fixture {
  /**
   * Creates a distinct dataset for a test or test suite. Expects _insert and _remove to be overridden
   */
  constructor() {
    this.data = [];
  }

  /**
   * Inserts one record into the data source. Intended to be overridden.
   */
  insert() {
    notImplemented('insert');
  }

  /**
   * Inserts many records into the data source. Intended to be overridden.
   */
  batchInsert() {
    notImplemented('batchInsert');
  }

  /**
   * Removes one record from the data source. Intended to be overridden.
   */
  remove() {
    notImplemented('remove');
  }

  /**
   * Takes a given data set and uses the insert function to provision it.
   * The insert function will be called for every entry in jsonArray.
   *
   * @param {Array} jsonArray - an array of data objects to be provisioned
   * @returns {Promise} A promise that resolves with an array of the resulting insert resolutions.
   */
  provision(jsonArray) {
    return Promise.map(_.cloneDeep(jsonArray), (dataObj) => this.insert(dataObj).then((insertResult) => {
      this.data.push(dataObj);
      return insertResult;
    }));
  }

  /**
   * Takes a given data set and uses the batchInsert function to provision it.
   * The batchInsert function will be called once for the entire jsonArray.
   *
   * @param {Array} jsonArray - an array of data objects to be provisioned
   * @returns {Promise} A promise that resolves with an array of the resulting insert resolutions.
   */
  batchProvision(jsonArray) {
    return this.batchInsert(jsonArray).then((batchInsertResult) => Promise.map(_.cloneDeep(jsonArray), (dataObj) => this.data.push(dataObj)).then(() => batchInsertResult));
  }

  /**
   * A convenience method for adding data that is generated during the execution of a test. Any data added with this
   * method will be cleaned up when `.cleanup` is called. (DEPRECATED IN FAVOR OF `alsoRemove`)
   *
   * @deprecated - use alsoRemove instead
   *
   * @param {Object} data - an object in the same format as what is passed to provision.  It only needs the fields
   * defined that `remove` will need to remove the data.
   *
   * @returns {number} The number of items added to the internal cache.
   */
  addData(data) {
    return this.alsoRemove(data);
  }

  /**
   * A convenience method for adding data that is generated during the execution of a test. Any data added with this
   * method will be cleaned up when `.cleanup` is called.
   *
   * @param {Object} data - an object in the same format as what is passed to provision.  It only needs the fields
   * defined that `remove` will need to remove the data.
   *
   * @returns {number} The number of items added to the internal cache.
   */
  alsoRemove(data) {
    return this.data.push(data);
  }

  /**
   * Clears data by invoking the remove method for each object that was previously provisioned or added.
   *
   * @returns {Promise}
   */
  cleanup() {
    return Promise.map(this.data, (item) => this.remove(item)).then(() => this.data = []);
  }
}

/**
 * Helper for throwing not implemented errors for functions that are expected to be overridden
 * @param {string} name - Name of the function to implement
 */
function notImplemented(name) {
  throw new Error(`${name} must be implemented in your data fixture`);
}

// depricate addData in favor `alsoRemove`
util.deprecate(Fixture.prototype.addData, '`addData` has been deprecated in favor of `alsoRemove`', 'DEP0001');

module.exports = Fixture;
