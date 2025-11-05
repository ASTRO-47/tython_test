import bcrypt from 'bcrypt';
import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

// Load environment variables from the correct path
dotenv.config({ path: '../../.env' });

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ticketing_system',
  password: 'TYTHON2025',  // Hardcoded for now
  port: parseInt(process.env.DB_PORT || '5432'),
};

// Log the configuration (without password)
console.log('Database configuration:', {
  ...dbConfig,
  password: '[HIDDEN]'
});

const pool = new Pool(dbConfig);

async function createUser(username, email, password, role) {
  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // SQL query to insert user
    const query = `
      INSERT INTO users (username, email, password, role) 
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role;
    `;

    // Execute query
    const result = await pool.query(query, [username, email, hashedPassword, role]);
    const user = result.rows[0];

    console.log('\nUser created successfully:');
    console.log('---------------------------');
    console.log('ID:', user.id);
    console.log('Username:', user.username);
    console.log('Email:', user.email);
    console.log('Role:', user.role);
    console.log('---------------------------');
    console.log('Password (plaintext):', password);
    console.log('Keep these credentials safe!\n');

  } catch (err) {
    console.error('Error creating user:', err.message);
    throw err;  // Propagate the error up
  }
}

// Create admin and support users
async function createInitialUsers() {
  try {
    // Create admin user
    await createUser(
      'imad',
      'imad@company.com',
      'admin123',
      'admin'
    );

    // Create support user
    await createUser(
      'ezzaghba',
      'ezzaghba@company.com',
      'support123',
      'support'
    );

  } catch (error) {
    console.error('Error creating initial users:', error);
  } finally {
    await pool.end();  // Close pool after all operations are done
  }
}

createInitialUsers();