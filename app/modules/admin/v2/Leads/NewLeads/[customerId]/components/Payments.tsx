import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/axiosinstance";

const PaymentsTab = ({ customerId }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get(`/v3/api/customers/${customerId}/payments`);
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) fetchPayments();
  }, [customerId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Payments Information</h2>
      {/* Render payment details */}
      {payments.map(payment => (
        <div key={payment.id}>Payment ID: {payment.id} - {payment.amount}</div>
      ))}
    </div>
  );
};

export default PaymentsTab;
