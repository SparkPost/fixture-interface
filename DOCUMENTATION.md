# @sparkpost/fixture-interface *1.2.0*

> A simple interface to make helpers for setting up and tearing down data needed for tests.


### fixture.js


#### new Fixture() 

The Fixture class is meant to be extended so that specific implementations share the same interface.  A
fixture is meant to supply data for testing purposes so that tests can be reliably repeatable.  See README.md for
more information to use fixtures and examples.






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



#### Fixture.remove() 

Removes one record from the data source. Intended to be overridden.






##### Returns


- `Void`



#### Fixture.provision(jsonArray) 

Takes a given data set and uses the insert function to provision it.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| jsonArray |  | {Array} - an array of data objects to be provisioned | &nbsp; |




##### Returns


- `Promise`  - A promise that resolves with an array of the resulting insert resolutions.



#### Fixture.addData(data) 

A convenience method for adding data that is generated during the execution of a test. Any data added with this
method will be cleaned up when `.cleanup` is called. (DEPRECATED IN FAVOR OF `alsoRemove`)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data |  | {Object} | &nbsp; |




##### Returns


- `Void`



#### Fixture.alsoRemove(data) 

A convenience method for adding data that is generated during the execution of a test. Any data added with this method will be cleaned up when `.cleanup` is called.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data |  | {Object} | &nbsp; |




##### Returns


- `Void`



#### Fixture.cleanup() 

Clears data by invoking the remove method for each object that was previously provisioned or added.






##### Returns


- `Promise`  



#### notImplemented(name) 

Helper for throwing not implemented errors for functions that are expected to be overridden




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name |  |  | &nbsp; |




##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*