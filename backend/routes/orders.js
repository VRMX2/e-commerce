const express = require('express');
const router = express.Router();
const pool = require('../db');
const { appendOrderToSheet } = require('../services/googleSheets');

// Algerian wilayas list for validation
const ALGERIAN_WILAYAS = [
  'أدرار', 'الشلف', 'الأغواط', 'أم البواقي', 'باتنة', 'بجاية', 'بسكرة', 'بشار',
  'البليدة', 'البويرة', 'تمنراست', 'تبسة', 'تلمسان', 'تيارت', 'تيزي وزو', 'الجزائر',
  'الجلفة', 'جيجل', 'سطيف', 'سعيدة', 'سكيكدة', 'سيدي بلعباس', 'عنابة', 'قالمة',
  'قسنطينة', 'المدية', 'مستغانم', 'المسيلة', 'معسكر', 'ورقلة', 'وهران', 'البيض',
  'إليزي', 'برج بوعريريج', 'بومرداس', 'الطارف', 'تندوف', 'تيسمسيلت', 'الوادي',
  'خنشلة', 'سوق أهراس', 'تيبازة', 'ميلة', 'عين الدفلى', 'النعامة', 'عين تموشنت',
  'غرداية', 'غليزان', 'تيميمون', 'برج باجي مختار', 'أولاد جلال', 'بني عباس',
  'عين صالح', 'عين قزام', 'تقرت', 'جانت', 'المغير', 'المنيعة'
];

/**
 * POST /api/order
 * Creates a new Cash on Delivery order
 */
router.post('/', async (req, res) => {
  const { full_name, phone, wilaya, commune, product_id, product_name, price } = req.body;

  // --- Validation ---
  const errors = [];

  if (!full_name || full_name.trim().length < 3) {
    errors.push('الاسم الكامل مطلوب ويجب أن يكون 3 أحرف على الأقل');
  }

  // Algerian phone numbers: starts with 05, 06, or 07, 10 digits total
  if (!phone || !/^(05|06|07)\d{8}$/.test(phone.trim())) {
    errors.push('رقم الهاتف غير صحيح. يجب أن يبدأ بـ 05 أو 06 أو 07 ويتكون من 10 أرقام');
  }

  if (!wilaya || !ALGERIAN_WILAYAS.includes(wilaya)) {
    errors.push('الولاية مطلوبة');
  }

  if (!commune || commune.trim().length < 2) {
    errors.push('البلدية مطلوبة');
  }

  if (!product_name) {
    errors.push('المنتج مطلوب');
  }

  if (!price || isNaN(parseFloat(price))) {
    errors.push('السعر غير صحيح');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    // Save order to PostgreSQL
    const result = await pool.query(
      `INSERT INTO orders (full_name, phone, wilaya, commune, product_id, product_name, price)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        full_name.trim(),
        phone.trim(),
        wilaya,
        commune.trim(),
        product_id || null,
        product_name,
        parseFloat(price),
      ]
    );

    const newOrder = result.rows[0];

    // Append to Google Sheets (non-blocking - don't fail if Sheets is unavailable)
    try {
      await appendOrderToSheet(newOrder);
    } catch (sheetsError) {
      console.warn('⚠️  Google Sheets append failed (order still saved):', sheetsError.message);
    }

    console.log(`✅ New order created: #${newOrder.id} for ${newOrder.full_name}`);

    res.status(201).json({
      success: true,
      message: 'تم تأكيد طلبك بنجاح! سيتم التواصل معك قريباً.',
      data: {
        order_id: newOrder.id,
        full_name: newOrder.full_name,
        product_name: newOrder.product_name,
        wilaya: newOrder.wilaya,
        // WhatsApp link for confirmation
        whatsapp_link: `https://wa.me/213${phone.trim().substring(1)}?text=${encodeURIComponent(`مرحباً، أريد تأكيد طلبي رقم #${newOrder.id}: ${product_name} - ${price} دج`)}`,
      },
    });
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء تأكيد الطلب، يرجى المحاولة مرة أخرى' });
  }
});

module.exports = router;
