/**
 * @swagger
 * /api/flatshares/create:
 *   post:
 *     summary: Create a new flatshare
 *     tags: [Flatshares]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - surface
 *               - agency
 *               - bedrooms
 *             properties:
 *               surface:
 *                 type: number
 *                 example: 100
 *               agency:
 *                 type: string
 *                 example: "Century 21"
 *               bedrooms:
 *                 type: number
 *                 example: 3
 *               roomates:
 *                 type: array
 *     responses:
 *       201:
 *         description: Flatshare created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/flatshares/{id}:
 *   get:
 *     summary: Get a flatshare by ID
 *     tags: [Flatshares]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flatshare ID
 *     responses:
 *       200:
 *         description: Flatshare retrieved successfully
 *       404:
 *         description: Flatshare not found
 */

/**
 * @swagger
 * /api/flatshares:
 *   get:
 *     summary: Get all flatshares
 *     tags: [Flatshares]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Flatshares retrieved successfully
 */

/**
 * @swagger
 * /api/flatshares/{id}:
 *   delete:
 *     summary: Delete a flatshare by ID
 *     tags: [Flatshares]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flatshare ID
 *     responses:
 *       204:
 *         description: Flatshare deleted successfully
 *       404:
 *         description: Flatshare not found
 */

/**
 * @swagger
 * /api/flatshares/{id}/change-chief:
 *   put:
 *     summary: Change the chief of a flatshare
 *     tags: [Flatshares]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flatshare ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newChiefId
 *             properties:
 *               newChiefId:
 *                 type: number
 *                 description: ID of the new chief
 *     responses:
 *       200:
 *         description: Chief changed successfully
 *       400:
 *         description: The new chief is the same as the current chief
 *       403:
 *         description: You are not allowed to perform this action
 *       404:
 *         description: Flatshare or new chief not found
 */
