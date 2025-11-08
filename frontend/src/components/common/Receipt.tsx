import React, { useState } from 'react';
import { paymentService } from '../../services/paymentService';

interface ReceiptProps {
  receipt: {
    receiptId: string;
    rideId: string;
    date: string;
    rider: {
      name: string;
      phone: string;
    };
    driver: {
      name: string;
      vehicle: string;
      plateNumber: string;
    } | null;
    trip: {
      pickup: string;
      destination: string;
      distance: number;
      duration: number;
      startTime: string;
      endTime: string;
    };
    fare: {
      baseFare: number;
      distanceFare: number;
      timeFare: number;
      surgeFare: number;
      total: number;
    };
    payment: {
      method: string;
      transactionId: string;
      status: string;
    };
  };
  onClose: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ receipt, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);

    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const handleDownloadReceipt = async () => {
    setIsDownloading(true);

    try {
      const receiptText = paymentService.formatReceiptForDisplay(receipt);
      const blob = new Blob([receiptText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt_${receipt.receiptId}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading receipt:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="receipt-modal">
      <div className="receipt-overlay" onClick={onClose} />

      <div className="receipt-container">
        <div className="receipt-header">
          <h2>Receipt</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="receipt-content">
          <div className="receipt-info">
            <div><strong>Receipt ID:</strong> {receipt.receiptId}</div>
            <div><strong>Date:</strong> {formatDate(receipt.date)}</div>
          </div>

          <div className="section">
            <h3>Trip Details</h3>
            <div className="detail-item">
              <span>From:</span>
              <span>{receipt.trip.pickup}</span>
            </div>
            <div className="detail-item">
              <span>To:</span>
              <span>{receipt.trip.destination}</span>
            </div>
            <div className="detail-item">
              <span>Distance:</span>
              <span>{receipt.trip.distance.toFixed(2)} km</span>
            </div>
            <div className="detail-item">
              <span>Duration:</span>
              <span>{formatDuration(receipt.trip.duration)}</span>
            </div>
          </div>

          <div className="section">
            <h3>Fare Breakdown</h3>
            <div className="fare-item">
              <span>Base Fare</span>
              <span>{paymentService.formatCurrency(receipt.fare.baseFare)}</span>
            </div>
            <div className="fare-item">
              <span>Distance Fare</span>
              <span>{paymentService.formatCurrency(receipt.fare.distanceFare)}</span>
            </div>
            <div className="fare-item">
              <span>Time Fare</span>
              <span>{paymentService.formatCurrency(receipt.fare.timeFare)}</span>
            </div>
            {receipt.fare.surgeFare > 0 && (
              <div className="fare-item">
                <span>Surge Fare</span>
                <span>{paymentService.formatCurrency(receipt.fare.surgeFare)}</span>
              </div>
            )}
            <div className="fare-item total">
              <span>Total</span>
              <span>{paymentService.formatCurrency(receipt.fare.total)}</span>
            </div>
          </div>

          <div className="section">
            <h3>Payment Information</h3>
            <div className="detail-item">
              <span>Method:</span>
              <span>{receipt.payment.method.toUpperCase()}</span>
            </div>
            <div className="detail-item">
              <span>Transaction ID:</span>
              <span>{receipt.payment.transactionId}</span>
            </div>
            <div className="detail-item">
              <span>Status:</span>
              <span className={`status ${receipt.payment.status}`}>
                {receipt.payment.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="receipt-actions">
          <button onClick={() => window.print()} className="btn btn-secondary">
            Print
          </button>
          <button
            onClick={handleDownloadReceipt}
            className="btn btn-primary"
            disabled={isDownloading}
          >
            {isDownloading ? 'Downloading...' : 'Download'}
          </button>
          <button onClick={onClose} className="btn btn-outline">
            Close
          </button>
        </div>
      </div>

      <style>{`
        .receipt-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .receipt-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
        }

        .receipt-container {
          position: relative;
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .receipt-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          border-bottom: 1px solid #dee2e6;
        }

        .receipt-header h2 {
          margin: 0;
          color: #333;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #6c757d;
          padding: 5px;
          border-radius: 4px;
        }

        .close-button:hover {
          background: #f8f9fa;
        }

        .receipt-content {
          padding: 30px;
        }

        .receipt-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #dee2e6;
        }

        .section {
          margin-bottom: 30px;
        }

        .section h3 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .fare-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
        }

        .fare-item.total {
          border-top: 2px solid #dee2e6;
          margin-top: 10px;
          padding-top: 15px;
          font-weight: 600;
          font-size: 16px;
        }

        .status {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .status.completed {
          background: #d4edda;
          color: #155724;
        }

        .receipt-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          padding: 20px 30px;
          border-top: 1px solid #dee2e6;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-outline {
          background: transparent;
          color: #007bff;
          border: 1px solid #007bff;
        }

        @media (max-width: 768px) {
          .receipt-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Receipt;