var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/runoob'; // 数据库为 runoob
 
var insertData = function(db, callback) {  
    //连接到表 site,test1
    var collection = db.collection('test1');
    //插入数据
    var data = [
        {"a-name":"菜鸟教程","url":"www.runoob.com"},
        {"a-name":"菜鸟工具","url":"c.runoob.com"}
    ];
    collection.insert(data, function(err, result) { 
        if(err){
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}
 
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    insertData(db, function(result) {
        console.log(result);
        db.close();
    });
});