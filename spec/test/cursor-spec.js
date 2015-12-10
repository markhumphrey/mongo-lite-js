var Cursor = require("../../lib/cursor");
var MongoClient = require("../../lib/mongo-client");

describe("cursor:MemoryDB", function() { describeCursor({ store: "memory"}); });
describe("cursor:IndexedDB", function() { describeCursor({ store: "indexed-db"}); });

function describeCursor(options) {

  var emptyCollection;
  var testCollection;
  var emptyCursor;
  var testCursor;
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

    var db;
    var client = new MongoClient();
    client.connect("test", options, function(error, testdb) {
      db = testdb;
      db.createCollection("empty", function(error, emptyCol) {
        emptyCollection = emptyCol;
        emptyCursor = emptyCollection.find();
        db.createCollection("test", function(error, testCol) {
          testCollection = testCol;
          testCursor = testCollection.find();
          testCollection.insertMany(testDocuments, function() {
            done();
          });
        });
      });
    });

  });

  it("should count total number of documents", function(done) {
    testCursor.count(function(error, count) {
      expect(count).toEqual(testDocuments.length);
      done();
    });
  });

  it("should add filter and return cursor", function(done) {
    expect(true);
    done();
  });

  it("should return true if more documents", function(done) {
    testCursor.hasNext(function(error, next) {
      expect(next).toEqual(true);
      testCursor.next(function(error, doc) {
        expect(next).toEqual(true);
        done();
      });
    });
  });

  it("should return false if no more documents", function(done) {
    expect(true);
    done();
  });

  it("should add limit and return cursor", function(done) {
    expect(true);
    done();
  });

  it("should error if limit not a number", function(done) {
    expect(true);
    done();
  });

  it("should add project and return cursor", function(done) {
    expect(true);
    done();
  });

  it("should return next document", function(done) {
    testCursor.next(function(error, doc) {
      expect(doc).toEqual(testDocuments[0]);
      testCursor.next(function(error, doc) {
        expect(doc).toEqual(testDocuments[1]);
        done();
      });
    });
  });

  it("should error if no next document", function(done) {
    expect(true);
    done();
  });

  it("should add sort and return cursor", function(done) {
    expect(true);
    done();
  });

  it("should reset cursor and return array of documents", function(done) {
    expect(true);
    done();
  });

}
