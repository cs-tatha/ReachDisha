# Express.js + MySQL Backend

This is the backend service for the application, built with Node.js, Express.js, and MySQL.

## Project Structure
- `src/config/`: Configuration files (database connection settings, environment config)
- `src/routes/`: Route definitions mapping HTTP endpoints to controllers
- `src/controllers/`: Request/response coordinators and input handlers
- `src/services/`: Core business logic independent of HTTP
- `src/models/`: Database query logic and data layer
- `src/middleware/`: Express middleware functions (auth, validation, error handlers)
- `src/utils/`: Reusable helper functions and constants
- `src/app.js`: Express application configuration
- `src/server.js`: Server entry point that starts the HTTP listener

## Scripts
- `npm start`: Starts the server (`node src/server.js`)
- `npm run dev`: Starts the server with live reload (`node --watch src/server.js`)
