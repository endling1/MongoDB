// mongod --replSet trs --port 27017
// mongod --replSet trs --port 27018
// mongod --replSet trs --port 27019

//mongo
var config = {
	"_id": "trs",
	"members": [
		{"_id": 0, "host": "localhost:27017"},
		{"_id": 1, "host": "localhost:27018"},
		{"_id": 2, "host": "localhost:27019"}
	]
};

db = (new Mongo("localhost:27017")).getDB("test");
rs.initiate(config);

rs.config();
rs.isMaster();
rs.stepDown();
rs.freeze();
rs.status();