import express from 'express';

import { errorHandler, logError } from './error';
import logRequest from './logger';

export const middlewares = [express.json(), logRequest];
export const middlewaresError = [errorHandler, logError];
