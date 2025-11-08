// Database connection configuration for Cab Aggregator
const mongoose = require('mongoose');

class DatabaseConnection {
  constructor() {
    this.isConnected = false;
    this.connectionStatus = 'disconnected';
    this.host = null;
    this.name = null;
    this.retryCount = 0;
    this.maxRetries = 5;
    this.retryDelay = 5000; // 5 seconds
  }

  async connect() {
        // Default fallback (for local development without docker-compose)
    const mongoUri = process.env.MONGO_URI || 'mongodb://cabadmin:SecureDevPassword2024@mongodb:27017/cab_aggregator?authSource=admin';

    console.log('🔄 Connecting to MongoDB...');
    console.log(`📍 URI: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`);

    // Mongoose connection options (updated for newer versions)
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 5, // Maintain a minimum of 5 socket connections
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
    };

    try {
      await this.connectWithRetry(mongoUri, options);
    } catch (error) {
      console.error('💥 Max connection retries reached. Exiting...');
      throw error;
    }
  }

  async connectWithRetry(mongoUri, options) {
    while (this.retryCount < this.maxRetries) {
      try {
        await mongoose.connect(mongoUri, options);

        this.isConnected = true;
        this.connectionStatus = 'connected';
        this.host = mongoose.connection.host;
        this.name = mongoose.connection.name;

        console.log('✅ MongoDB connected successfully');
        console.log(`📊 Database: ${this.name} on ${this.host}`);

        // Set up connection event listeners
        this.setupEventListeners();

        return;
      } catch (error) {
        this.retryCount++;
        this.isConnected = false;
        this.connectionStatus = 'error';

        console.error(`❌ MongoDB connection error: ${error.message}`);

        if (this.retryCount < this.maxRetries) {
          console.log(`🔄 Retrying connection in ${this.retryDelay / 1000}s... (${this.retryCount}/${this.maxRetries})`);
          await this.delay(this.retryDelay);
        } else {
          throw error;
        }
      }
    }
  }

  setupEventListeners() {
    mongoose.connection.on('connected', () => {
      console.log('🔗 Mongoose connected to MongoDB');
      this.isConnected = true;
      this.connectionStatus = 'connected';
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err.message);
      this.isConnected = false;
      this.connectionStatus = 'error';
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 Mongoose disconnected from MongoDB');
      this.isConnected = false;
      this.connectionStatus = 'disconnected';
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      console.log('\n🛑 Received SIGINT. Closing MongoDB connection...');
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed.');
      process.exit(0);
    });
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      status: this.connectionStatus,
      host: this.host,
      name: this.name,
      readyState: mongoose.connection.readyState,
      readyStateText: this.getReadyStateText(mongoose.connection.readyState)
    };
  }

  getReadyStateText(state) {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    return states[state] || 'unknown';
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async disconnect() {
    if (this.isConnected) {
      await mongoose.connection.close();
      this.isConnected = false;
      this.connectionStatus = 'disconnected';
      console.log('✅ MongoDB connection closed');
    }
  }
}

// Create and export a singleton instance
const dbConnection = new DatabaseConnection();
module.exports = dbConnection;