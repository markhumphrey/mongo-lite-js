# markhumphrey/mongo-lite-js

This is an evolving personal project implementing a simple MongoDB-like interface on top of the browser-based IndexedDB.

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

Currently the and a in-memory storage imeplementation, and I am beginning to implement the IndexedDB storage engine. 

## Installation

To install dependencies:
```
npm install
```

To generate a bundled javascript file for browser use: 
```
npm run-script browserify
```
This will bundle the source into /bin/mongo-db-lite.js with a top level module named "mongolite".

## Usage

Until the interface has stabilized and is documented the best way to get an idea of usage is through the tests in the spec/ directory.

The examples/ directory has some sample usage. 

```
<!DOCTYPE html>
<html>

<head>
  <title>Hello, World!</title>
</head>

<body>
  <label>
    <input type="text" onkeydown="onDocEnter(this)">
  </label>
  <p id="collection-view">
  </p>
  <script src="/bin/mongo-lite.js"></script>
  <script>
    var client = new mongolite.MongoClient();
    var collection;
    client.connect("hello-world", function(error, db) {
      db.createCollection("test", function(error, col) {
        collection = col;
      });
    });

    var onDocEnter = function(el) {
      if (event.keyCode !== 13) {
        return;
      }
      doc = {
        item: el.value
      };
      collection.insertOne(doc, function(error, result) {
        renderCollection();
      });
    };

    var renderCollection = function() {
      collection.find().toArray(function(error, docs) {
        var el = document.getElementById('collection-view');
        el.innerHTML = JSON.stringify(docs);
      });
    };
    onDocSubmit();
  </script>
</body>

</html>
```
