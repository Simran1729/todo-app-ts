import jwt from 'jsonwebtoken';
export const secretKey = 'DogsaretheBest';
import { NextFunction, Request, Response } from 'express';

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!payload) {
                return res.sendStatus(403);
            }
            if (typeof payload === "string") {
                return res.sendStatus(403);
            }
            // req.userId = user.id; not valid as req doesn't have userId param
            req.headers['userId'] = payload.id;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
