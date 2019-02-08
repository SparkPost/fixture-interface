'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const util = require('util');

/**
 * Helper for throwing not implemented errors for functions that are expected to be overridden
 * @param name
 */
function notImplemented(name) {
  throw new Error(`${name} must be implmented in your data fixture`);
}

class Fixture {
  /**
   * @desc Creates a distinct dataset for a test or test suite. Expects _insert and _remove to be overridden
   */
  constructor() {
    this.data = [];
  }

  /**
   * @desc Inserts one record into the data source. Intended to be overridden.
   */
  insert() {
    notImplemented('insert');
  }

  /**
   * @desc Removes one record from the data source. Intended to be overridden.
   */
  remove() {
    notImplemented('remove');
  }

  /**
   * @desc Takes a given data set and uses the insert function to provision it.
   *
   * @param jsonArray {Array} - an array of data objects to be provisioned
   * @returns {Promise} - A promise that resolves with an array of the resulting insert resolutions.
   */
  provision(jsonArray) {
    return Promise.map(_.cloneDeep(jsonArray), (dataObj) =>
      this.insert(dataObj).then(() =>
        this.data.push(dataObj)
      ));
  }

  /**
   * @deprecated - use alsoRemove instead
   * @desc A convenience method for adding data that is generated during the execution of a test. Any data added with this method will be cleaned up when `.cleanup` is called.
   *
   * @param data {Object}
   */
  addData(data) {
    return this.alsoRemove(data);
  }

  /**
   * @desc A convenience method for adding data that is generated during the execution of a test. Any data added with this method will be cleaned up when `.cleanup` is called.
   *
   * @param data {Object}
   */
  alsoRemove(data) {
    return this.data.push(data);
  }

  /**
   * @desc Clears data by invoking the remove method for each object that was previously provisioned or added.
   *
   * @returns {Promise}
   */
  cleanup() {
    return Promise.map(this.data, (item) => this.remove(item)).then(() => this.data = []);
  }
}

// depricate addData in favor `alsoRemove`
util.deprecate(Fixture.prototype.addData, '', 'DEP0001');

module.exports = Fixture;
