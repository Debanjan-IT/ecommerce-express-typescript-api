import { Request, Response, NextFunction } from 'express';
require('dotenv/config')
import * as jwt from 'jsonwebtoken'

export default async function checkToken(req: Request, res: Response, next: NextFunction) {
    try {
        const unsecureUrl = ['/user/login', '/user/register']
        if (!unsecureUrl.includes(req.originalUrl)) {
            const header = req.headers.authorization.toString()
            const token = header && header.split(' ')[1]
            if (!token) return res.sendStatus(401)
            req.user = JSON.stringify(jwt.decode(token))
            next()
        } else {
            next()
        }
        
    } catch (error) {
        console.log(error);
    }
}