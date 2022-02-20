import { errorHandler, logError } from './error';
import logRequest from './logger';
import express from 'express';

export const middlewares = [express.json(), logRequest];
export const middlewaresError = [errorHandler, logError];
