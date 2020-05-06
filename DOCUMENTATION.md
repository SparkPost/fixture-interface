# @sparkpost/fixture-interface *1.3.0*

> A simple interface to make helpers for setting up and tearing down data needed for tests.


### fixture.js


#### new Fixture() 

The Fixture class is meant to be extended so that specific implementations share the same interface.  A
fixture is meant to supply data for testing purposes so that tests can be reliably repeatable.  See
[README.md](/README.md) for more information to use fixtures and examples.






##### Returns


- `Void`



#### Fixture.constructor() 

Creates a distinct dataset for a test or test suite. Expects _insert and _remove to be overridden






##### Returns


- `Void`



#### Fixture.insert() 

Inserts one record into the data source. Intended to be overridden.






##### Returns


- `Void`



#### Fixture.batchInsert() 

Inserts many records into the data source. Intended to be overridden.






##### Returns


- `Void`



#### Fixture.remove() 

Removes one record from the data source. Intended to be overridden.






##### Returns


- `Void`



#### Fixture.provision(jsonArray) 

Takes a given data set and uses the insert function to provision it.
The insert function will be called for every entry in jsonArray.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| jsonArray | `Array`  | - an array of data objects to be provisioned | &nbsp; |




##### Returns


- `Promise`  A promise that resolves with an array of the resulting insert resolutions.



#### Fixture.batchProvision(jsonArray) 

Takes a given data set and uses the batchInsert function to provision it.
The batchInsert function will be called once for the entire jsonArray.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| jsonArray | `Array`  | - an array of data objects to be provisioned | &nbsp; |




##### Returns


- `Promise`  A promise that resolves with an array of the resulting insert resolutions.



#### Fixture.addData(data) 

A convenience method for adding data that is generated during the execution of a test. Any data added with this
method will be cleaned up when `.cleanup` is called. (DEPRECATED IN FAVOR OF `alsoRemove`)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `Object`  | - an object in the same format as what is passed to provision. It only needs the fields defined that `remove` will need to remove the data. | &nbsp; |




##### Returns


- `number`  The number of items added to the internal cache.



#### Fixture.alsoRemove(data) 

A convenience method for adding data that is generated during the execution of a test. Any data added with this
method will be cleaned up when `.cleanup` is called.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `Object`  | - an object in the same format as what is passed to provision. It only needs the fields defined that `remove` will need to remove the data. | &nbsp; |




##### Returns


- `number`  The number of items added to the internal cache.



#### Fixture.cleanup() 

Clears data by invoking the remove method for each object that was previously provisioned or added.






##### Returns


- `Promise`  



#### notImplemented(name) 

Helper for throwing not implemented errors for functions that are expected to be overridden




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | - Name of the function to implement | &nbsp; |




##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
