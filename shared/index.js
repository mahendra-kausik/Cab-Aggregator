// Shared utilities and constants for Cab Aggregator Local Edition

// User roles
const USER_ROLES = {
    RIDER: 'rider',
    DRIVER: 'driver',
    ADMIN: 'admin'
};

// Ride statuses
const RIDE_STATUS = {
    REQUESTED: 'requested',
    MATCHED: 'matched',
    ACCEPTED: 'accepted',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
};

// Payment statuses
const PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed'
};

// API response format
const createApiResponse = (success, data = null, error = null) => {
    return {
        success,
        data,
        error,
        timestamp: new Date().toISOString()
    };
};

// Distance calculation utility (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

module.exports = {
    USER_ROLES,
    RIDE_STATUS,
    PAYMENT_STATUS,
    createApiResponse,
    calculateDistance
};