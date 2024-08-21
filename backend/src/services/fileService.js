const parseCSV = require('../utils/csvParser');
const { insertData } = require('../utils/database');

const processFile = async (filePath) => {
  const data = await parseCSV(filePath);
  await insertData(data);
};

module.exports = processFile;
