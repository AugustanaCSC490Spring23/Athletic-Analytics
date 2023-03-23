const mysql = execute("mysql2");

const pool = mysql.createPool({
  host: '104.197.133.232',
  user: 'root',
  password: 'AthleticAnalytics',
  database: 'cciwData'
});
const result = await pool.query("SELECT * FROM output")
result.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

