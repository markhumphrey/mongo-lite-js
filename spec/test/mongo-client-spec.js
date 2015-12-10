var MongoClient = require("../../lib/mongo-client");

describe("mongo-client:MemoryDB", function() { describeMongoClient({ store: "memory"}); });
describe("mongo-client:IndexedDB", function() { describeMongoClient({ store: "indexed-db"}); });

function describeMongoClient(options) {

  var client;
  beforeEach(function() {
    client = new MongoClient();
  });

  it("should create a memory db", function() {
    expect(true);
  });

  it("should throw an error on null callback", function() {
    expect(function() {
      client.connect("", options, null);
    }).toThrow();
  });
}
