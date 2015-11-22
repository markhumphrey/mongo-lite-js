var MongoClient = require("../../lib/mongo-client");

describe("connect", function() {

  var client;
  beforeEach(function() {
    client = new MongoClient();
  });

  it("should create a memory db", function() {
    expect(true);
  });

  it("should throw an error on null callback", function() {
    expect(function() {
      client.connect("", {}, null);
    }).toThrow();
  });
});
