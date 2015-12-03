var Collection = require("../../../lib/memory-db/collection");
var MemoryStore = require("../../../lib/memory-db/store");
var Db = require("../../../lib/memory-db/db");

describe("collection", function() {

  var collection;
  var testDocuments;
  beforeEach(function(done) {
    testDocuments = [
      {
        _id: 100,
        type: "food",
        item: "xyz",
        qty: 25,
        price: 2.5,
        ratings: [ 5, 8, 9 ],
        memos: [ { memo: "on time", by: "shipping" }, { memo: "approved", by: "billing" } ]
      },
      {
        _id: 101,
        type: "fruit",
        item: "jkl",
        qty: 10,
        price: 4.25,
        ratings: [ 5, 9 ],
        memos: [ { memo: "on time", by: "payment" }, { memo: "delayed", by: "shipping" } ]
      }
    ];

    var db = new Db("test", new MemoryStore());
    db.createCollection("foo", function(error, col) {
      collection = col;
      done();
    });
  });

  it("should delete one document matching filter", function(done) {
    collection.insertMany(testDocuments, function() {
      collection.deleteOne({
        item: "jkl"
      }, function(error, result) {
        collection.find().toArray(function(error, docs) {
          var JKL_INDEX = 1;
          testDocuments.splice(JKL_INDEX, 1);
          expect(docs).toEqual(testDocuments);
          done();
        });
      });
    });
  });

  it("should error when one document matching filter does not exist", function(done) {
    expect(true);
    done();
  });

  it("should delete all documents matching filter", function(done) {
    expect(true);
    done();
  });

  it("should error when one document matching filter does not exist", function(done) {
    expect(true);
    done();
  });

  it("should find documents matching query", function(done) {
    expect(true);
    done();
  });

  it("should insert one document", function(done) {
    expect(true);
    done();
  });

  it("should insert many documents", function(done) {
    expect(true);
    done();
  });

  it("should replace one document matching filter", function(done) {
    expect(true);
    done();
  });

  it("should update one document matching filter", function(done) {
    expect(true);
    done();
  });

  it("should update all documents matching filter", function(done) {
    expect(true);
    done();
  });

});
