# Url Shortener

1.Backend (Express.js and MongoDB):

- Set up the Express server
- Created MongoDB schemas for ShortUrl and User
- Implemented routes for URL shortening (anonymous and custom) and user authentication
- Added middleware for token-based authentication

  2.Frontend (React):

- Created components for Home (anonymous URL shortening), Login, Register, and CustomUrl (for authenticated users)
- Implemented API calls to the backend using axios
- Added basic routing and a PrivateRoute component for protected routes

To run this application:

1. Set up your MongoDB database and update the `MONGODB_URI` in your backend `.env` file.
2. Add a `JWT_SECRET` to your backend `.env` file for token signing.
3. Install dependencies for both backend and frontend by running `npm install` in both directories.
4. Start the backend server by running `node server.js` in the backend directory.
5. Start the frontend development server by running `npm start` in the frontend directory.
