const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'financial_data',
  password: 'Rajsri@4',
  port: 5432,
});

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS transactions (
      step INTEGER,
      customer VARCHAR(255),
      age VARCHAR(50),
      gender VARCHAR(10),
      zipcodeOri VARCHAR(20),
      merchant VARCHAR(255),
      zipMerchant VARCHAR(20),
      category VARCHAR(255),
      amount NUMERIC(10, 2),
      fraud INTEGER
    );
  `;
  await pool.query(query);
};

const insertData = async (data) => {
  const query = `
    INSERT INTO transactions (step, customer, age, gender, zipcodeOri, merchant, zipMerchant, category, amount, fraud)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;
  const promises = data.map(record => pool.query(query, [
    record.step,
    record.customer,
    record.age,
    record.gender,
    record.zipcodeOri,
    record.merchant,
    record.zipMerchant,
    record.category,
    record.amount,
    record.fraud
  ]));
  await Promise.all(promises);
};

module.exports = { createTable, insertData };
