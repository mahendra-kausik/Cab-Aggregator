const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { requireAuth, requireDriver, requireAdmin } = require('../middleware/auth');

/**
 * User Routes
 * Base path: /api/users
 */

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile',
  requireAuth,
  UserController.getProfile
);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile',
  requireAuth,
  UserController.updateProfile
);

/**
 * @route   GET /api/users/stats
 * @desc    Get user statistics
 * @access  Private
 */
router.get('/stats',
  requireAuth,
  UserController.getUserStats
);

/**
 * @route   PUT /api/users/password
 * @desc    Change user password
 * @access  Private
 */
router.put('/password',
  requireAuth,
  UserController.changePassword
);

/**
 * @route   PUT /api/users/location
 * @desc    Update driver location
 * @access  Private (Driver only)
 */
router.put('/location',
  requireAuth,
  requireDriver,
  UserController.updateLocation
);

/**
 * @route   PUT /api/users/driver/profile
 * @desc    Update driver profile (including vehicle info)
 * @access  Private (Driver only)
 */
router.put('/driver/profile',
  requireAuth,
  requireDriver,
  UserController.updateDriverProfile
);

/**
 * @route   PUT /api/users/driver/availability
 * @desc    Update driver availability status
 * @access  Private (Driver only)
 */
router.put('/driver/availability',
  requireAuth,
  requireDriver,
  UserController.updateAvailability
);

/**
 * @route   GET /api/users/driver/stats
 * @desc    Get driver statistics
 * @access  Private (Driver only)
 */
router.get('/driver/stats',
  requireAuth,
  requireDriver,
  UserController.getDriverStats
);

// Admin routes
/**
 * @route   GET /api/users/admin/users
 * @desc    Get all users with filtering and pagination
 * @access  Private (Admin only)
 */
router.get('/admin/users',
  requireAuth,
  requireAdmin,
  UserController.getAllUsers
);

/**
 * @route   GET /api/users/admin/users/:userId
 * @desc    Get user details by ID
 * @access  Private (Admin only)
 */
router.get('/admin/users/:userId',
  requireAuth,
  requireAdmin,
  UserController.getUserById
);

/**
 * @route   PUT /api/users/admin/users/:userId/suspend
 * @desc    Suspend user account
 * @access  Private (Admin only)
 */
router.put('/admin/users/:userId/suspend',
  requireAuth,
  requireAdmin,
  UserController.suspendUser
);

/**
 * @route   PUT /api/users/admin/users/:userId/reactivate
 * @desc    Reactivate user account
 * @access  Private (Admin only)
 */
router.put('/admin/users/:userId/reactivate',
  requireAuth,
  requireAdmin,
  UserController.reactivateUser
);

/**
 * @route   GET /api/users/admin/stats
 * @desc    Get platform statistics
 * @access  Private (Admin only)
 */
router.get('/admin/stats',
  requireAuth,
  requireAdmin,
  UserController.getPlatformStats
);

/**
 * @route   GET /api/users/admin/rides
 * @desc    Get all rides with filtering and pagination
 * @access  Private (Admin only)
 */
router.get('/admin/rides',
  requireAuth,
  requireAdmin,
  UserController.getAllRides
);

module.exports = router;