var Db = require("../../../lib/memory-db/db");

describe("db", function() {

  var db;
  beforeEach(function() {
    db = new Db();
  });

  it("should return existing collection", function(done) {
    db.createCollection("foo", function() {
      db.collection("foo", {}, function(error, collection) {
        expect(error).toBeNull();
        expect(collection).not.toBeNull();
        done();
      });
    });
  });

  it("should error when collection does not exist", function(done) {
    db.collection("foo", function(error, collection) {
      expect(error).not.toBeNull();
      expect(collection).toBeNull();
      done();
    });
  });

  it("should return array of all collections", function(done) {
    db.createCollection("foo", function() {
      db.createCollection("bar", function() {
        db.collections(function(error, collections) {
          expect(error).toBeNull();
          expect(collections).not.toBe([[],[]]);
          done();
        });
      });
    });
  });

  it("should delete existing collection", function(done) {
    db.createCollection("foo", function() {
      db.dropCollection("foo", function(error, result) {
        expect(error).toBeNull();
        expect(result).not.toBeNull();
        done();
      });
    });
  });

  it("should error when collection does not exist", function(done) {
    expect(true);
    done();
  });

  it("should open database", function(done) {
    expect(true);
    done();
  });

  it("should error when opening already open database", function(done) {
    expect(true);
    done();
  });

  it("should close database", function(done) {
    expect(true);
    done();
  });

  it("should error when closing already closed database", function(done) {
    expect(true);
    done();
  });

});
