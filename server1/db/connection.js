var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "webchat"

});

con.connect(function(err) {
  if (err) throw err;
  var sql = "CREATE TABLE if not exists user(id INT AUTO_INCREMENT, name VARCHAR(255) not null, email VARCHAR(255) not null, phone VARCHAR(255) not null, chat_info text, room_id VARCHAR(255), PRIMARY KEY (id))";
  con.query(sql, function (err, result) {
  if (err) throw err;
  });
});

module.exports = con;
