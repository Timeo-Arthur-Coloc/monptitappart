/**
 * @swagger
 * components:
 *   schemas:
 *     ExpensesEntity:
 *       type: object
 *       required:
 *         - title
 *         - details
 *         - amount
 *         - date
 *         - payedBy
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de la dépense.
 *           example: 1
 *         title:
 *           type: string
 *           description: Titre de la dépense.
 *           maxLength: 50
 *           example: "Achat de fournitures"
 *         details:
 *           type: string
 *           description: Détails supplémentaires sur la dépense.
 *           maxLength: 150
 *           example: "Stylo, carnets, et autres fournitures de bureau."
 *         amount:
 *           type: number
 *           description: Montant de la dépense.
 *           example: 125.75
 *         date:
 *           type: string
 *           format: date
 *           description: Date de la dépense au format YYYY-MM-DD.
 *           example: "2025-01-24"
 *         payedBy:
 *           $ref: '#/components/schemas/UserEntity'
 *           description: Utilisateur qui a payé la dépense.
 *         owings:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OwingsEntity'
 *           description: Liste des utilisateurs qui doivent une part de la dépense.
 */
