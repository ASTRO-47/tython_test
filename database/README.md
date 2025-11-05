# Database Setup Instructions

## Prerequisites
- PostgreSQL installed on your system
- PostgreSQL server running

## Setup Steps

### 1. Create Database
```bash
# Login to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE ticketing_system;

# Exit psql
\q
```

### 2. Run Schema
```bash
# Apply the schema to create tables
psql -U postgres -d ticketing_system -f schema.sql
```

### 3. Seed Data (Optional)
```bash
# Insert sample data for testing
psql -U postgres -d ticketing_system -f seed.sql
```

## Database Schema

### Users Table
- `id` (PK, serial)
- `username` (unique, varchar(50))
- `email` (unique, varchar(100))
- `password` (hashed, varchar(255))
- `role` (enum: 'user', 'support', 'admin')
- `created_at` (timestamp, default: NOW())

### Tickets Table
- `id` (PK, serial)
- `title` (varchar(255), required)
- `description` (text)
- `status` (enum: 'open', 'in-progress', 'resolved', 'closed')
- `user_id` (FK → users.id)
- `created_at` (timestamp, default: NOW())
- `updated_at` (timestamp, default: NOW())

## Test Credentials
After seeding the database, you can use these credentials:

- **Admin**: admin@ticket.com / password123
- **Support**: support1@ticket.com / password123
- **User**: john@example.com / password123

## Verify Installation
```bash
# Connect to database
psql -U postgres -d ticketing_system

# List tables
\dt

# Check users
SELECT * FROM users;

# Check tickets
SELECT * FROM tickets;

# Exit
\q
```

## Troubleshooting

### Permission Issues
If you get permission errors, grant privileges:
```sql
GRANT ALL PRIVILEGES ON DATABASE ticketing_system TO your_username;
```

### Connection Issues
Update your database connection string in the backend config:
```
postgresql://postgres:password@localhost:5432/ticketing_system
```
