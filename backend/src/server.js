const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const watchFile = require('./utils/fileWatcher');

// Create the server with app
const server = http.createServer(app);
const io = socketIo(server);

// Monitor file changes
const filePath = 'C:\\Users\\ERUKULA RAJASREE\\Downloads\\HSBC.csv'; // Update this path
watchFile(filePath, io);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
