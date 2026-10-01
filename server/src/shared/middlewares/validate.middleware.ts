import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import ApiError from '../utils/apiError.util.js';

const validate = (schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      throw ApiError.badRequest('', result.error.issues);
    }

    if (source === 'body') {
      req.body = result.data;
    } else {
      req.validatedQuery = result.data;
    }

    next();
  };
};

export default validate;
