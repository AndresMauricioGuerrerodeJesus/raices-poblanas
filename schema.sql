CREATE DATABASE db_raices_poblanas;

-- 1. LIMPIEZA DE ENTORNO (Para ejecutar el script varias veces sin errores)
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS order_details;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- 2. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. SEGURIDAD Y ROLES
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE, -- ADMIN, ARTISAN, CUSTOMER
    description TEXT
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    role_id INT REFERENCES roles(role_id) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Para BCrypt
    wallet_balance NUMERIC(12,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- REGLA DE ORO: Balance nunca menor a cero
    CONSTRAINT check_positive_wallet CHECK (wallet_balance >= 0)
);

-- 4. INFORMACIÓN DE ARTESANOS (Perfil Público)
CREATE TABLE artisans (
    artisan_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    bio TEXT,
    municipality VARCHAR(100) NOT NULL, -- Teziutlán, Tlatlauquitepec, etc.
    profile_picture BYTEA, -- Imagen del artesano (Encriptada/Binaria)
    is_verified BOOLEAN DEFAULT FALSE
);

-- 5. CATÁLOGO
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    -- UUID para el Código QR (Navegación OOHDM)
    unique_piece_id UUID DEFAULT uuid_generate_v4() UNIQUE, 
    artisan_id INT REFERENCES artisans(artisan_id) NOT NULL,
    category_id INT REFERENCES categories(category_id) NOT NULL,
    name VARCHAR(150) NOT NULL,
    collection_name VARCHAR(100), -- Agrupador para piezas similares
    description TEXT,
    materials TEXT, -- Definido libremente por el artesano
    price NUMERIC(10,2) NOT NULL,
    -- Cálculos automáticos de comisión (15% fijo)
    app_commission NUMERIC(10,2) GENERATED ALWAYS AS (price * 0.15) STORED,
    artisan_gain NUMERIC(10,2) GENERATED ALWAYS AS (price * 0.85) STORED,
    status VARCHAR(20) DEFAULT 'Available', -- Available, Sold, Reserved
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- REGLA DE ORO: Precio nunca menor a cero
    CONSTRAINT check_positive_price CHECK (price >= 0)
);

-- Tabla separada para imágenes (Soporta 3 imágenes por pieza)
CREATE TABLE product_images (
    image_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    image_data BYTEA NOT NULL, -- Almacenamiento binario
    is_primary BOOLEAN DEFAULT FALSE -- Indica si es la foto de portada
);

-- 6. VENTAS Y BILLETERA
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(user_id) NOT NULL,
    total_amount NUMERIC(12,2) NOT NULL,
    order_status VARCHAR(30) DEFAULT 'Paid', -- Paid, Shipped, Delivered
    tracking_number VARCHAR(50),
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_details (
    detail_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id),
    price_at_purchase NUMERIC(10,2) NOT NULL
);

-- 7. NOTIFICACIONES (Sistema de "Campana")
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. DATOS SEMILLA (Seed Data - Primeros 10 registros lógicos)

-- Roles
INSERT INTO roles (name, description) VALUES 
('ADMIN', 'Administrador global'), 
('ARTISAN', 'Productor y vendedor artesanal'), 
('CUSTOMER', 'Comprador final');

-- Usuarios (Simulando Billetera de $5,000 para el cliente de prueba)
INSERT INTO users (username, email, password_hash, role_id, wallet_balance) VALUES
('maury_admin', 'admin@raices.com', '$2a$10$hash', 1, 0.00),
('maria_cuetzalan', 'maria@artesana.com', '$2a$10$hash', 2, 0.00),
('pedro_alfarero', 'pedro@artesano.com', '$2a$10$hash', 2, 0.00),
('jose_textiles', 'jose@artesano.com', '$2a$10$hash', 2, 0.00),
('comprador_test', 'comprador@gmail.com', '$2a$10$hash', 3, 5000.00);

-- Artesanos (Municipios de la Sierra Norte)
INSERT INTO artisans (user_id, bio, municipality, is_verified) VALUES
(2, 'Especialista en bordado de hilo contado.', 'Cuetzalan', TRUE),
(3, 'Maestro del barro rojo y bruñido.', 'Zacapoaxtla', TRUE),
(4, 'Tejedor de lana virgen en telar.', 'Tlatlauquitepec', TRUE);

-- Categorías Fijas
INSERT INTO categories (name) VALUES 
('Textiles'), ('Cerámica'), ('Madera'), ('Joyería'), ('Cestería');

-- Productos (Piezas Únicas)
INSERT INTO products (artisan_id, category_id, name, collection_name, description, materials, price) VALUES
(1, 1, 'Huipil Tradicional Blanco', 'Sierra Viva', 'Bordado a mano con motivos florales.', 'Algodón orgánico', 1500.00),
(1, 1, 'Blusa Bordada Azul', 'Sierra Viva', 'Detalles en las mangas y cuello.', 'Hilo de seda', 800.00),
(2, 2, 'Jarra de Barro 2L', 'Única', 'Acabado liso sin plomo.', 'Barro rojo local', 450.00),
(3, 1, 'Gabán de Lana Gris', 'Montaña Alta', 'Tejido pesado para clima frío.', 'Lana de borrego', 1200.00);

-- Órden y Detalle (El cliente compra el Huipil)
INSERT INTO orders (customer_id, total_amount, shipping_address) VALUES
(5, 1500.00, 'Calle Juárez 45, Teziutlán Centro');

INSERT INTO order_details (order_id, product_id, price_at_purchase) VALUES
(1, 1, 1500.00);

-- Actualizar Billetera (Simulación manual de la compra)
UPDATE users SET wallet_balance = wallet_balance - 1500 WHERE user_id = 5;
UPDATE products SET status = 'Sold' WHERE product_id = 1;

-- Notificación
INSERT INTO notifications (user_id, message) VALUES
(2, '¡Venta realizada! Tu producto Huipil Tradicional ha sido comprado.');