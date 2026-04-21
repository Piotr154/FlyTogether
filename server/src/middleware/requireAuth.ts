import { Request, Response, NextFunction } from 'express'
import { auth } from '../auth'
import { fromNodeHeaders } from 'better-auth/node'

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    })

    if (!session) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }

    req.user = session.user
    next()
}