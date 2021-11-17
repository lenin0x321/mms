const {Client} = require('pg');
const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "lenin@123",
    database: "postgres"
})
client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
// const text = `
//   CREATE TABLE IF NOT EXISTS "users" (
//       "id" SERIAL UNIQUE,
//       "name" VARCHAR(50) UNIQUE NOT NULL,
//       "password" VARCHAR(100) NOT NULL,
//       "role" VARCHAR(15) DEFAULT 'Teacher',
//       PRIMARY KEY ("id")
// );`;

// client.query(text,(err,result)=>{
//     if(!err){
//         console.log(result.rows);
//     }
//     if(err){
//         console.log(err)
//     }
// })

const Mark = `
  CREATE TABLE IF NOT EXISTS "marks" (
      "id" SERIAL UNIQUE,
      "object_id" INT UNIQUE NOT NULL,
      "subject_one" VARCHAR(100) NOT NULL,
      "subject_one_mark" INT NOT NULL,
      "subject_two" VARCHAR(100) NOT NULL,
      "subject_two_mark" INT NOT NULL,
      "subject_three" VARCHAR(100) NOT NULL,
      "subject_three_mark" INT NOT NULL,
      "subject_four" VARCHAR(100) NOT NULL,
      "subject_four_mark" INT NOT NULL,
      "subject_five" VARCHAR(100),
      "subject_five_mark" INT,
      "subject_six" VARCHAR(100),
      "subject_six_mark" INT,
      PRIMARY KEY ("id")
);`;

client.query(Mark,(err,result)=>{
    if(!err){
        console.log(result.rows);
    }
    if(err){
        console.log(err)
    }
})