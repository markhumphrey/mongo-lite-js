"use strict";

var Cursor = function(meta) {
  this.meta = meta;
  this.store = meta.store;
  this.pos = 0;
  this.cmd = {};
};

Cursor.prototype.count = function(options, callback) {
    if(typeof options == 'function') callback = options; options = {};
    options = options || {};

    // TODO: should not need to make a new query every time we count
    this.store.findDocuments(this.meta, this.cmd.query, {}, function(error, documents) {
      callback(null, documents.length);
    });
};

Cursor.prototype.filter = function(query) {
    query = query || {};
    this.cmd.query = query;
    return this;
};

Cursor.prototype.hasNext = function(callback) {
  // TODO: should not need to make a new query every time we check next
  var self = this;
  this.store.findDocuments(this.meta, this.cmd.query, {}, function(error, documents) {
    callback(null, self.pos < documents.length);
  });
};

Cursor.prototype.limit = function(limit) {
  if(typeof limit !== 'number')
    throw new Error("limit requires an integer");

  this.cmd.limit = limit;
  return this;
};

Cursor.prototype.project = function(value) {
  this.cmd.project = value;
  return this;
};

Cursor.prototype.next = function(callback) {
  var self = this;
  this.hasNext(function(error, next) {
    var doc = null;
    if (!next) {
      callback({}, doc);
    } else {
      // TODO: should not need to make a new query every time we iterate
      self.store.findDocuments(self.meta, self.cmd.query, {}, function(error, documents) {
        doc = documents.length > self.pos ? documents[self.pos] : null;
        self.pos++;
        callback(null, doc);
      });
    }
  });
};

Cursor.prototype.sort = function(keyOrList, direction) {
  // TODO: keyOrList parameter needs parsing
  this.cmd.sort = keyOrList;
  return this;
};

Cursor.prototype.toArray = function(callback) {
  this.rewind();
  this.store.findDocuments(this.meta, this.cmd.query, {}, callback);
};

Cursor.prototype.rewind = function() {
  this.pos = 0;
};

module.exports = Cursor;
