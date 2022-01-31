# JWT-Authentication
1. Install npm packages express, mongoose, bcryptjs(for hashing password), jsonwebtoken
2. Create database/cluster in MongoDB
3. In app.js connect to database with mongoose and follow usual procedure
4. Create models and schema, example: User.js
5. Create routes for register and log-in
6. Check for all inputs and test routes in Postman before proceeding
7. In users.routes import bcryptjs, jsonwebtoken
8. Implement bcrypt in post route of register for hashing password and storing hashedPassword in database
9. Implement bcrypt in post route of login to check matching of hashedPassword
10. Create token with jwt in post route of register and login
11. Create auth file in middleware folder to check matching token
13. Register with a new user or login with an existing user
14. Implement localStorage(setItem) for login data
15. Implement localStorae(removeItem) for logging out
