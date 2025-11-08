/**
 * Unit Tests - Validation Utilities
 * Tests validation functions for phone, email, password, etc.
 */

import { describe, it, expect } from 'vitest';
import {
    isValidEmail,
    isValidPhoneNumber,
    isValidPassword,
    isValidOTP,
    isValidCoordinates,
    isRequired,
    hasMinLength,
    hasMaxLength,
    validateField,
    validationRules,
} from '@/utils/validation';

describe('Validation Utils - Unit Tests', () => {
    describe('isValidEmail', () => {
        it('should validate correct email addresses', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
            expect(isValidEmail('user+tag@example.com')).toBe(true);
        });

        it('should reject invalid email addresses', () => {
            expect(isValidEmail('invalid')).toBe(false);
            expect(isValidEmail('invalid@')).toBe(false);
            expect(isValidEmail('@example.com')).toBe(false);
            expect(isValidEmail('user@')).toBe(false);
            expect(isValidEmail('')).toBe(false);
        });
    });

    describe('isValidPhoneNumber', () => {
        it('should validate correct phone numbers', () => {
            expect(isValidPhoneNumber('+1234567890')).toBe(true);
            expect(isValidPhoneNumber('1234567890')).toBe(true);
            expect(isValidPhoneNumber('+1 (234) 567-8900')).toBe(true);
        });

        it('should reject invalid phone numbers', () => {
            expect(isValidPhoneNumber('123')).toBe(false);
            expect(isValidPhoneNumber('abc')).toBe(false);
            expect(isValidPhoneNumber('')).toBe(false);
        });
    });

    describe('isValidPassword', () => {
        it('should validate strong passwords', () => {
            expect(isValidPassword('Password1')).toBe(true);
            expect(isValidPassword('SecurePass123')).toBe(true);
            expect(isValidPassword('MyP@ssw0rd')).toBe(true);
        });

        it('should reject weak passwords', () => {
            expect(isValidPassword('password')).toBe(false); // No uppercase or number
            expect(isValidPassword('PASSWORD1')).toBe(false); // No lowercase
            expect(isValidPassword('Password')).toBe(false); // No number
            expect(isValidPassword('Pass1')).toBe(false); // Too short
            expect(isValidPassword('')).toBe(false);
        });
    });

    describe('isValidOTP', () => {
        it('should validate 6-digit OTP', () => {
            expect(isValidOTP('123456')).toBe(true);
            expect(isValidOTP('000000')).toBe(true);
            expect(isValidOTP('999999')).toBe(true);
        });

        it('should reject invalid OTP', () => {
            expect(isValidOTP('12345')).toBe(false); // Too short
            expect(isValidOTP('1234567')).toBe(false); // Too long
            expect(isValidOTP('abcdef')).toBe(false); // Not numbers
            expect(isValidOTP('')).toBe(false);
        });
    });

    describe('isValidCoordinates', () => {
        it('should validate correct coordinates', () => {
            expect(isValidCoordinates(37.7749, -122.4194)).toBe(true);
            expect(isValidCoordinates(0, 0)).toBe(true);
            expect(isValidCoordinates(-90, -180)).toBe(true);
            expect(isValidCoordinates(90, 180)).toBe(true);
        });

        it('should reject invalid coordinates', () => {
            expect(isValidCoordinates(91, 0)).toBe(false); // Lat out of range
            expect(isValidCoordinates(-91, 0)).toBe(false); // Lat out of range
            expect(isValidCoordinates(0, 181)).toBe(false); // Lng out of range
            expect(isValidCoordinates(0, -181)).toBe(false); // Lng out of range
        });
    });

    describe('isRequired', () => {
        it('should validate non-empty values', () => {
            expect(isRequired('value')).toBe(true);
            expect(isRequired('  value  ')).toBe(true);
        });

        it('should reject empty values', () => {
            expect(isRequired('')).toBe(false);
            expect(isRequired('   ')).toBe(false);
            expect(isRequired(null)).toBe(false);
            expect(isRequired(undefined)).toBe(false);
        });
    });

    describe('hasMinLength', () => {
        it('should validate strings meeting minimum length', () => {
            expect(hasMinLength('hello', 3)).toBe(true);
            expect(hasMinLength('hello', 5)).toBe(true);
        });

        it('should reject strings below minimum length', () => {
            expect(hasMinLength('hi', 3)).toBe(false);
            expect(hasMinLength('', 1)).toBe(false);
        });
    });

    describe('hasMaxLength', () => {
        it('should validate strings within maximum length', () => {
            expect(hasMaxLength('hello', 10)).toBe(true);
            expect(hasMaxLength('hello', 5)).toBe(true);
        });

        it('should reject strings exceeding maximum length', () => {
            expect(hasMaxLength('hello world', 5)).toBe(false);
        });
    });

    describe('validateField', () => {
        it('should return null for valid field', () => {
            const rules = [
                { validator: (v: string) => v.length > 0, message: 'Required' },
                { validator: (v: string) => v.length >= 3, message: 'Min 3 chars' },
            ];

            expect(validateField('test', rules)).toBe(null);
        });

        it('should return error message for invalid field', () => {
            const rules = [
                { validator: (v: string) => v.length > 0, message: 'Required' },
                { validator: (v: string) => v.length >= 3, message: 'Min 3 chars' },
            ];

            expect(validateField('ab', rules)).toBe('Min 3 chars');
        });

        it('should return first error message when multiple rules fail', () => {
            const rules = [
                { validator: (v: string) => v.length > 0, message: 'Required' },
                { validator: (v: string) => v.length >= 3, message: 'Min 3 chars' },
            ];

            expect(validateField('', rules)).toBe('Required');
        });
    });

    describe('validationRules', () => {
        it('should create required validation rule', () => {
            const rule = validationRules.required();

            expect(rule.validator('test')).toBe(true);
            expect(rule.validator('')).toBe(false);
            expect(rule.message).toBe('This field is required');
        });

        it('should create email validation rule', () => {
            const rule = validationRules.email();

            expect(rule.validator('test@example.com')).toBe(true);
            expect(rule.validator('invalid')).toBe(false);
        });

        it('should create minLength validation rule', () => {
            const rule = validationRules.minLength(5);

            expect(rule.validator('hello')).toBe(true);
            expect(rule.validator('hi')).toBe(false);
            expect(rule.message).toBe('Must be at least 5 characters');
        });

        it('should create custom message for validation rules', () => {
            const rule = validationRules.required('Custom message');

            expect(rule.message).toBe('Custom message');
        });
    });
});
