// MongoDB initialization script for Cab Aggregator Local Edition
// This script runs when the MongoDB container starts for the first time

// Switch to the application database
db = db.getSiblingDB('cab_aggregator');

// Create application user with read/write permissions
db.createUser({
  user: 'app_user',
  pwd: 'app_password',
  roles: [
    {
      role: 'readWrite',
      db: 'cab_aggregator'
    }
  ]
});

// Create indexes for better performance
// User collection indexes
db.users.createIndex({ "phone": 1 }, { unique: true, sparse: true });
db.users.createIndex({ "email": 1 }, { unique: true, sparse: true });
db.users.createIndex({ "role": 1 });
db.users.createIndex({ "driverInfo.currentLocation": "2dsphere" });
db.users.createIndex({ "driverInfo.isAvailable": 1 });

// Ride collection indexes
db.rides.createIndex({ "riderId": 1 });
db.rides.createIndex({ "driverId": 1 });
db.rides.createIndex({ "status": 1 });
db.rides.createIndex({ "pickup.coordinates": "2dsphere" });
db.rides.createIndex({ "destination.coordinates": "2dsphere" });
db.rides.createIndex({ "timeline.requestedAt": -1 });

// OTP collection indexes (with TTL for automatic cleanup)
db.otps.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });
db.otps.createIndex({ "phone": 1 });

print('MongoDB initialization completed successfully');
print('Database: cab_aggregator');
print('User: app_user created with readWrite permissions');
print('Indexes created for users, rides, and otps collections');