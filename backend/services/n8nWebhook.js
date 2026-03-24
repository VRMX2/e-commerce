/**
 * Sends order data to the n8n Webhook for automation routing.
 * @param {Object} order The order object from the database.
 * @param {number} quantity The quantity ordered.
 */
async function sendOrderTon8n(order, quantity) {
  const N8N_URL = process.env.N8N_WEBHOOK_URL;

  if (!N8N_URL) {
    console.log('ℹ️ n8n Webhook URL not configured. Skipping automation sync.');
    return;
  }

  try {
    const date = new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' });

    // Format the JSON payload specifically for n8n
    const payload = {
      name: order.full_name,
      phone: order.phone,
      wilaya: order.wilaya,
      address: order.commune, // mapped commune as address
      product: order.product_name,
      quantity: quantity,
      totalPrice: order.price,
      orderDate: date,
      status: "Pending" // Default status
    };

    const response = await fetch(N8N_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error from n8n: ${response.status}`);
    }

    console.log(`✅ Order #${order.id} sent to n8n successfully!`);
  } catch (error) {
    console.error('❌ Failed to trigger n8n webhook:', error.message);
    throw error;
  }
}

module.exports = { sendOrderTon8n };
