/**
 * Models index file - exports all database models
 */

const User = require('./User');
const Ride = require('./Ride');
const OTP = require('./OTP');

module.exports = {
  User,
  Ride,
  OTP
};