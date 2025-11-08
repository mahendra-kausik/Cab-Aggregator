import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { userService, UserStats, DriverProfile as DriverProfileData } from '../../services/userService';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import './DriverProfile.css';

const DriverProfile: React.FC = () => {
    const { user, updateUser, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form states
    const [name, setName] = useState(user?.profile.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const phone = user?.phone || '';

    // Driver-specific form states
    const [licenseNumber, setLicenseNumber] = useState(user?.driverInfo?.licenseNumber || '');
    const [vehicleMake, setVehicleMake] = useState(user?.driverInfo?.vehicleDetails.make || '');
    const [vehicleModel, setVehicleModel] = useState(user?.driverInfo?.vehicleDetails.model || '');
    const [vehiclePlateNumber, setVehiclePlateNumber] = useState(
        user?.driverInfo?.vehicleDetails.plateNumber || ''
    );
    const [vehicleColor, setVehicleColor] = useState(user?.driverInfo?.vehicleDetails.color || '');
    const [vehicleYear, setVehicleYear] = useState(
        (user?.driverInfo?.vehicleDetails as any).year || new Date().getFullYear()
    );

    // Password change states
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const data = await userService.getUserStats();
            setStats(data);
        } catch (err: any) {
            console.error('Failed to load stats:', err);
        }
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsLoading(true);

        try {
            const driverData: Partial<DriverProfileData> = {
                name,
                email: email || undefined,
                licenseNumber,
                vehicleDetails: {
                    make: vehicleMake,
                    model: vehicleModel,
                    plateNumber: vehiclePlateNumber,
                    color: vehicleColor,
                    year: vehicleYear,
                },
            };

            const updatedUser = await userService.updateDriverProfile(driverData);
            updateUser(updatedUser);
            setSuccessMessage('Profile updated successfully!');
            setIsEditing(false);
        } catch (err: any) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);

        try {
            await userService.changePassword(currentPassword, newPassword);
            setSuccessMessage('Password changed successfully!');
            setShowPasswordForm(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setError(err.message || 'Failed to change password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setName(user?.profile.name || '');
        setEmail(user?.email || '');
        setLicenseNumber(user?.driverInfo?.licenseNumber || '');
        setVehicleMake(user?.driverInfo?.vehicleDetails.make || '');
        setVehicleModel(user?.driverInfo?.vehicleDetails.model || '');
        setVehiclePlateNumber(user?.driverInfo?.vehicleDetails.plateNumber || '');
        setVehicleColor(user?.driverInfo?.vehicleDetails.color || '');
        setVehicleYear((user?.driverInfo?.vehicleDetails as any).year || new Date().getFullYear());
        setIsEditing(false);
        setError(null);
    };

    if (!user) {
        return <LoadingSpinner message="Loading profile..." />;
    }

    return (
        <div className="driver-profile">
            <div className="profile-container">
                <h1>My Profile</h1>

                {error && (
                    <div className="message error-message">
                        <span className="message-icon">⚠️</span>
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="message success-message">
                        <span className="message-icon">✅</span>
                        {successMessage}
                    </div>
                )}

                <div className="profile-content">
                    {/* Profile Information Card */}
                    <div className="profile-card">
                        <div className="card-header">
                            <h2>Personal Information</h2>
                            {!isEditing ? (
                                <button className="btn-secondary" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </button>
                            ) : (
                                <button className="btn-secondary" onClick={handleCancelEdit}>
                                    Cancel
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSaveProfile}>
                            <div className="profile-avatar">
                                <div className="avatar-circle">
                                    {user.profile.avatar ? (
                                        <img src={user.profile.avatar} alt={name} />
                                    ) : (
                                        <span className="avatar-initials">{name.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                                <div className="avatar-info">
                                    <h3>{name}</h3>
                                    <p className="user-role">Driver</p>
                                    <p className="user-rating">⭐ {user.profile.rating.toFixed(1)} Rating</p>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="tel" id="phone" value={phone} disabled className="input-disabled" />
                                    <small className="form-hint">Phone number cannot be changed</small>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address (Optional)</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={!isEditing}
                                    placeholder="Add your email"
                                />
                            </div>

                            <div className="section-divider">
                                <h3>Driver Information</h3>
                            </div>

                            <div className="form-group">
                                <label htmlFor="licenseNumber">License Number</label>
                                <input
                                    type="text"
                                    id="licenseNumber"
                                    value={licenseNumber}
                                    onChange={(e) => setLicenseNumber(e.target.value)}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            <div className="section-divider">
                                <h3>Vehicle Details</h3>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="vehicleMake">Make</label>
                                    <input
                                        type="text"
                                        id="vehicleMake"
                                        value={vehicleMake}
                                        onChange={(e) => setVehicleMake(e.target.value)}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="vehicleModel">Model</label>
                                    <input
                                        type="text"
                                        id="vehicleModel"
                                        value={vehicleModel}
                                        onChange={(e) => setVehicleModel(e.target.value)}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="vehiclePlateNumber">Plate Number</label>
                                    <input
                                        type="text"
                                        id="vehiclePlateNumber"
                                        value={vehiclePlateNumber}
                                        onChange={(e) => setVehiclePlateNumber(e.target.value)}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="vehicleColor">Color</label>
                                    <input
                                        type="text"
                                        id="vehicleColor"
                                        value={vehicleColor}
                                        onChange={(e) => setVehicleColor(e.target.value)}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="vehicleYear">Year</label>
                                <input
                                    type="number"
                                    id="vehicleYear"
                                    value={vehicleYear}
                                    onChange={(e) => setVehicleYear(parseInt(e.target.value))}
                                    disabled={!isEditing}
                                    min="1990"
                                    max={new Date().getFullYear() + 1}
                                    required
                                />
                            </div>

                            {isEditing && (
                                <div className="form-actions">
                                    <button type="submit" className="btn-primary" disabled={isLoading}>
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Statistics Card */}
                    <div className="profile-card stats-card">
                        <div className="card-header">
                            <h2>Performance Statistics</h2>
                        </div>

                        {stats ? (
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <div className="stat-icon">🚗</div>
                                    <div className="stat-content">
                                        <span className="stat-label">Total Rides</span>
                                        <span className="stat-value">{stats.totalRides}</span>
                                    </div>
                                </div>

                                <div className="stat-item">
                                    <div className="stat-icon">✅</div>
                                    <div className="stat-content">
                                        <span className="stat-label">Completed</span>
                                        <span className="stat-value">{stats.completedRides}</span>
                                    </div>
                                </div>

                                <div className="stat-item">
                                    <div className="stat-icon">⭐</div>
                                    <div className="stat-content">
                                        <span className="stat-label">Average Rating</span>
                                        <span className="stat-value">{stats.rating.toFixed(1)}</span>
                                    </div>
                                </div>

                                <div className="stat-item">
                                    <div className="stat-icon">💰</div>
                                    <div className="stat-content">
                                        <span className="stat-label">Total Earnings</span>
                                        <span className="stat-value">
                                            ${(stats.totalEarnings || 0).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="stats-loading">
                                <LoadingSpinner size="small" />
                            </div>
                        )}
                    </div>

                    {/* Security Card */}
                    <div className="profile-card">
                        <div className="card-header">
                            <h2>Security</h2>
                        </div>

                        {!showPasswordForm ? (
                            <button className="btn-secondary" onClick={() => setShowPasswordForm(true)}>
                                Change Password
                            </button>
                        ) : (
                            <form onSubmit={handleChangePassword}>
                                <div className="form-group">
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm New Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={() => {
                                            setShowPasswordForm(false);
                                            setCurrentPassword('');
                                            setNewPassword('');
                                            setConfirmPassword('');
                                            setError(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary" disabled={isLoading}>
                                        {isLoading ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Account Actions */}
                    <div className="profile-card danger-zone">
                        <div className="card-header">
                            <h2>Account Actions</h2>
                        </div>
                        <button className="btn-danger" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverProfile;
