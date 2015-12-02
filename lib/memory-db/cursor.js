"use strict";

var Cursor = function(meta) {
  this.meta = meta;
  this.store = meta.store;
  this.pos = 0;
  this.cmd = {};
};

Cursor.prototype.count = function(applySkipLimit, options, callback) {
    if(typeof options == 'function') callback = options; options = {};
    options = options || {};

    callback(null, this.meta.count);
};

Cursor.prototype.filter = function(query) {
    this.cmd.query = query;
    return this;
};

Cursor.prototype.hasNext = function(callback) {
  callback(null, this.pos < this.meta.count);
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
  var document = null;
  if (this.pos < this.meta.count) {
    this.post++;
    this.store.oneDocument(this.meta, this.pos, this.cmd, {}, callback);
  }
  callback(null, document);
};

Cursor.prototype.sort = function(keyOrList, direction) {
  // TODO: keyOrList parameter needs parsing
  this.cmd.sort = keyOrList;
  return this;
};

Cursor.prototype.toArray = function(callback) {
  this.rewind();
  this.store.allDocuments(this.meta, this.cmd, {}, callback);
};

Cursor.prototype.rewind = function() {
    this.post = 0;
};

module.exports = Cursor;
