/**
 * @swagger
 * components:
 *   schemas:
 *     OwingsEntity:
 *       type: object
 *       required:
 *         - amount
 *         - date
 *         - debtor
 *         - expense
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de l'owing.
 *           example: 1
 *         amount:
 *           type: number
 *           description: Montant dû par l'utilisateur.
 *           example: 50.25
 *         date:
 *           type: string
 *           format: date
 *           description: Date à laquelle l'owing a été enregistré au format YYYY-MM-DD.
 *           example: "2025-01-24"
 *         debtor:
 *           $ref: '#/components/schemas/UserEntity'
 *           description: Utilisateur qui doit le montant.
 *         expense:
 *           $ref: '#/components/schemas/ExpensesEntity'
 *           description: Dépense à laquelle cet owing est associé.
 */
