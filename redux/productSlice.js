import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetchProducts',
  async () => {
    const response = await axios.get('/api/Product/GetProduct');
    return response.data;
  }
);

export const placeOrder = createAsyncThunk('product/placeOrder',
  async (orderData) => {
    const response = await axios.post('/api/Product/PlaceOrder', orderData);
    return response.data;
  }
);

export const fetchOrders = createAsyncThunk('product/fetchOrders',
  async () => {
    const response = await axios.get('/api/Product/GetGroupedOrders');
    return response.data;
  }
);


const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    orders: [], // Added for staff dashboard
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    orderStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle API structure: { responseObject: [...], success: true }
        const products = action.payload.responseObject || action.payload;

        if (Array.isArray(products)) {
          state.items = products;
        } else {
          console.error("API Error: Payload is not an array", action.payload);
          state.items = [];
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.orderStatus = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        const orders = action.payload.responseObject || action.payload;
        state.orders = Array.isArray(orders) ? orders : [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orderStatus = 'failed';
      });
  },
});

export default productSlice.reducer;

export const selectGroupedProducts = (state) => {
  const items = state.product.items;
  if (!Array.isArray(items)) return {}; // Safety check
  return items.reduce((acc, item) => {
    const category = item.category || item.type || 'Others'; // Map 'type' from API to category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
};