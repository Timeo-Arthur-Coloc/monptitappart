/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Creates a new user account with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - birthdate
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: User's first name
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 description: User's last name
 *                 example: "Doe"
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: User's date of birth in YYYY-MM-DD format
 *                 example: "1990-01-15"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (minimum 8 characters)
 *                 example: "Password@123"
 *               profilePicture:
 *                 type: string
 *                 format: uri
 *                 description: Optional URL of the user's profile picture
 *                 example: "https://example.com/profiles/john_doe.png"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input - missing or invalid fields
 *       409:
 *         description: User already exists
 */


// ===================================================================== //

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "arthur.lagneaux@supdevinci-edu.fr"
 *               password:
 *                 type: string
 *                 example: "1321216a21xe3a5z4661668a7xeIJO"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */

// ===================================================================== //

/**
 * @swagger
 * /api/users/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       401:
 *         description: Invalid refresh token
 */

// ===================================================================== //

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// ===================================================================== //

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get the profile of the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */

// ===================================================================== //

/**
 * @swagger
 * /api/users:
 *  get:
 *   summary: Get all users
 *   tags: [Users]
 *   security:
 *     - bearerAuth: []
 *   responses:
 *     200:
 *       description: Users retrieved successfully
 *     401:
 *       description: Unauthorized
 */

// ===================================================================== //

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

// ===================================================================== //

/**
 * @swagger
 * /api/users/{id}/flatshares:
 *   get:
 *     summary: Get flatshares of a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Flatshares retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */