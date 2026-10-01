import { Router } from 'express';
import EntriesController from './entries.controller.js';
import validate from '../../shared/middlewares/validate.middleware.js';
import EntriesValidator from './entries.validator.js';

const entriesRouter = Router();
const entriesController = new EntriesController();
const entriesValidator = new EntriesValidator();


/**
 * @openapi
 * /entries/create:
 *   post:
 *     tags:
 *       - Entries
 *     summary: Create a new entry
 *     description: Creates a new entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEntryRequest'
 *     responses:
 *       201:
 *         description: Entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntryResponse'
 *       400:
 *         description: Invalid entry data
 */
entriesRouter.post(
  '/create',
  validate(entriesValidator.createEntrySchema, 'body'),
  entriesController.createEntry,
);

/**
 * @openapi
 * /entries:
 *   get:
 *     tags:
 *       - Entries
 *     summary: Get all entries
 *     description: Fetches all entries with optional search, status, and tag filters.
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search entries by title or description.
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - in-progress
 *             - completed
 *             - blocked
 *         description: Filter entries by status.
 *       - in: query
 *         name: tags
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter entries containing the specified tag.
 *     responses:
 *       200:
 *         description: Entries fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntriesResponse'
 *       400:
 *         description: Invalid query parameters
 */
entriesRouter.get(
  '/',
  validate(entriesValidator.getEntriesSchema, 'query'),
  entriesController.getAndSearchAllEntries,
);

/**
 * @openapi
 * /entries/{id}:
 *   get:
 *     tags:
 *       - Entries
 *     summary: Get a single entry
 *     description: Fetches an entry using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the entry.
 *     responses:
 *       200:
 *         description: Entry fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntryResponse'
 *       400:
 *         description: Invalid entry ID
 *       404:
 *         description: Entry not found
 */
entriesRouter.get(
  '/:id',
  validate(entriesValidator.getSingleEntrySchema, 'params'),
  entriesController.getSingleEntry,
);

/**
 * @openapi
 * /entries/{id}:
 *   patch:
 *     tags:
 *       - Entries
 *     summary: Update an entry
 *     description: Updates one or more fields of an existing entry.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditEntryRequest'
 *     responses:
 *       200:
 *         description: Entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntryResponse'
 *       400:
 *         description: Invalid entry ID or entry data
 *       404:
 *         description: Entry not found
 */
entriesRouter.patch(
  '/:id',
  validate(entriesValidator.editEntryParamsSchema, 'params'),
  validate(entriesValidator.editEntrySchema, 'body'),
  entriesController.editEntry,
);

/**
 * @openapi
 * /entries/{id}:
 *   delete:
 *     tags:
 *       - Entries
 *     summary: Delete an entry
 *     description: Deletes an existing entry using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the entry.
 *     responses:
 *       200:
 *         description: Entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntryResponse'
 *       400:
 *         description: Invalid entry ID
 *       404:
 *         description: Entry not found
 */
entriesRouter.delete(
  '/:id',
  validate(entriesValidator.editEntryParamsSchema, 'params'),
  entriesController.deleteEntry,
);
export default entriesRouter;
