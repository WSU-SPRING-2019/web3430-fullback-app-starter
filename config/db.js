import mongoose from 'mongoose';
export function connect(uri) {
  if (process.env.NODE_ENV === 'production') {
    uri = process.env.MONGODB_URI;
  }

  mongoose.connect(uri, {
    useNewUrlParser: true
  });

  // CONNECTION EVENTS
  mongoose.connection.on('connected', () => console.log('Connected to ' + uri))
  mongoose.connection.on('error', (err) => console.err('Connection error: ' + err))
  mongoose.connection.on('disconnected', () => console.log('Disconnected'))

  // CAPTURE APP TERMINATION / RESTART EVENTS
  // To be called when process is restarted or terminated
  let gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(() => {
      console.log('Disconnected because ' + msg);
      callback();
    })
  };

  // For nodemon restarts
  process.once('SIGUSR2', () => gracefulShutdown('Nodemon restarted', () => process.kill(process.pid, 'SIGUSR2')));

  // For app termination
  process.on('SIGINT', () => gracefulShutdown('app terminated', () => process.exit(0)))
}