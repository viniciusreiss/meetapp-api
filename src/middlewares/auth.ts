import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { promisify } from 'util'

declare module 'express' {
  interface Request {
    userId?: string
  }
}

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  console.log
  try {
    const decoded: any = await promisify(jwt.verify)(token, 'meetapp')
    req.userId = decoded.id
    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}

export { authentication }
