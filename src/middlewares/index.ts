import { errorHandler, logError } from './error';
import logRequest from './logger';

export const middlewares = [logRequest];
export const middlewaresError = [errorHandler, logError];
