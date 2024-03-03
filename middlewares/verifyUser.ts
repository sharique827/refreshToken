import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken"
import {get, set} from '../services/redis.services'
import { User } from "../models/user.model";

interface UserPayload {
  id: string,
  email: string
}

declare global {
  namespace Express {
    interface Request {
      user: UserPayload
    }
  }
}

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
  const {id} = req.query
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      
      const tokenCache = await get(`${id}:token`)
      if(token!==tokenCache) throw new Error('Invalid Token Please Login again')
      const user = jwt.verify(token, String(process.env.JWT_KEY)) as UserPayload
      if (!user) return res.status(403).json({ message: "Token is invalid!" });
      req.user = user;
      next()
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  } catch (error: any) {
    // console.error(error)
    if(error instanceof TokenExpiredError){
      const result: string | {[key:string]:any} = refreshToken(String(id))
      if(!result?.accessToken)
      throw new Error('Internal Server Error')
      req.body.refreshToken=result?.accessToken
      next()
    }else{
    throw new Error(error?.message)
  }
  }

};

async function refreshToken(id: string){
  try{
    const userCredential = await User.findOne({_id:id})
    if(!userCredential){
      return 'User Not Found'
    }
    const accessToken = jwt.sign({
      user: userCredential?.email,
      id
  }, String(process.env.JWT_KEY),
      {
          expiresIn: "30s"
      }
  )
  set(`${userCredential._id}:token`, accessToken)
  return {accessToken}
  }
  catch(e: any){
    return 'Something went wrong'
  }
}

