// frontend/app/api/save-order/route.js
// This Route Handler acts as a proxy, forwarding the request to the Express backend.

import { NextResponse } from 'next/server';
// We remove direct DB/Mongoose imports, relying instead on the helper that calls the Express API.
import { createOrder } from '@/lib/orderApi'; 

export async function POST(request) {
  try {
    const orderData = await request.json();

    // CRITICAL: Call the Express.js Backend (e.g., POST http://localhost:5000/api/orders)
    const backendResponse = await createOrder(orderData); 
    
    // Check for errors returned from the Express backend via orderApi.js
    if (backendResponse.error) {
        // Express returned an error (e.g., JWT failed, validation failed)
        // Return status 400 for client-side errors based on the structure returned by orderApi.js
        return NextResponse.json(
            { error: backendResponse.error }, 
            { status: 400 } 
        );
    }

    // Success response from the Express backend, pass it back to the client
    return NextResponse.json({ 
        message: "Order created", 
        orderId: backendResponse.orderId 
    }, { status: 201 });

  } catch (error) {
    console.error('Error communicating with Express backend:', error);
    // Error caught if the Next.js server cannot reach the Express server
    return NextResponse.json(
      { error: "Could not communicate with the main backend server (Express)." }, 
      { status: 502 } 
    );
  }
}
