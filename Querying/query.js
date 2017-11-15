/* DB: user
		Collection: profile

	db = user
*/

/* 
{
    "_id" : ObjectId("5a0bf0311cb67b28842885b6"),
    "name" : "Johnny Doe",
    "age" : 15.0,
    "emails" : [ 
        "johnny.doe@gmail.com", 
        "johnny.doe@yahoo.com", 
        "johnny.doe2@hotmail.com", 
        "johnny.doe@hotmail.com"
    ],
    "favBook" : {
        "author" : "Kristina Chodorow",
        "book" : "MongoDB: The definitive guide"
    }
}
{
    "_id" : ObjectId("5a0bfcf0dfb751345a888d64"),
    "name" : "Jinny Doe",
    "age" : 10.0
}
{
    "_id" : ObjectId("5a0c341d1cb67b28842885b8"),
    "name" : "John Doe",
    "age" : 30.0,
    "emails" : [ 
        "john.doe@gmail.com", 
        "john.doe@yahoo.com"
    ],
    "favBook" : {
        "author" : "KC",
        "book" : "MongoDB: The definitive guide"
    }
}
*/

db.profile.find({});
db.profile.find({}, {"age": 1});
db.profile.find({}, {"age": 1, "_id": 0});

db.profile.find({"age": 15}, {"age": 1, "_id": 0});

// Query Conditionals
db.profile.find({"age": {"$gt": 5, "$lte": 15}});
db.profile.find({"age": {"$in": [10, 5, 16]}});
db.profile.find({"$or": [{"age": 15}, {"name": "John Doe"}]});
db.profile.find({"age": {"$ne": 10}});
db.profile.find({"$and": [{"age": 15}, {"name": "John Doe"}]});
db.profile.find({"age": {"$mod": [5, 0]}});
db.profile.find({"age": {"$not" : {"$mod": [5, 0]}}});
db.profile.find({"name": "/Doe$/"});

db.profile.find({"emails": "johnny.doe@gmail.com"});
db.profile.find({"emails": {"$all": ["johnny.doe@gmail.com", "john.doe@yahoo.com"]}});
db.profile.find({"name": "Johnny Doe"}, {"emails": {"$slice": 2}});
//$elemMatch

db.profile.find({"$where": function(){
	if(this.name === "John Doe"){
		return true;
	}
	return false;
}});

db.profile.find({}).limit(1);
db.profile.find({}).skip(1);
db.profile.find({}).sort({"name": 1});

var cursor = db.profile.find({});
while(cursor.hasNext()){
	print(cursor.next().name);
}