const { google } = require('googleapis');
const path = require('path');

/**
 * Appends a new order row to the configured Google Spreadsheet.
 * Requires a service account credentials JSON file and the Spreadsheet ID in .env
 */
async function appendOrderToSheet(orderData) {
  const { full_name, phone, wilaya, commune, product_name, price, created_at } = orderData;

  // Authenticate using the Google Service Account credentials file
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(process.env.GOOGLE_CREDENTIALS_PATH || './google-credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    console.warn('⚠️  GOOGLE_SHEET_ID is not set. Skipping Sheets integration.');
    return;
  }

  // Format date for display
  const dateStr = new Date(created_at).toLocaleString('ar-DZ');
  const priceStr = `${price} دج`;

  // Append a row: [Full Name, Phone, Wilaya, Commune, Product, Price, Date]
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A:G',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[full_name, phone, wilaya, commune, product_name, priceStr, dateStr]],
    },
  });

  console.log(`📊 Order appended to Google Sheets for: ${full_name}`);
}

module.exports = { appendOrderToSheet };
