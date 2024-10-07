const app = require('.');
const { connectDb } = require('./config/db');

const PORT = 5454;

const startServer = async () => {
  await connectDb(); 
  app.listen(PORT, () => {
    console.log('API listening on port:', PORT);
  });
};

startServer();
