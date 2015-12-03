var Collection = require("../../lib/collection");
var MemoryStore = require("../../lib/memory-db/store");
var Db = require("../../lib/db");

describe("collection", function() {

  var emptyCollection;
  var testCollection;
  var testDocuments;
  var XYZ_INDEX;
  var JKL_INDEX;

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
    XYZ_INDEX = 0;
    JKL_INDEX = 1;

    var db = new Db("test", new MemoryStore());
    db.createCollection("empty", function(error, emptyCol) {
      emptyCollection = emptyCol;
      db.createCollection("test", function(error, testCol) {
        testCollection = testCol;
        testCollection.insertMany(testDocuments, function() {
          done();
        });
      });
    });

  });

  it("should delete one document matching filter", function(done) {
    testCollection.deleteOne({
      item: "jkl"
    }, function(error, result) {
      testCollection.find().toArray(function(error, docs) {
        testDocuments.splice(JKL_INDEX, 1);
        expect(docs).toEqual(testDocuments);
        done();
      });
    });
  });

  it("should error when one document matching filter does not exist", function(done) {
    expect(true);
    done();
  });

  it("should delete all documents matching filter", function(done) {
    testCollection.deleteMany({}, function(error, result) {
      testCollection.find().toArray(function(error, docs) {
        expect(docs).toEqual([]);
        done();
      });
    });
  });

  it("should error when one document matching filter does not exist", function(done) {
    expect(true);
    done();
  });

  it("should find documents matching query", function(done) {
    testCollection.find({
      item: "jkl"
    }).toArray(function(error, docs) {
      var testDoc = testDocuments.slice(JKL_INDEX, JKL_INDEX + 1);
      expect(docs).toEqual(testDoc);
      done();
    });
  });

  it("should insert one document", function(done) {
    emptyCollection.insertOne(testDocuments[XYZ_INDEX], function(error, result) {
      emptyCollection.find().toArray(function(error, docs) {
        expect(docs).toEqual([testDocuments[XYZ_INDEX]]);
        done();
      });
    });
  });

  it("should insert many documents", function(done) {
    emptyCollection.insertMany(testDocuments, function(error, result) {
      emptyCollection.find().toArray(function(error, docs) {
        expect(docs).toEqual(testDocuments);
        done();
      });
    });
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
