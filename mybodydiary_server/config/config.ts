import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  development : {
    username : process.env.DB_USERNAME || 'root',
    password : process.env.DB_PASSWORD || '1234',
    database : process.env.DB_DBNAME || 'mybodydiary',
    host : process.env.DB_HOST || 'localhost',
    port : process.env.DB_PORT || 3306,
    dialect : "mysql"
  }
}