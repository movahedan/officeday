/**
 * @swagger
 * components:
 *   schemas:
 *     PersonCreate:
 *       type: object
 *       description: The owner of the event
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the event owner
 *     Person:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Id of the person
 *         name:
 *           type: string
 *           description: Name of the person
 *     Option:
 *       type: object
 *       description: The owner of the event
 *       required:
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the group event option
 *         date:
 *           type: string
 *           format: date-time
 *           description: Suggested date for the event
 *     RSVPResponse:
 *       type: string
 *       enum: ['NOT_POSSIBLE', 'POSSIBLE', 'TENTATIVE']
 *       description: Rsvp statuses
 *     RSVP:
 *       type: object
 *       required:
 *         - date
 *         - response
 *       properties:
 *         date:
 *           type: string
 *           description: Identifier of the group event option
 *         response:
 *           $ref: '#/components/schemas/RSVPResponse'
 *     Invitee:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - rsvps
 *       properties:
 *         id:
 *           type: string
 *           description: Identifier of the invitee
 *         name:
 *           type: string
 *           description: Name of the invitee
 *         rsvps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RSVP'
 *     GroupEvent:
 *       type: object
 *       required:
 *         - id
 *         - owner
 *         - options
 *         - invitees
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the group event
 *         owner:
 *           $ref: '#/components/schemas/Person'
 *         options:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Option'
 *         invitees:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Invitee'
 */
