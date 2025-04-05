import React from 'react';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormWrapper from '@/components/FormWrapper';

const CustomerPage = () => {
  const { customerId } = useParams(); 
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
  });

  const fields = [
    { name: 'name', type: 'text', placeholder: 'Enter customer name' },
    { name: 'email', type: 'email', placeholder: 'Enter customer email' },
    { name: 'phone', type: 'text', placeholder: 'Enter customer phone' },
  ];

  const fetchDataUrl = customerId ? `/api/customer/${customerId}` : null;
  const submitUrl = customerId ? `/api/customer/${customerId}` : '/api/customer';

  const handleSubmit = (values) => {
    const request = customerId
      ? axios.put(submitUrl, values) // Update request
      : axios.post(submitUrl, values); // Add request

    request.then(() => {
      navigate("/customer"); 
    }).catch(error => {
      console.error("Error submitting form:", error);
    });
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      fetchDataUrl={fetchDataUrl}
      submitUrl={submitUrl}
      title={customerId ? 'Update Customer' : 'Add Customer'}
      fields={fields}
    />
  );
};

export default CustomerPage;
