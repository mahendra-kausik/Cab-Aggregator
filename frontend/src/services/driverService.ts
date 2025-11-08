import { apiClient } from './apiClient';
import { ApiResponse, User } from '../types';

export interface DriverLocationUpdate {
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
}

class DriverService {
  /**
   * Update driver availability status
   */
  async updateAvailability(isAvailable: boolean): Promise<User> {
    try {
      const response = await apiClient.put<ApiResponse<User>>('/users/driver/availability', {
        isAvailable,
      });

      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(response.data.error?.message || 'Failed to update availability');
      }
    } catch (error: any) {
      console.error('Update availability error:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to update availability');
    }
  }

  /**
   * Update driver location
   */
  async updateLocation(location: DriverLocationUpdate): Promise<User> {
    try {
      const response = await apiClient.put<ApiResponse<User>>('/users/location', {
        latitude: location.latitude,
        longitude: location.longitude,
        heading: location.heading,
        speed: location.speed,
      });

      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(response.data.error?.message || 'Failed to update location');
      }
    } catch (error: any) {
      console.error('Update location error:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to update location');
    }
  }

  /**
   * Get driver's current active ride
   */
  async getActiveRide(): Promise<any> {
    try {
      const response = await apiClient.get<ApiResponse<any>>('/rides/driver/active');

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error?.message || 'Failed to get active ride');
      }
    } catch (error: any) {
      console.error('Get active ride error:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to get active ride');
    }
  }

  /**
   * Get driver statistics
   */
  async getDriverStats(): Promise<{
    totalRides: number;
    rating: number;
    earnings: number;
    todayRides: number;
  }> {
    try {
      const response = await apiClient.get<ApiResponse<{
        totalRides: number;
        rating: number;
        earnings: number;
        todayRides: number;
      }>>('/users/driver/stats');

      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(response.data.error?.message || 'Failed to get driver stats');
      }
    } catch (error: any) {
      console.error('Get driver stats error:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to get driver stats');
    }
  }
}

export const driverService = new DriverService();