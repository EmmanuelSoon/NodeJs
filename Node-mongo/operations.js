const assert = require('assert');

//POST
exports.insertDocument =(db, document, collection, callback) =>{
    const coll = db.collection(collection);
    return coll.insert(document);
};

//GET
exports.findDocuments =(db, collection, callback) =>{
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

//DELETE
exports.removeDocument =(db, document, collection, callback) =>{
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

//PUT
exports.updateDocument =(db, document, update ,collection, callback) =>{
    const coll = db.collection(collection);
    return coll.updateOne(document, {$set: update }, null);
};