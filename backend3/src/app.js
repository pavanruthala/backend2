const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const dotenv = require('dotenv');

// Import route handlers
const userTypeMasterRoutes = require('./routes/userTypeMasterRoutes');
const cargoMasterRoutes = require('./routes/cargoMasterRoutes');
const airportMasterRoutes = require('./routes/airportMasterRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const customerRoutes = require('./routes/customerRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize environment variables
dotenv.config({ path: './config/dev.env' });

const app = express();
const port = process.env.PORT || 5000;

// Initialize in-memory session store
const memoryStore = new session.MemoryStore();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'random-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

// Initialize Keycloak middleware
const keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware());

// Connect to the database
connectDB();

// Route handlers
app.use('/userType', userTypeMasterRoutes);
app.use('/cargo', cargoMasterRoutes);
app.use('/air', airportMasterRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/user', userRoutes);
app.use('/customer', customerRoutes);

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
