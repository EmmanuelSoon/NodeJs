const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
const { Console } = require('console');

const url = "mongodb://0.0.0.0:27017/";
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    dboper.insertDocument(db, {name: "Vadonut", description: 'Test'}, 'dishes', (result) =>{
        console.log('Insert Document: \n', result.insertedCount);

        dboper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found Document:\n' ,docs);

            dboper.updateDocument(db, {name: 'Vadonut'}, {description:'Updated Test'}, 'dishes', (result)=>{
                console.log('Updated Document:\n', result);
                
                dboper.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found Document:\n' ,docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Drop Collection: ', result);

                        client.close();
                    });
                });

            });
        })
    })

});