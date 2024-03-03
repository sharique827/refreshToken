import { User } from '../models/user.model'
import Crypto from 'crypto-js'
import { Request, Response } from 'express'
import * as redis from '../services/redis.services'
import { deleteData } from '../services/redis.services'
import jwt from 'jsonwebtoken'

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body
        const user = await User.findOne({ email })
        if (user) return res.status(409).json("already exists")
        const newUser = new User({
            username,
            email,
            password: Crypto.AES.encrypt(password, String(process.env.CRYPTO_KEY))
                .toString()
        })
        const savedUser = await newUser.save()
        const userData = {
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
        }
        res.status(201).json({ userData })
    } catch (err) {
        res.status(500).json(err)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "User doesnt exist" })

        const hashedPassword = Crypto.AES.decrypt(user.password,
            String(process.env.CRYPTO_KEY)
        );
        const originalpassword = hashedPassword.toString(Crypto.enc.Utf8)
        if (originalpassword !== req.body.password) {
            return res.status(401).json({ message: "Password invalid" })
        }
        const accessToken = jwt.sign({
            user: user.email,
            id: user._id
        }, String(process.env.JWT_KEY),
            {
                expiresIn: "10s"
            }
        )
        redis.set(`${user._id}:token`, accessToken)
        res.status(200).json({
            accessToken,
            id: user._id
        })

    } catch (err) {
        res.status(500).json(err)
    }
}


export async function logout(req: Request, res: Response){
try {
    const {id} = req.query
    const userData =await User.findOne({_id:id})
    if(!userData) throw new Error('User Not Found, Please Provide Correct Credential.')
    deleteData(`${userData._id}:token`)
    return res.status(200).send({success: true, message: 'User Logged Out Successfully'})
} catch (error:any) {
    return res.send({error: true, message: error?.message})
}
}
