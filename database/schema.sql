-- Ticketing System Database Schema
-- PostgreSQL

-- Drop existing tables if they exist
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop existing types if they exist
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS ticket_status CASCADE;

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'support', 'admin');
CREATE TYPE ticket_status AS ENUM ('open', 'in-progress', 'resolved', 'closed');

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Will store hashed password
    role user_role DEFAULT 'user' NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tickets Table
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ticket_status DEFAULT 'open' NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_tickets_user_id ON tickets(user_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Optional: Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for tickets table
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing (optional)
-- Note: Password is 'password123' hashed with bcrypt
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@example.com', '$2b$10$rKqKZ5Z5Z5Z5Z5Z5Z5Z5ZuXxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'admin'),
('support1', 'support@example.com', '$2b$10$rKqKZ5Z5Z5Z5Z5Z5Z5Z5ZuXxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'support'),
('user1', 'user1@example.com', '$2b$10$rKqKZ5Z5Z5Z5Z5Z5Z5Z5ZuXxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'user');

-- Note: The passwords above are placeholders. You'll need to generate proper bcrypt hashes
-- when you actually seed the database through your application
