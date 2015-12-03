"use strict";

var Cursor = require("./cursor");

var Collection = function(meta) {
  this.meta = meta;
  this.store = meta.store;
};

Collection.prototype.deleteOne = function(filter, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  this.store.deleteDocuments(this.meta, filter, options, callback);
};

Collection.prototype.deleteMany = function(filter, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  this.store.deleteDocuments(this.meta, filter, options, callback);
};

Collection.prototype.find = function(query) {
  query = query || {};
  return (new Cursor(this.meta)).filter(query);
};

Collection.prototype.insertOne = function(doc, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  this.store.insertDocuments(this.meta, doc, options, callback);
};

Collection.prototype.insertMany = function(docs, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  if (!Array.isArray(docs))
    callback(new Error("docs parameter must be an array of documents"), null);

  this.store.insertDocuments(this.meta, docs, options, callback);
};

Collection.prototype.replaceOne = function(filter, doc, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};
};

Collection.prototype.updateOne = function(filter, update, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};
};

Collection.prototype.updateMany = function(filter, update, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};
};

module.exports = Collection;
