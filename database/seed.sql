-- Seed Data for Ticketing System
-- This file contains sample data for testing

-- Clear existing data (if any)
TRUNCATE TABLE tickets, users RESTART IDENTITY CASCADE;

-- Insert test users
-- Note: These passwords are 'password123' hashed with bcrypt
-- You should generate real hashes using your backend before using in production

INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@ticket.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'admin'),
('support1', 'support1@ticket.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'support'),
('support2', 'support2@ticket.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'support'),
('john_doe', 'john@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'user'),
('jane_smith', 'jane@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'user');

-- Insert sample tickets
INSERT INTO tickets (title, description, status, user_id) VALUES
('Login Issue', 'Cannot login to my account. Getting error 401.', 'open', 4),
('Feature Request', 'Please add dark mode to the dashboard.', 'open', 4),
('Bug Report', 'Dashboard crashes when clicking on reports.', 'in-progress', 5),
('Password Reset', 'Need help resetting my password.', 'resolved', 5),
('API Documentation', 'API documentation is outdated.', 'closed', 4);

-- Display created data
SELECT 'Users created:' AS message;
SELECT id, username, email, role FROM users;

SELECT 'Tickets created:' AS message;
SELECT id, title, status, user_id FROM tickets;
