import z from 'zod';

class EntriesValidator {
  readonly commonSchema = z.string().trim();

  readonly createEntrySchema = z.object({
    title: this.commonSchema
      .min(2, 'Title must be at least 2 characters')
      .max(50, 'Title must not exceed 50 characters'),

    description: this.commonSchema,

    tags: this.commonSchema.array().default([]),

    timeSpent: z.number().int().min(0).default(0),

    status: z.enum(['in-progress', 'completed', 'blocked']).default('in-progress'),
  });

  readonly getEntriesSchema = z.object({
    search: z.string().trim().optional(),
    status: z.enum(['in-progress', 'completed', 'blocked']).optional(),
    tags: z.string().trim().optional(),
  });

  readonly getSingleEntrySchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid entry ID'),
  });

  readonly editEntrySchema = this.createEntrySchema.partial();

  readonly editEntryParamsSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid entry ID'),
  });
}
export default EntriesValidator;
