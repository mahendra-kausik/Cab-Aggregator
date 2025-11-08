import React, { useState, useEffect } from 'react';
import { paymentService } from '../../services/paymentService';
import { Ride } from '../../types';
import LoadingSpinner from './LoadingSpinner';

interface PaymentHistoryProps {
  className?: string;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ className = '' }) => {
  const [payments, setPayments] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadPaymentHistory();
  }, []);

  const loadPaymentHistory = async () => {
    try {
      setIsLoading(true);
      const response = await paymentService.getPaymentHistory(1, 10);
      setPayments(response.payments);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading payment history..." />;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={loadPaymentHistory}>Retry</button>
      </div>
    );
  }

  return (
    <div className={`payment-history ${className}`}>
      <h2>Payment History</h2>
      {payments.length === 0 ? (
        <p>No payment history found.</p>
      ) : (
        <div className="payments-list">
          {payments.map((ride) => (
            <div key={ride._id} className="payment-item">
              <div className="ride-info">
                <p>{ride.pickup.address} → {ride.destination.address}</p>
                <p>Status: {ride.payment?.status || 'pending'}</p>
              </div>
              <div className="amount">
                {paymentService.formatCurrency(ride.fare.final || ride.fare.estimated)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;