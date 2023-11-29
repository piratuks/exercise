import { setupServer } from 'msw/node';
import { userHandlers } from './users/userHandlers';

export const server = setupServer(...userHandlers);
