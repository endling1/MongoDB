// Config Servers
// mongod --configsvr --dbpath dbc1 --replSet "cs0" --port 30006 
// mongod --configsvr --dbpath dbc2 --replSet "cs0" --port 30007
// mongod --configsvr --dbpath dbc3 --replSet "cs0" --port 30008
// Machine A, B and C

var config = {
	"_id": "cs0",
	"configsvr": true,
	"members": [
		{"_id": 0, "host": "localhost:30006"},
		{"_id": 1, "host": "localhost:30007"},
		{"_id": 2, "host": "localhost:30008"}
	]
};
// mongo --host "localhost" --port 30006
// rs.initiate(config);
//----------------------------------------------------------------------------//

// Replica 1
// mongod --shardsvr --dbpath db01 --replSet "rs0" --port 30000 
// mongod --shardsvr --dbpath db02 --replSet "rs0" --port 30001
// mongod --shardsvr --dbpath db03 --replSet "rs0" --port 30002
// Machine D, E and F with primary on D

var config = {
	"_id": "rs0",
	"members": [
		{"_id": 0, "host": "localhost:30000", "priority": 1},
		{"_id": 1, "host": "localhost:30001", "priority": 0.5},
		{"_id": 2, "host": "localhost:30002", "priority": 0.5}
	]
};
// mongo --nodb
// db = (new Mongo("localhost:30000")).getDB("test");
// rs.initiate(config);
//------------------------------------------------------------------------//

// Replica 2
// mongod --shardsvr --dbpath db10 --replSet "rs1" --port 30003
// mongod --shardsvr --dbpath db12 --replSet "rs1" --port 30004
// mongod --shardsvr --dbpath db13 --replSet "rs1" --port 30005
// Machine E, D and F with primary on E

var config = {
	"_id": "rs1",
	"members": [
		{"_id": 0, "host": "localhost:30003", "priority": 0.5},
		{"_id": 1, "host": "localhost:30004", "priority": 1},
		{"_id": 2, "host": "localhost:30005", "priority": 0.5}
	]
};
// db = (new Mongo("localhost:30003")).getDB("test");
// rs.initiate(config);
//--------------------------------------------------------------------------//

// Mongos on App server
// mongos --configdb cs0/localhost:30006,localhost:30007,localhost:30008

// Connect to mongos and add shards:

// sh.addShard("rs0/localhost:30000,localhost:30001,localhost:30002")
// sh.addShard("rs1/localhost:30003,localhost:30004,localhost:30005")

// Reduce chunk size
// use config
// db.settings.save( { _id:"chunksize", value: <sizeInMB> } )

// Populate some data
var list = [];
for(var i = 0; i < 100000; i++){
	list.push({
		i: i,
		username: "user" + i,
		createdAt: new Date()
	});
}
db.users.insertMany(list);

// sh.enableSharding("test");
// db.users.ensureIndex({"username": 1});
// sh.shardCollection("test.users", {"username": 1});