import type { QueryFilter } from 'mongoose';
import ApiResponse from '../../shared/utils/apiResponse.util.js';
import AsyncHandler from '../../shared/utils/async-handler.util.js';
import EntriesDao from './entries.dao.js';
import type { IEntries } from './entries.types.js';
import ApiError from '../../shared/utils/apiError.util.js';

const entriesDao = new EntriesDao();

class EntriesController {
  createEntry = AsyncHandler(async (req, res) => {
    const data = req.body;

    const newEntry = await entriesDao.createEntry(data);

    return ApiResponse.created('New entry created', newEntry).send(res);
  });

  getAndSearchAllEntries = AsyncHandler(async (req, res) => {
    const { search, status, tags } = req.query;

    const query: QueryFilter<IEntries> = {};

    if (search && typeof search === 'string') {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status as IEntries['status'];
    }

    if (tags && typeof tags === 'string') {
      query.tags = tags;
    }

    const allEntries = await entriesDao.fetchAllEntries(query);

    const payload = {
      count: allEntries.length,
      entries: allEntries,
    };

    return ApiResponse.ok('Fetched all entries', payload).send(res);
  });

  getSingleEntry = AsyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      throw ApiError.badRequest('Invalid entry ID');
    }

    const singleEntry = await entriesDao.fetchSingleEntry(id);

    return ApiResponse.ok('fetched single entry', singleEntry).send(res);
  });

  editEntry = AsyncHandler(async (req, res) => {
    const data = req.body;
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      throw ApiError.badRequest('Invalid entry ID');
    }

    const editedEntry = await entriesDao.updateEntry(id, data);

    if (!editedEntry) {
      throw ApiError.notFound('Entry not found');
    }

    return ApiResponse.ok('Entry updated', editedEntry).send(res);
  });

  deleteEntry = AsyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      throw ApiError.badRequest('Invalid entry ID');
    }

    const deletedEntry = await entriesDao.deleteEntry(id);

    if (!deletedEntry) {
      throw ApiError.notFound('Entry not found');
    }

    return ApiResponse.ok('Entry deleted', deletedEntry).send(res);
  });
}
export default EntriesController;
