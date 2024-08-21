// app.js
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const dataRoutes = require('./controllers/dataController'); // Import your router
const watchFile = require('./utils/fileWatcher');
const { createTable } = require('./utils/database');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.use('/api', dataRoutes); // Use the router for /api routes

// Create the table if it does not exist
createTable().catch(err => console.error('Error creating table', err));

// Monitor file changes
const filePath = 'C:\\Users\\ERUKULA RAJASREE\\Downloads\\HSBC.csv'; // Updated path
watchFile(filePath, io);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
