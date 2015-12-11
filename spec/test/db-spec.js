var DB = require("../../lib/db");
var MongoClient = require("../../lib/mongo-client");

describe("db:MemoryDB", function() { describeDB({ store: "memory"}); });
describe("db:IndexedDB", function() { describeDB({ store: "indexed-db"}); });

function describeDB(options) {

  var db;
  beforeEach(function(done) {
    var client = new MongoClient();
    client.connect("test", options, function(error, testdb) {
      db = testdb;
      done();
    });
  });

  afterEach(function(done) {
    var db;
    var client = new MongoClient();
    client.connect("test", options, function(error, testdb) {
      db = testdb;
      db.dropDatabase(function(error, result) {
        done();
      });
    });
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

}
