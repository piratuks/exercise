import { setupWorker } from 'msw';
import { userHandlers } from './users/userHandlers';

export const worker = setupWorker(...userHandlers);
