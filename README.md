# NodeJS NoSQL ODM

This library is a tiny & simplistic ODM that will help you to
build a business model layer with ease, and without having to deal with 
technicals aspects of any NoSQL engine (support Couchbase, Redis and Sphinx).

 * CRUD operations
 * Getters & Setters on records properties
 * Validating data before saving it
 * Filtering and paginations
 * Setup views and helpers for filtering (support also customized views)
 * Mappers definition are compliant with JSON Schema Definition
 * Using Promises API and EventEmitter

*Current version: [v/0.1.11][dist]*

[![Build Status](https://travis-ci.org/ichiriac/node-nosql-odm.svg)](https://travis-ci.org/ichiriac/node-nosql-odm)
[![Dependency Status](https://david-dm.org/ichiriac/node-nosql-odm.svg)](https://david-dm.org/ichiriac/node-nosql-odm)
[![Coverage Status](https://img.shields.io/coveralls/ichiriac/node-nosql-odm.svg)](https://coveralls.io/r/ichiriac/node-nosql-odm)

## Getting started

Pick a driver to use depending on your NoSQL server :

- [CouchBase : Sofa ODM](https://github.com/ichiriac/sofa-odm/)
- [Redis : ReDM](https://github.com/ichiriac/sofa-odm/)


## Writing a new driver

You can also start to write your own driver, so you have just to start a new project and add nodm as a dependency :

```sh
npm install nodm --save
```

Take a look at already implemented drivers

#Misc

This code is distribute under The MIT License (MIT), authored by Ioan CHIRIAC.
