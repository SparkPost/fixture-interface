# @sparkpost/fixture-interface

`fixture-interface` is, as its name implies, an interface definition for creating fixtures during tests. 
The idea is that every fixture can create and then cleanup data for a given test before and after the test to make tests
highly isolated, repeatable, and stable.  This class must be extended to be used.  For detailed function documentation 
see [DOCUMENTATION.md](/DOCUMENTATION.md).  For Long Term Support Schedule, please see: [LTS.md](/LTS.md).

## Installation
```bash
npm i @sparkpost/fixture-interface
```

## Getting Started
The fixture interface class cannot be used on its own. Its intended to be extended with an implementation specific to a 
data source or model.  For data sources with less structure, it may be enough to create a fixture class just for the 
data source and then pass in relevant table or indexing information upon creation to make it reusable across several 
different databases or projects using that same database.  Elasticsearch comes to mind as an example of such a database.  
However, I've found that for databases with a little more structure (SQL or partial schema NoSQL), creating a fixture
class for the database type and then extending that on a per table or schema basis has been most useful. Please refer to 
the [examples directory](/example) for a fully implemented fixture example as well as executable tests using the fixture.
There are two examples of parent fixtures, one for an in memory store and another for AWS DynamoDB although it is not used
in the exmaple tests. 

## Implementation Example
Minimal implementation:
```js
const Fx = require('@sparkpost/fixture-interface');

class MyFx extends Fx {
  insert(item) {
    return Promise.resolve();
  }

  remove(key) {
    return Promise.resolve();
  }
}

module.exports = MyFx;
```
The only requirements of implementation are that the `insert` and `remove` functions be implemented and that these 
functions return a promise.  Within these functions we'll want to define the rules for inserting data into or removing 
data from our database respectively.

An example of inserting or removing items in AWS DynamoDB may look like:
```js
class DynamoFx extends Fx {

  constructor(connConfig, tableName) {
    super();

    this.tableName = tableName;

    // setup dynamo connection info
    this.db = new Aws.DynamoDB.DocumentClient(connConfig);
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
```
This particular fixture must also be extended as it requires the `makeKey` method to be implemented.  Since DynamoDB's 
partition keys are specific to each of its tables, this makes reusing this fixture across different tables fairly easy.

## Execution Example
At this point using your fixture is pretty easy. Instantiate it, pass it some data, and when your tests are done, clean 
it up.

_This example is written using Jest but the fixture usage is completely independent of test runners._ 
```js
describe('Basic Test', () => {
  let myFx;

    beforeAll(() => {
      // provisions data from a json file
      return myFx.provision(require('./data.json')) 
    });
    
    afterAll(() => {
      return myFx.cleanup();
    });
    
    it('should be asserting some db operation', () => {
      // expect something here
    });
});
```
Thats it.  The `provision` method uses the `insert` method above we defined earlier to insert each item into the database.  
The `cleanup` method takes advantage of `remove`.

### Keeping Tests Independent for C~~RU~~D Operations
There may come a time where the database operation that you're testing is simply deleting data from the database.  
This is pretty easy to account for since you can just provision data with your fixture, delete it during your test and 
assert that its gone.  The cleanup function will try to delete that data however most databases will silently ignore a 
delete call for something that isn't there.  If not, your `remove` implementation may have to account for this.

When testing creation operations it ends up being a little different.  You can manage cleaning up any created data 
yourself, however your fixture has a method called `alsoRemove` and this comes in handy if you want to keep your tests
streamlined.  Once your test creates some data, you can call `alsoRemove` by passing it an item of the same format in 
your provisioning step to remove said item.  Your new item will be removed along with other provisioned data during the 
cleanup execution. This keeps your tests focused on testing without too much worry about data management.

```js
  it('should create an item', () => {
    const item = {key: 1, data:"string"};
    return model.create(item).then(()=>{
      myFx.alsoRemove(item);
      // expect something here
    })
  });
```
