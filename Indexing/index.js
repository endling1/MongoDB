var insertMany = function(){
	for(var i = 0; i < 100000; i++){
		db.user.insert({
			"i": i,
			"name": "user" + i,
			"age": Math.floor(Math.random() * 120)
		});
	}
}

insertMany();

db.user.find({"name": "user101"}).explain("executionStats");
db.user.createIndex({"name": 1});
db.user.find({"name": "user101"}).explain("executionStats");
db.user.createIndex({"i": 1, "name": -1});