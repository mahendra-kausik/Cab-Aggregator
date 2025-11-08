import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import { Ride } from '../../types';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Receipt from '../../components/common/Receipt';

const PaymentHistory: React.FC = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  useEffect(() => {
    loadPaymentHistory();
  }, []);

  const loadPaymentHistory = async () => {
    try {
      setIsLoading(true);
      const data = await paymentService.getPaymentHistory(1, 10);
      setPayments(data.payments);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewReceipt = async (rideId: string) => {
    try {
      const receipt = await paymentService.getReceipt(rideId);
      setSelectedReceipt(receipt);
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading payment history..." />;
  }

  return (
    <div className="payment-history">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>Payment History</h1>
      </div>

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={loadPaymentHistory}>Retry</button>
        </div>
      )}

      {payments.length === 0 ? (
        <div className="empty">
          <p>No payment history found.</p>
        </div>
      ) : (
        <div className="payments">
          {payments.map((ride) => (
            <div key={ride._id} className="payment-item">
              <div className="ride-info">
                <p>{ride.pickup.address} → {ride.destination.address}</p>
                <p>Status: {ride.payment?.status || 'pending'}</p>
                <p>Amount: {paymentService.formatCurrency(ride.fare.final || ride.fare.estimated)}</p>
              </div>
              {ride.payment?.status === 'completed' && (
                <button onClick={() => handleViewReceipt(ride._id)}>
                  View Receipt
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedReceipt && (
        <Receipt
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}

      <style>{`
        .payment-history {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }
        .back-btn {
          background: none;
          border: none;
          color: #007bff;
          cursor: pointer;
          font-size: 16px;
        }
        .payments {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .payment-item {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .error {
          background: #f8d7da;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 20px;
        }
        .empty {
          text-align: center;
          padding: 60px;
          color: #6c757d;
        }
      `}</style>
    </div>
  );
};

export default PaymentHistory;