const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { Console } = require('console');

const url = "mongodb://0.0.0.0:27017/";
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({"name": "Uthapizza", "description": "test"}, (err, result) => {
        assert.equal(err, null);

        console.log('After Insert: \n');
        console.log(result.insertedId);

        collection.find({}).toArray((err, docs)=> {
            assert.equal(err, null);

            console.log('Found:\n');
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);

                client.close();
            });
        });
    });

});