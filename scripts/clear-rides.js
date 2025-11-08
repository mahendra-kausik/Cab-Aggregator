const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB - use correct credentials
const MONGO_URI = process.env.MONGO_URI || 'mongodb://cabadmin:SecureDevPassword2024@localhost:27017/cab_aggregator?authSource=admin';
mongoose.connect(MONGO_URI);

// Define Ride schema
const rideSchema = new mongoose.Schema({}, { strict: false });
const Ride = mongoose.model('Ride', rideSchema);

async function clearActiveRides() {
  try {
    const result = await Ride.updateMany(
      { status: { $in: ['requested', 'matched', 'accepted', 'in_progress'] } },
      {
        status: 'cancelled',
        'timeline.cancelledAt': new Date()
      }
    );

    console.log(`✅ Cancelled ${result.modifiedCount} active rides`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

clearActiveRides();