import React, { useState } from 'react';
import { paymentService, PaymentRequest } from '../../services/paymentService';
import { Ride } from '../../types';
import LoadingSpinner from './LoadingSpinner';

interface PaymentFormProps {
  ride: Ride;
  onPaymentSuccess: (result: { ride: Ride; receipt: any; transactionId: string }) => void;
  onPaymentError: (error: string) => void;
  onCancel: () => void;
}

type PaymentMethod = 'mock' | 'cash';

const PaymentForm: React.FC<PaymentFormProps> = ({
  ride,
  onPaymentSuccess,
  onPaymentError,
  onCancel
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('mock');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242424242424242',
    cvv: '123',
    expiryMonth: 12,
    expiryYear: 2025
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setValidationErrors([]);

    // Validate payment details
    const validation = paymentService.validatePaymentDetails(selectedMethod, cardDetails);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setIsProcessing(true);

    try {
      const paymentData: PaymentRequest = {
        rideId: ride._id,
        paymentMethod: selectedMethod,
        paymentDetails: selectedMethod === 'mock' ? cardDetails : undefined
      };

      const result = await paymentService.processPayment(paymentData);
      onPaymentSuccess(result);
    } catch (error: any) {
      onPaymentError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardDetails(prev => ({ ...prev, cardNumber: value }));
    e.target.value = formatted;
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardDetails(prev => ({ ...prev, cvv: value }));
  };

  const getMockPaymentScenarios = () => {
    return paymentService.getMockPaymentScenarios();
  };

  const renderPaymentMethodContent = () => {
    switch (selectedMethod) {
      case 'mock':
        return (
          <div className="payment-method-content">
            <div className="mock-scenarios">
              <h4>Test Payment Scenarios</h4>
              <div className="scenarios-list">
                {getMockPaymentScenarios().map((scenario, index) => (
                  <div key={index} className="scenario-item">
                    <button
                      type="button"
                      className="scenario-button"
                      onClick={() => setCardDetails(prev => ({ ...prev, cardNumber: scenario.cardNumber.replace(/\s/g, '') }))}
                    >
                      <strong>{scenario.cardNumber}</strong>
                      <span>{scenario.description}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-form">
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  onChange={handleCardNumberChange}
                  defaultValue={cardDetails.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryMonth">Expiry Month</label>
                  <select
                    id="expiryMonth"
                    value={cardDetails.expiryMonth}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, expiryMonth: parseInt(e.target.value) }))}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option key={month} value={month}>
                        {month.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="expiryYear">Expiry Year</label>
                  <select
                    id="expiryYear"
                    value={cardDetails.expiryYear}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, expiryYear: parseInt(e.target.value) }))}
                  >
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    maxLength={4}
                    value={cardDetails.cvv}
                    onChange={handleCvvChange}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'cash':
        return (
          <div className="payment-method-content">
            <div className="cash-info">
              <p>Cash payment will be recorded for this ride.</p>
              <p>Please ensure you have paid the driver directly.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="payment-form">
      <div className="payment-header">
        <h2>Complete Payment</h2>
        <p>Please select your payment method and complete the transaction</p>
      </div>

      <div className="ride-summary">
        <h3>Trip Summary</h3>
        <div className="summary-details">
          <div className="summary-item">
            <span>From:</span>
            <span>{ride.pickup.address}</span>
          </div>
          <div className="summary-item">
            <span>To:</span>
            <span>{ride.destination.address}</span>
          </div>
          <div className="summary-item total">
            <span>Total Amount:</span>
            <span className="amount">{paymentService.formatCurrency(ride.fare.final || ride.fare.estimated)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handlePaymentSubmit} className="payment-form-content">
        <div className="payment-methods">
          <h3>Payment Method</h3>
          <div className="method-options">
            <label className={`method-option ${selectedMethod === 'mock' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="mock"
                checked={selectedMethod === 'mock'}
                onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
              />
              <div className="method-info">
                <span className="method-name">Test Card</span>
                <span className="method-desc">For development testing</span>
              </div>
            </label>

            <label className={`method-option ${selectedMethod === 'cash' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={selectedMethod === 'cash'}
                onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
              />
              <div className="method-info">
                <span className="method-name">Cash</span>
                <span className="method-desc">Pay driver directly</span>
              </div>
            </label>
          </div>
        </div>

        {renderPaymentMethodContent()}

        {validationErrors.length > 0 && (
          <div className="validation-errors">
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn btn-secondary" disabled={isProcessing}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <LoadingSpinner size="small" />
                Processing...
              </>
            ) : (
              `Pay ${paymentService.formatCurrency(ride.fare.final || ride.fare.estimated)}`
            )}
          </button>
        </div>
      </form>

      <style>{`
        .payment-form {
          padding: 30px;
          max-width: 600px;
          margin: 0 auto;
        }

        .payment-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .payment-header h2 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .payment-header p {
          margin: 0;
          color: #6c757d;
        }

        .ride-summary {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }

        .ride-summary h3 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .summary-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-item.total {
          border-top: 1px solid #dee2e6;
          padding-top: 10px;
          margin-top: 10px;
          font-weight: 600;
        }

        .amount {
          font-size: 18px;
          color: #28a745;
        }

        .payment-methods {
          margin-bottom: 25px;
        }

        .payment-methods h3 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .method-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .method-option {
          display: flex;
          align-items: center;
          padding: 15px;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .method-option:hover {
          border-color: #007bff;
        }

        .method-option.selected {
          border-color: #007bff;
          background: #f8f9ff;
        }

        .method-option input[type="radio"] {
          margin-right: 15px;
        }

        .method-info {
          display: flex;
          flex-direction: column;
        }

        .method-name {
          font-weight: 600;
          color: #333;
        }

        .method-desc {
          font-size: 14px;
          color: #6c757d;
        }

        .payment-method-content {
          margin-bottom: 25px;
        }

        .mock-scenarios {
          margin-bottom: 20px;
        }

        .mock-scenarios h4 {
          margin: 0 0 15px 0;
          color: #333;
          font-size: 16px;
        }

        .scenarios-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .scenario-button {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 12px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
        }

        .scenario-button:hover {
          border-color: #007bff;
          background: #f8f9ff;
        }

        .scenario-button strong {
          color: #333;
          margin-bottom: 4px;
        }

        .scenario-button span {
          font-size: 14px;
          color: #6c757d;
        }

        .card-form {
          border-top: 1px solid #dee2e6;
          padding-top: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #333;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        .cash-info {
          padding: 20px;
          background: #e7f3ff;
          border-radius: 8px;
          border-left: 4px solid #007bff;
        }

        .cash-info p {
          margin: 0 0 10px 0;
          color: #333;
        }

        .cash-info p:last-child {
          margin-bottom: 0;
        }

        .validation-errors {
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .validation-errors ul {
          margin: 0;
          padding-left: 20px;
          color: #721c24;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #0056b3;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #5a6268;
        }

        @media (max-width: 768px) {
          .payment-form {
            padding: 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentForm;