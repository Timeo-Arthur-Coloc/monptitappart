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
 *               agency:
 *                 type: string
 *               bedrooms:
 *                 type: number
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
