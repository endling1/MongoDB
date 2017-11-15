/* DB: user
		Collection: profile

	db = user
*/

var doc = {
	"name": "John Doe",
	"age": 30,
	"emails": [
		"john.doe@gmail.com",
		"john.doe@yahoo.com"
	],
	"favBook": {
		"author": "KC",
		"book": "MongoDB: The definitive guide"
	} 
};
// "_id": ObjectId("1a2s3d4f5g6h7j8k90987654"),

// Create

db.profile.insert(doc);
db.profile.insertMany([doc, doc, doc]);

// Delete

db.profile.remove({});
db.profile.drop();

// Update

// Replace entire document
doc = db.profile.findOne({"name": "John Doe"});
doc.name = "Jane Doe";
db.profile.update({"name": "John Doe"}, doc);

// Update modifiers
db.profile.update({"name": "Jane Doe"}, {"$set": {"name": "Johnny Doe"}});

db.profile.update({"name": "Johnny Doe"}, {"$inc": {"age": -20}});

db.profile.update({"name": "Johnny Doe"}, {"$set": {"trash": true}});
db.profile.update({"name": "Johnny Doe"}, {"$unset": {"trash": 1}});

db.profile.update({"name": "Johnny Doe"}, {"$set": {"favBook.author": "Kristina Chodorow"}});

// Array modifiers

// Add
db.profile.update({"name": "Johnny Doe"}, {"$push": {"emails": "johnny.doe@gmail.com"}});
db.profile.update({"name": "Johnny Doe"}, {"$push": {"emails": {"$each": ["johnny.doe@hotmail.com", "johnny.doe@yahoo.com"]}}});
db.profile.update({"name": "Johnny Doe"}, {"$push": {"emails": {"$each": ["johnny.doe2@hotmail.com", "johnny.doe2@yahoo.com"], "$slice": -5}}});

// Remove
db.profile.update({"name": "Johnny Doe"}, {"$pop": {"emails": -1}});
db.profile.update({"name": "Johnny Doe"}, {"$pull": {"emails": "jd@gmail.com"}});

// By index
db.profile.update({"name": "Johnny Doe"}, {"$set": {"emails.0": "johnny.doe@gmail.com"}});

// Unique
db.profile.update({"emails": {"$ne": "johnny.doe@hotmail.com"}}, {"$push": {"emails" : "johnny.doe@hotmail.com"}});
db.profile.update({"name": "Johnny Doe"}, {"$addToSet": {"emails": {"$each": ["johnny.doe@gmail.com", "jd@gmail.com"]}}});

// Upsert
db.profile.update({"name": "Jinny Doe"}, {"$inc": {"age": -20}} ,true);
db.profile.update({"name": "Jinny Doe"}, {"$inc": {"age": 30}} ,true);

// Multiple
db.profile.update({"age": 10}, {"$inc": {"age": 2}}, false, true);

// Returning updated documents
db.runCommand({getLastError: 1});
db.runCommand({"findAndModify": "profile", "query": {"name": "Johnny Doe"}, "update": {"$set": {"age": 15}}});
	/*  collection
		query
		sort
		update
		remove
		new
		fields
		upsert
	*/