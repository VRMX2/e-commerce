/**
 * Appends a new order to the Google Sheet using a free Google Apps Script Webhook.
 * @param {Object} order The order object from the database.
 */
async function appendOrderToSheet(order) {
  const SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!SCRIPT_URL) {
    console.log('ℹ️ Google Apps Script URL not configured. Skipping sheets sync.');
    return;
  }

  try {
    const date = new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' });

    // Build URL query parameters (100% foolproof for Google Apps Script)
    const params = new URLSearchParams({
      orderId: order.id.toString(),
      date: date,
      name: order.full_name,
      phone: order.phone,
      wilaya: order.wilaya,
      commune: order.commune,
      product: order.product_name,
      price: order.price.toString()
    });

    // Send a GET request with query params
    const response = await fetch(`${SCRIPT_URL}?${params.toString()}`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`✅ Order #${order.id} appended to Google Sheet successfully!`);
  } catch (error) {
    console.error('❌ Failed to append to Google Sheets:', error.message);
    throw error;
  }
}

module.exports = { appendOrderToSheet };
