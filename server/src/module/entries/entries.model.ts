import mongoose from 'mongoose';
import type { IEntries } from './entries.types.js';

const EntrySchema = new mongoose.Schema<IEntries>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    tags: [
      {
        type: String,
        default: '',
      },
    ],
    timeSpent: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'blocked'],
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  },
);

export const EntryModel = mongoose.model<IEntries>('Entry', EntrySchema);
