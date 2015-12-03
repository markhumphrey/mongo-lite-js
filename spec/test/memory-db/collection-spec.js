var Collection = require("../../../lib/memory-db/collection");
var MemoryStore = require("../../../lib/memory-db/store");
var Db = require("../../../lib/memory-db/db");

describe("collection", function() {

  var collection;
  var testDocuments;
  beforeEach(function(done) {
    testDocuments = [
      {
        item: "ABC2",
        details: { model: "14Q3", manufacturer: "M1 Corporation" },
        stock: [ { size: "M", qty: 50 } ],
        category: "clothing"
      },
      {
        item: "MNO2",
        details: { model: "14Q3", manufacturer: "ABC Company" },
        stock: [ { size: "S", qty: 5 }, { size: "M", qty: 5 }, { size: "L", qty: 1 } ],
        category: "clothing"
      },
      {
        item: "IJK2",
        details: { model: "14Q2", manufacturer: "M5 Corporation" },
        stock: [ { size: "S", qty: 5 }, { size: "L", qty: 1 } ],
        category: "houseware"
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
        item: "MNO2"
      }, function(error, result) {
        collection.find().toArray(function(error, docs) {
          var MNO2_INDEX = 1;
          testDocuments.splice(MNO2_INDEX, 1);
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
