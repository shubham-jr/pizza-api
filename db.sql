-- Create users table
CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   email VARCHAR(100) UNIQUE NOT NULL,
   password_hash VARCHAR(255) NOT NULL
);

-- Create pizzas table
CREATE TABLE pizzas (
   id SERIAL PRIMARY KEY,
   type VARCHAR(100) NOT NULL,
   description TEXT,
   price DECIMAL(10, 2) NOT NULL
);

-- Create orders table
CREATE TABLE orders (
   id SERIAL PRIMARY KEY,
   user_id INT REFERENCES users(id) NOT NULL,
   pizza_id INT REFERENCES pizzas(id) NOT NULL,
   quantity INT NOT NULL,
   address VARCHAR(255) NOT NULL,
   status VARCHAR(20) DEFAULT 'Pending',
   total_price DECIMAL(10, 2) NOT NULL
);
