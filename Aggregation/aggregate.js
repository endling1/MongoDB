// var insertMany = function(){
// 	for(var i = 0; i < 100000; i++){
// 		db.user.insert({
// 			"i": i,
// 			"name": "user" + i,
// 			"age": Math.floor(Math.random() * 120)
// 		});
// 	}
// }

db.user.aggregate(
	{"$match": {"age": {"$gt": 20, "$lt": 30}}},
	{"$project": {"age": 1, "_id": 0}},
	{"$group": {"_id": "$age", "count": {"$sum": 1}}},
	{"$sort": {"count": -1}},
	{"$limit": 5}
)

// Pipeline expressions for $project
// Arithmetic
db.c.aggregate({
	"$project": {
		"totalPay": {
			"$add": ["$salary", "$bonus"]
			// "$subtract": ["$salary", "$fine"]
			// "$multiply": ["$dailyWage", "$noOfDays"]
			// "$divide": ["$yearlyWage", 12]
		}
	}
});

// Date
db.c.aggregate({
	"$project": {
		"tenure": {
			"$subtract": [{"$year": new Date()}, {"$year": "$hiredIn"}]
			"$subtract": [{"$month": new Date()}, {"$month": "$hiredIn"}]
			"$subtract": [{"$week": new Date()}, {"$week": "$hiredIn"}]
			"$subtract": [{"$hour": new Date()}, {"$hour": "$hiredIn"}]
			"$subtract": [{"$second": new Date()}, {"$second": "$hiredIn"}]
			"$subtract": [{"$minute": new Date()}, {"$minute": "$hiredIn"}]
			"$subtract": [{"$dayOfWeek": new Date()}, {"$dayOfWeek": "$hiredIn"}]
			"$subtract": [{"$dayOfMonth": new Date()}, {"$dayOfMonth": "$hiredIn"}]
		}
	}
});