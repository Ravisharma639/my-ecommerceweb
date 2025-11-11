import axios from "axios";

// ✅ Backend API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// ✅ Helper: Get authentication token if the user is logged in
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    let token = localStorage.getItem("userToken");

    if (!token) {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        try {
          const user = JSON.parse(userInfo);
          token = user.token;
        } catch {
          token = null;
        }
      }
    }

    return token;
  }
  return null;
};

// ✅ Create a new order via Express backend
export const createOrder = async (orderData) => {
  const token = getAuthToken();

  try {
    const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    // ✅ Expected backend response: { message, orderId }
    return response.data;
  } catch (error) {
    console.error("❌ Error creating order:", error.response?.data || error.message);

    if (error.response) {
      const { status, data } = error.response;

      if (status === 401)
        return { error: "Not authorized. Please log in again." };
      if (status === 400)
        return { error: data?.error || "Invalid order data." };
      if (status === 500)
        return { error: "Server error on backend." };
    }

    // Fallback for network or unknown error
    return { error: "Could not reach the backend server." };
  }
};

// ✅ Fetch order details by ID (for /payment page)
export const getOrderById = async (orderId) => {
  const token = getAuthToken();

  try {
    const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    // ✅ Expected backend response: full order object
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching order:", error.response?.data || error.message);

    if (error.response) {
      const { status, data } = error.response;

      if (status === 404)
        return { error: data?.error || "Order not found." };
      if (status === 401)
        return { error: "Unauthorized access. Please log in again." };
      if (status === 500)
        return { error: "Internal server error on backend." };
    }

    return { error: "Could not fetch order details." };
  }
};
