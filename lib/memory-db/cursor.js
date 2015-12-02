"use strict";

var Cursor = function(collection) {
  this.collection = collection;
  this.pos = 0;
  this.cmd = {};
};

Cursor.prototype.count = function(applySkipLimit, options, callback) {
    if(typeof options == 'function') callback = options; options = {};
    options = options || {};

    callback(null, this.collection.length);
};

Cursor.prototype.filter = function(query) {
    this.cmd.query = query;
    return this;
};

Cursor.prototype.hasNext = function(callback) {
  callback(null, this.pos < this.collection.length);
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
  if (this.pos < this.collection.length) {
    document = this.collection[this.pos];
    this.pos++;
  }
  callback(null, document);
};

Cursor.prototype.sort = function(keyOrList, direction) {
  // TODO: keyOrList parameter needs parsing
  this.cmd.sort = keyOrList;
  return this;
};

Cursor.prototype.toArray = function(callback) {
  // reset cursor
  this.pos = 0;
  callback(null, this.collection.slice(this.pos));
  return this;
};


module.exports = Cursor;
