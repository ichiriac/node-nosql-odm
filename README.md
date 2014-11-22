NodeJS NoSQL ODM Layer
======================

The main idea of this project is to provide one single & simple way to declare
an ODM (Object Document Mapper) that could be stored on various engines.

It's like an ORM (Object Relationnal Mapper) but for NoSQL engines.

This project is an abstract layer providing a strong and extensible structure 
for easily implement any ODM storage engine.

## What it does

### Using Promises API and EventEmitter

This lib is fully compliant with the [promises standard](https://www.promisejs.org/)
and improves readability of your code ([take a look at the callback hell](http://callbackhell.com/)).

Each object also inherits from the EventEmitter lib, so each action triggers also an event that you can listen. 
That's provides you an easy and loosely-coupled way to extend and implement beahviours

### JSON Schema Definition Compliant

The mapper deals with object documents. Their structure are declared using a Javascript object compliant with 
the [JSON Schema Definition](http://json-schema.org/).
