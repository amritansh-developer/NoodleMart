USE noodlemart;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO products (name, price, image, description) VALUES
('Masala Noodles', 20.00, 'masala.jpg', 'Spicy Indian masala noodles'),
('Chicken Noodles', 60.00, 'chicken.jpg', 'Hot chicken noodles'),
('Veg Hakka Noodles', 40.00, 'veg.jpg', 'Classic veg hakka noodles');

SHOW TABLES;

SELECT * FROM products;