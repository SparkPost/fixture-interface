'use strict';

const Fx = require('../../../fixture');
const Aws = require('aws-sdk');

/*
 * base class for interfacing with aws's dynamodb
 * This is meant to be a more practical example
 */
class DynamoFx extends Fx {

  constructor(connConfig, tableName) {
    super();

    this.tableName = tableName;

    // setup dynamo connection info
    const client = new Aws.DynamoDB.DocumentClient(connConfig);
    this.db = client;
  }

  makeKey(item){
    throw new Error(`'makeKey' must be implmented in your DyanmoDB data fixture`);
  }

  insert(item) {
    return this.db.put({TableName: this.tableName, Item: item}).promise();
  }

  remove(item) {
    return this.db.delete({TableName: this.tableName, Key: this.makeKey(item)}).promise();
  }
}

module.exports = DynamoFx;
