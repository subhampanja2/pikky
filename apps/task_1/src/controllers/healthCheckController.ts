import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
    res.send('API is healthy');
};
