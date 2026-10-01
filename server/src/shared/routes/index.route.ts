import { Router } from 'express';
import docsRouter from './docs.route.js';
import healthRoute from './health.route.js';
import entriesRouter from '../../module/entries/entries.route.js';

const indexRouter = Router();

indexRouter.use('/docs', docsRouter);
indexRouter.use('/health', healthRoute);
indexRouter.use('/entries', entriesRouter);

export default indexRouter;
