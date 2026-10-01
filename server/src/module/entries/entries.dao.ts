import { EntryModel } from './entries.model.js';
import type { IEntries } from './entries.types.js';
import type { QueryFilter } from 'mongoose';
import mongoose from 'mongoose';

class EntriesDao {
  createEntry(data: IEntries) {
    return EntryModel.create(data);
  }

  fetchAllEntries(query: QueryFilter<IEntries> = {}) {
    return EntryModel.find(query).sort({ createdAt: -1 });
  }

  fetchSingleEntry(id: mongoose.Types.ObjectId | string) {
    return EntryModel.findById(id);
  }

  updateEntry(id: mongoose.Types.ObjectId | string, data: Partial<IEntries>) {
    return EntryModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  deleteEntry(id: mongoose.Types.ObjectId | string) {
    return EntryModel.findByIdAndDelete(id);
  }
}

export default EntriesDao;
