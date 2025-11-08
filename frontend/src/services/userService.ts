import { apiClient } from './apiClient';
import { ApiResponse, User } from '../types';

export interface UserProfile {
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
}

export interface DriverProfile extends UserProfile {
    licenseNumber?: string;
    vehicleDetails?: {
        make: string;
        model: string;
        plateNumber: string;
        color: string;
        year?: number;
    };
}

export interface UserStats {
    totalRides: number;
    rating: number;
    totalRatings: number;
    completedRides: number;
    cancelledRides: number;
    totalEarnings?: number;
}

class UserService {
    /**
     * Get current user profile
     */
    async getProfile(): Promise<User> {
        try {
            const response = await apiClient.get<ApiResponse<{ user: User }>>('/users/profile');

            if (response.data.success && response.data.data) {
                return (response.data.data as any).user || response.data.data;
            } else {
                throw new Error(response.data.error?.message || 'Failed to get profile');
            }
        } catch (error: any) {
            console.error('Get profile error:', error);
            throw new Error(error.response?.data?.error?.message || 'Failed to get profile');
        }
    }

    /**
     * Update user profile
     */
    async updateProfile(profileData: Partial<UserProfile>): Promise<User> {
        try {
            const response = await apiClient.put<ApiResponse<{ user: User; message: string }>>('/users/profile', profileData);

            if (response.data.success && response.data.data) {
                return (response.data.data as any).user || response.data.data;
            } else {
                throw new Error(response.data.error?.message || 'Failed to update profile');
            }
        } catch (error: any) {
            console.error('Update profile error:', error);
            throw new Error(error.response?.data?.error?.message || 'Failed to update profile');
        }
    }

    /**
     * Update driver profile (driver-specific)
     */
    async updateDriverProfile(driverData: Partial<DriverProfile>): Promise<User> {
        try {
            const response = await apiClient.put<ApiResponse<{ user: User; message: string }>>('/users/driver/profile', driverData);

            if (response.data.success && response.data.data) {
                return (response.data.data as any).user || response.data.data;
            } else {
                throw new Error(response.data.error?.message || 'Failed to update driver profile');
            }
        } catch (error: any) {
            console.error('Update driver profile error:', error);
            throw new Error(error.response?.data?.error?.message || 'Failed to update driver profile');
        }
    }

    /**
     * Get user statistics
     */
    async getUserStats(): Promise<UserStats> {
        try {
            const response = await apiClient.get<ApiResponse<UserStats>>('/users/stats');

            if (response.data.success && response.data.data) {
                return response.data.data;
            } else {
                throw new Error(response.data.error?.message || 'Failed to get user stats');
            }
        } catch (error: any) {
            console.error('Get user stats error:', error);
            throw new Error(error.response?.data?.error?.message || 'Failed to get user stats');
        }
    }

    /**
     * Change password
     */
    async changePassword(currentPassword: string, newPassword: string): Promise<void> {
        try {
            const response = await apiClient.put<ApiResponse<{ message: string }>>('/users/password', {
                currentPassword,
                newPassword
            });

            if (!response.data.success) {
                throw new Error(response.data.error?.message || 'Failed to change password');
            }
        } catch (error: any) {
            console.error('Change password error:', error);
            throw new Error(error.response?.data?.error?.message || 'Failed to change password');
        }
    }

    /**
     * Upload avatar
     */
    async uploadAvatar(file: File): Promise<string> {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await apiClient.post<ApiResponse<{ avatarUrl: string }>>('/users/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success && response.data.data) {
                return response.data.data.avatarUrl;
            } else {
                throw new Error(response.data.error?.message || 'Failed to upload avatar');
            }
        } catch (error: any) {
            console.error('Upload avatar error:', error);
            throw new Error(error.response?.data?.error?.message || 'Failed to upload avatar');
        }
    }

    /**
     * Toggle driver availability (driver only)
     */
    async toggleAvailability(isAvailable: boolean): Promise<User> {
        try {
            const response = await apiClient.put<ApiResponse<User>>('/users/driver/availability', {
                isAvailable
            });

            if (response.data.success && response.data.data) {
                return response.data.data;
            } else {
                throw new Error(response.data.error?.message || 'Failed to update availability');
            }
        } catch (error: any) {
            console.error('Toggle availability error:', error);
            throw new Error(error.response?.data?.error?.message || 'Failed to update availability');
        }
    }
}

export const userService = new UserService();
