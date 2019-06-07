'use strict';


const Fx = require('../../../fixture');
const mem = require('../../data-store/memory');
const Promise = require('bluebird');

/**
 * Base class for manipulating a structured in memeory store.  All items stored are expected to have a property called
 * `hash_key`.
 */
class MemoryFx extends Fx {

  constructor() {
    super();
  }

  insert(item) {
    mem[item.hash_key] = item;
    return Promise.resolve();
  }

  remove(item) {
    delete mem[item.hash_key];
    return Promise.resolve();
  }
}

module.exports = MemoryFx;
