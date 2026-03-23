const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * GET /api/products
 * Returns all watch products from the database
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, description, price, image_url FROM products ORDER BY id ASC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء جلب المنتجات' });
  }
});

/**
 * GET /api/products/:id
 * Returns a single product by ID
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, name, description, price, image_url FROM products WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'المنتج غير موجود' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء جلب المنتج' });
  }
});

module.exports = router;
