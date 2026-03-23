-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    wilaya VARCHAR(100) NOT NULL,
    commune VARCHAR(100) NOT NULL,
    product_id INTEGER REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Products (Watches)
INSERT INTO products (name, description, price, image_url) VALUES 
('ساعة نسائية روز جولد', 'ساعة أنيقة بلون روز جولد مع مينا أبيض', 4500.00, 'https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?w=500&q=80'),
('ساعة كلاسيكية سوداء', 'ساعة كلاسيكية بحزام جلدي أسود ومينا ذهبي', 3800.00, 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80'),
('ساعة فضية مرصعة بالزركون', 'ساعة معدنية بلون فضي مرصعة بأحجار الزركون اللامعة', 5200.00, 'https://images.unsplash.com/photo-1594534432855-8869c968f9b9?w=500&q=80'),
('ساعة ذهبية فخمة', 'ساعة معدنية ذهبية بالكامل بتصميم عصري', 6000.00, 'https://images.unsplash.com/photo-1587836374828-ea3dd565ee3f?w=500&q=80');
