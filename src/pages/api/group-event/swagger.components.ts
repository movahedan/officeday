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
 *     GroupEventOptionCreate:
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
 *     GroupEventOption:
 *       type: object
 *       required:
 *         - id
 *         - date
 *         - eventId
 *         - optionStatusIds
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the group event option
 *         date:
 *           type: string
 *           format: date-time
 *           description: Suggested date for the event
 *         eventId:
 *           type: string
 *           description: Identifier of the related group event
 *         optionStatusIds:
 *           type: array
 *           items:
 *             type: string
 *     Status:
 *       type: string
 *       enum: ['Not voted', 'Not possible', 'Possible', 'Reluctant']
 *       description: Updated status of the invitee for this option
 *     GroupEventOptionStatusCreate:
 *       type: object
 *       required:
 *         - optionId
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: Identifier of the status option
 *         optionId:
 *           type: string
 *           description: Identifier of the group event option
 *         status:
 *           $ref: '#/components/schemas/Status'
 *     GroupEventOptionStatus:
 *       type: object
 *       required:
 *         - id
 *         - optionId
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: Identifier of the status option
 *         optionId:
 *           type: string
 *           description: Identifier of the group event option
 *         status:
 *           $ref: '#/components/schemas/Status'
 *     GroupEventInvitee:
 *       type: object
 *       required:
 *         - id
 *         - person
 *         - personId
 *         - groupEventId
 *         - optionStatuses
 *       properties:
 *         id:
 *           type: string
 *           description: Identifier of the invitee
 *         personId:
 *           type: string
 *           description: Identifier of the person invited
 *         person:
 *           $ref: '#/components/schemas/Person'
 *         groupEventId:
 *           type: string
 *           description: Identifier of the related group event
 *         optionStatuses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GroupEventOptionStatus'
 *     GroupEvent:
 *       type: object
 *       required:
 *         - id
 *         - ownerId
 *         - owner
 *         - suggestedOptions
 *         - invitees
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the group event
 *         ownerId:
 *           type: string
 *           description: Identifier of the owner of the group event
 *         owner:
 *           type: object
 *           required:
 *             - id
 *             - name
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *               description: Name of the owner
 *         suggestedOptions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GroupEventOption'
 *         invitees:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - id
 *               - person
 *               - personId
 *               - groupEventId
 *               - optionStatuses
 *             properties:
 *               id:
 *                 type: string
 *                 description: Identifier of the invitee
 *               personId:
 *                 type: string
 *                 description: Identifier of the person invited
 *               person:
 *                 $ref: '#/components/schemas/Person'
 *               groupEventId:
 *                 type: string
 *                 description: Identifier of the related group event
 *               optionStatuses:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/GroupEventOptionStatus'
 */
