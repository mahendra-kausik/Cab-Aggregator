# Services Documentation

This directory contains the core business logic services for the Cab Aggregator application.

## MatchingService

Handles driver-ride matching with geospatial queries and atomic assignment operations.

### Key Features

- **Geospatial Matching**: Uses MongoDB 2dsphere index for efficient proximity queries
- **Radius Expansion**: Automatically expands search radius (5km → 10km → 15km) when no drivers found
- **Atomic Assignment**: Prevents race conditions using MongoDB transactions
- **Conflict Resolution**: Handles simultaneous ride assignments to the same driver

### Performance Characteristics

- **Time Complexity**: O(log n) for geospatial queries with 2dsphere index
- **Space Complexity**: O(k) where k is the number of drivers within radius
- **Atomic Operations**: Uses MongoDB findOneAndUpdate for conflict-free assignments

### Usage Example

```javascript
const { MatchingService } = require('../services');

// Find nearest driver for a ride
const result = await MatchingService.findNearestDriver(
  longitude, 
  latitude, 
  rideId, 
  initialRadius
);

// Assign ride to specific driver
const assignment = await MatchingService.assignRideToDriver(rideId, driverId);

// Release driver when ride completes
const release = await MatchingService.releaseDriver(driverId);
```

## FareService

Implements dynamic fare calculation with configurable pricing components.

### Fare Formula

```
Total Fare = (base_fare + per_km * distance + per_min * duration) * surge_multiplier * service_level_multiplier
```

### Key Features

- **Dynamic Pricing**: Configurable base fare, distance, and time rates
- **Surge Pricing**: Demand-based surge multiplier calculation
- **Service Levels**: Economy, Comfort, Premium pricing tiers
- **Fare Caps**: Minimum and maximum fare limits
- **Precision**: All monetary values rounded to 2 decimal places

### Performance Characteristics

- **Time Complexity**: O(1) for fare calculations
- **Space Complexity**: O(1) for fare breakdown objects
- **Precision**: All monetary values rounded to 2 decimal places

### Usage Example

```javascript
const { FareService } = require('../services');

// Basic fare calculation
const fare = FareService.calculateFare(distance, duration, surgeMultiplier, serviceLevel);

// Estimate fare with current demand
const estimate = FareService.estimateFare(distance, duration, {
  serviceLevel: 'comfort',
  demandData: { activeRides: 20, availableDrivers: 5 }
});

// Calculate final fare after ride completion
const finalFare = FareService.calculateFinalFare({
  actualDistance: 5.2,
  actualDuration: 18,
  estimatedFare: 12.50,
  serviceLevel: 'economy',
  surgeMultiplier: 1.2
});
```

## Configuration

### Pricing Configuration

```javascript
PRICING_CONFIG = {
  baseFare: 2.50,        // Fixed base fare
  perKmRate: 1.20,       // Rate per kilometer
  perMinRate: 0.25,      // Rate per minute
  minimumFare: 3.00,     // Minimum fare
  maximumFare: 200.00,   // Maximum fare cap
  
  surgePricing: {
    low: 1.0,      // Normal pricing
    medium: 1.5,   // 50% surge
    high: 2.0,     // 100% surge
    peak: 2.5      // 150% surge
  },
  
  serviceLevels: {
    economy: 1.0,
    comfort: 1.3,
    premium: 1.8
  }
}
```

### Matching Configuration

```javascript
MATCHING_CONFIG = {
  INITIAL_RADIUS: 5000,                    // 5km in meters
  RADIUS_EXPANSION_STEPS: [5000, 10000, 15000], // 5km, 10km, 15km
  MAX_DRIVERS_TO_CONSIDER: 10,
  DRIVER_RESPONSE_TIMEOUT: 60000           // 60 seconds
}
```

## Error Handling

Both services implement comprehensive error handling:

- **Input Validation**: Validates all parameters before processing
- **Graceful Degradation**: Returns meaningful error messages
- **Logging**: Comprehensive error logging for debugging
- **Fallback Mechanisms**: Automatic fallback to alternative solutions

## Integration

These services are integrated into the RideController:

- **Ride Booking**: Uses FareService for fare estimation
- **Driver Matching**: Uses MatchingService for automatic driver assignment
- **Ride Acceptance**: Uses MatchingService for atomic assignment
- **Ride Completion**: Uses both services for final fare calculation and driver release

## Testing

Services can be tested through:

1. **Unit Tests**: Individual method testing (see `__tests__` directory)
2. **API Endpoints**: Integration testing through ride endpoints
3. **Manual Testing**: Direct service method calls

## Requirements Traceability

- **Requirement 3.1**: Driver matching with geospatial queries ✅
- **Requirement 3.4**: Configurable radius expansion logic ✅
- **Requirement 3.5**: Atomic driver assignment operations ✅
- **Requirement 2.2**: Dynamic fare calculation ✅