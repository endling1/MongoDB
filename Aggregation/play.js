var ins = function(){
	for(var i = 0;i < 10; i++){
		db.play.insert({
			"worker_id": i,
			"firstname": "FN" + i,
			"lastname": "LN" + i,
			"salary": (Math.floor(Math.random() * 10000)),
			"department": "DPT" + (Math.floor(Math.random() * 10)),
			"date": (new Date())
		})
	}
};

//Q-1. Write an SQL query to fetch “FIRST_NAME” from Worker table using the alias name as <WORKER_NAME>.
db.play.find({}, {"firstname": 1, "_id": 0});
db.play.aggregate({
	"$project": {
		"FIRST_NAME": "$firstname",
		"_id": 0
	}
});

//Q-2. Write an SQL query to fetch “FIRST_NAME” from Worker table in lower case.
db.play.aggregate({
	"$project": {
		"FIRST_NAME": {"$toLower" : "$firstname"},
		"_id": 0
	}
});

//Q-3. Write an SQL query to fetch unique values of DEPARTMENT from Worker table.
db.play.distinct("department");

//Q-4. Write an SQL query to print first 2 characters of FIRST_NAME from Worker table.
db.play.aggregate({
	"$project": {
		"FIRST_NAME": {"$substr" : ["$firstname", 0, 2]},
		"_id": 0
	}
});

//Q-5. Write an SQL query to find the position of the number (‘6’) in the first name column FN6 from Worker table.
var map = function(){
	emit("k",{"pos": this.firstname.indexOf("6")});
};
var reduce = function(key, emits){
	return emits;
};
var map = function(){
	emit("k", {"pos": this.firstname.indexOf("6")});
};
var reduce = function(key, emits){
	return {"pos": emits[0].pos};
};
db.runCommand({"mapreduce": "play", "map": map, "reduce": reduce, "out": {"inline": 1}, "query": {"firstname": "FN6"}});

db.play.aggregate(
	{"$match": {"firstname": "FN6"}},
	{"$project": {
		"pos": {"$indexOfCP" : ["$firstname", "6"]}
	}}
);

//Q-8. Write an SQL query that fetches the unique values of DEPARTMENT from Worker table and prints its length.

db.play.aggregate(
	{"$group": {"_id": "$department"}},
	{"$project": {
		"len": {"$strLenBytes": "$_id"},
        "_id": 0
	}}
);