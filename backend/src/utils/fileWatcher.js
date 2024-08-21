const chokidar = require('chokidar');
const processFile = require('../services/fileService');

const watchFile = (filePath, io) => {
  chokidar.watch(filePath).on('change', async () => {
    await processFile(filePath);
    io.emit('data_updated', { message: 'Data updated' });
  });
};

module.exports = watchFile;
