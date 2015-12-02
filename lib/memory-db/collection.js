"use strict";

var Cursor = require("./cursor");

var Collection = function() {
  this.collectionName = "";
  this.documents = [];
};

Collection.prototype.deleteOne = function(filter, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  deleteDocuments(this, filter, options, callback);
};

Collection.prototype.deleteMany = function(filter, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  deleteDocuments(this, filter, options, callback);
};

var deleteDocuments = function(self, filter, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};
  filter = filter || {};

  //docs = Array.isArray(docs) ? docs : [docs];

  //self.documents.push.apply(null, docs);
  var result = {}; // TODO: populate result object
  callback(null, result);
};

Collection.prototype.find = function(query) {
  query = query || {};
  var findCommand = query;
  return (new Cursor(this)).filter(query);
};

Collection.prototype.insertOne = function(doc, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  insertDocuments(this, doc, options, callback);
};

Collection.prototype.insertMany = function(docs, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  if (!Array.isArray(docs))
    callback(new Error("docs parameter must be an array of documents"), null);

  insertDocuments(this, docs, options, callback);
};

var insertDocuments = function(self, docs, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  docs = Array.isArray(docs) ? docs : [docs];

  Array.prototype.push.apply(self.documents, docs);
  var result = {}; // TODO: populate result object
  callback(null, result);
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

var updateDocuments = function(self, query, document, options, callback) {
  if(typeof options == 'function') callback = options; options = {};
  options = options || {};

  if (query === null || typeof query !== 'object')
    callback(new Error("query must be a valid Javascript object"), null);
  if (document === null || typeof document !== 'object')
    callback(new Error("document must be a valid Javascript object"), null);

  //docs = Array.isArray(docs) ? docs : [docs];

  //self.documents.push.apply(null, docs);
  var result = {}; // TODO: populate result object
  callback(null, result);
};

module.exports = Collection;
