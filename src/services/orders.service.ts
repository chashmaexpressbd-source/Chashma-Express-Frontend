import axios from 'axios';

import { getToken } from '@/utils/auth';

import {
  CheckoutPayload,
  GetAllOrdersParams,
  ISingleOrder,
  OrderStatus,
  UpdateOrderPayload,
} from '@/types/orders';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
});

// ==========================================
// CREATE ORDER
// No Token Required
// ==========================================

export const createOrder = async (payload: CheckoutPayload) => {
  const res = await axios.post(`${BASE_URL}/orders/checkout`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};

// ==========================================
// BUY NOW
// No Token Required
// ==========================================

export const singleOrder = async (payload: ISingleOrder) => {
  const res = await axios.post(`${BASE_URL}/orders/buy-now`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};

// ==========================================
// GET ALL ORDERS
// Token Required
// ==========================================

export const getAllOrders = async (params?: GetAllOrdersParams) => {
  const res = await axios.get(`${BASE_URL}/orders/all`, {
    params,
    headers: getAuthHeaders(),
  });

  console.log(res);

  return res.data;
};

// ==========================================
// GET USER ORDERS
// Token Required
// ==========================================

export const getOrdersByUser = async () => {
  const res = await axios.get(`${BASE_URL}/orders`, {
    headers: getAuthHeaders(),
  });

  return res.data;
};

// ==========================================
// GET SINGLE ORDER
// Token Required
// ==========================================

export const getOrderById = async (orderId: string) => {
  const response = await axios.get(`${BASE_URL}/orders/${orderId}`, {
    headers: getAuthHeaders(),
  });

  console.log(response);

  return response.data;
};

// ==========================================
// UPDATE ORDER STATUS
// Token Required
// ==========================================

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
) => {
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  const res = await axios.patch(
    `${BASE_URL}/orders/${orderId}/status`,
    {
      status,
    },
    {
      headers: getAuthHeaders(),
    },
  );

  return res.data;
};

// ==========================================
// UPDATE ORDER
// Token Required
// ==========================================

export const updateOrder = async (
  orderId: string,
  payload: UpdateOrderPayload,
) => {
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  const res = await axios.patch(`${BASE_URL}/orders/${orderId}`, payload, {
    headers: getAuthHeaders(),
  });

  return res.data;
};

// ==========================================
// DELETE ORDER
// Token Required
// ==========================================

export const deleteOrder = async (orderId: string) => {
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  const res = await axios.delete(`${BASE_URL}/orders/${orderId}`, {
    headers: getAuthHeaders(),
  });

  return res.data;
};
