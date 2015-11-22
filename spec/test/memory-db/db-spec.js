var Db = require("../../../lib/memory-db/db");

describe("collection", function() {

  var db;
  beforeEach(function() {
    db = new Db();
  });

  it("should return existing collection", function(done) {
    db.createCollection("foo");
    db.collection("foo", {}, function(error, collection) {
      expect(error).toBeNull();
      expect(collection).not.toBeNull();
      done();
    });
  });

  it("should return null when collection does not exist", function(done) {
    db.collection("foo", {}, function(error, collection) {
      expect(error).not.toBeNull();
      expect(collection).toBeNull();
      done();
    });
  });

});
