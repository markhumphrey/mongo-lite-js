"use strict";

var Dexie = require("dexie");
var _ = require("lodash");

var Store = function(dbName, options) {
  this.dbName = dbName;
  this.db = new Dexie(this.dbName);
};

Store.prototype.open = function(callback) {
  this.db.open();
  callback(null, this);
};

Store.prototype.close = function(force, callback) {
  this.db.close();
  callback(null, this);
};

Store.prototype.collection = function(name, options, callback) {
  if (!_.find(this.db.tables, _.matchesProperty('name', name)))
    callback(new Error("collection " + name + " does not exist"), null);
  else {
    this.db.table(name).toArray(function(col) {
      callback(null, col);
    });
  }
};

Store.prototype.collections = function(callback) {
  var colsArray = [];
  var done = _.after(this.db.tables.length, function() {
    callback(null, colsArray);
  });

  this.db.tables.forEach(function(table) {
    table.toArray().then(function(col) {
      //console.log("success=" + col);
      colsArray.push(col);
    }).catch(function(error) {
      console.log("error=" + error);
      colsArray.push([]);
    }).finally(done);
  });
};

Store.prototype.createCollection = function(name, options, callback) {
  var meta = {
    name: name,
    store: this
  };
  this.db.close();

  var schema = {};
  schema[name] = '_id';
  this.db.version(1).stores(schema);

  this.db.open();
  callback(null, meta);
};

Store.prototype.dropCollection = function(name, callback) {
  this.db.close();

  // null schema to delete collection
  var schema = {};
  schema[name] = null;
  this.db.version(1).stores(schema);

  this.db.open();
  callback(null, {});
};

Store.prototype.dropDatabase = function(callback) {
  this.db.delete().then(function() {
    //console.log("DROP_DATABASE: success");
    callback(null, {});
  }).catch(function(error) {
    console.log("DROP_DATABASE: " + error);
    callback({}, null);
  });
};

Store.prototype.matchDocuments = function(name, filter) {
  if (!_.find(this.db.tables, _.matchesProperty('name', name)))
    throw new Error("collection " + name + " does not exist");

  // empty query matches all documents
  if (Object.keys(filter).length === 0)
    return this.db.table(name).toCollection();

  // match each field against document
  var col = this.db.table(name).filter(function(doc) {
    for (var field in filter) {
      var value = filter[field];
      console.log("key=" + field + " value=" + value);
      if (field in doc && doc[field] === value)
        return true;
    }
    return false;
  });
  return col;
};

Store.prototype.findDocuments = function(meta, filter, options, callback) {
  var col;
  try {
    col = this.matchDocuments(meta.name, filter);
  } catch (error) {
    callback({}, null);
  }

  col.toArray().then(function(docs) {
    callback(null, docs);
  }).catch(function(error) {
    console.log("error=" + error);
    callback({}, null);
  });

};

Store.prototype.deleteDocuments = function(meta, filter, options, callback) {
  var col;
  try {
    col = this.matchDocuments(meta.name, filter);
  } catch (error) {
    callback({}, null);
  }

  col.delete().then(function(deleteCount) {
    // TODO: populate result object
    var result = {};
    callback(null, result);
  }).catch(function(error) {
    console.log("error=" + error);
    callback({}, null);
  });

};

Store.prototype.insertDocuments = function(meta, docs, options, callback) {
  docs = Array.isArray(docs) ? docs : [docs];

  var done = _.after(docs.length, function() {
    var result = {}; // TODO: populate result object
    callback(null, result);
  });

  //console.log("insertDocuments NAME=" + meta.name);
  var self = this;
  docs.forEach(function(doc) {
    self.db.table(meta.name).add(doc).then(function() {
        //console.log("inserting: " + doc);
    }).catch(function(error) {
        console.log("inserting ERROR: " + error);
    }).finally(done);
  });
};

Store.prototype.updateDocuments = function(meta, query, document, options, callback) {

  var result = {}; // TODO: populate result object
  callback(null, result);
};

module.exports = Store;
