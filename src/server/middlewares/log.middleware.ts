import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { getConfig } from '../config';

const config = getConfig();

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toLocaleString();
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;
    fs.appendFileSync(`${config.logDir}/logs.txt`, `[${timestamp}] / ${ip} Request to: ${req.method} ${req.url}\n`);
    next();
};