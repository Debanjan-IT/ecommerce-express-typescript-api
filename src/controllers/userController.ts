import { Request, Response } from 'express';
import reg_validator from '../validators/user_registration_validator'
import log_validator from '../validators/user_login_validator'
import * as jwt from 'jsonwebtoken'
import { encrypt, decrypt } from '../important_stuff/hash_password'
import userModel from '../models/user_model'
export async function register (req: Request, res: Response) {
    try {
        const result = await reg_validator.validateAsync(req.body)
        var mongoose = require('mongoose');
        const uri = process.env.DATABASEURL || 'mongodb://localhost:27017/Test'
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        var db = mongoose.connection
        await db.on('error', () => {
            res.send({
                message: 'Something went wrong.'
            })
            return
        });
        await db.once('open', async () => {
            let available = await userModel.find({email: result.email})
            if (available.length > 0) {
                res.send({
                    message: 'Email already available.'
                })
                mongoose.connection.close();
                return
            } else {
                const passE = await encrypt(result.password)
                result.password = passE.password
                const create_new_user = new userModel(result)
                await create_new_user.save(function (err: any) {
                    if (err) {
                        res.send({
                            message: 'Something went wrong.'
                        })
                    }
                    else {
                        res.send({
                            message: 'User created successfully.'
                        })
                    }
                    mongoose.connection.close();
                });
            }
        });

    } catch (error) {
        res.send({
            message: 'Error',
            error: error.message
        })
    }
}

export async function login (req: Request, res: Response) {
    try {
        const result = await log_validator.validateAsync(req.body)
        var mongoose = require('mongoose');
        const uri = process.env.DATABASEURL || 'mongodb://localhost:27017/Test'
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        var db = mongoose.connection
        await db.on('error', () => {
            res.send({
                message: 'Something went wrong.'
            })
        });
        await db.once('open', async () => {
            let available = await userModel.find({email: result.email})
            if (available) {
                let fetchedUser = available[0]
                const passD = await decrypt(fetchedUser.password)
                if(passD.password == result.password) {
                    const userDetails = {
                        id: fetchedUser.id,
                        first_name: fetchedUser.first_name,
                        last_name: fetchedUser.last_name,
                        email: fetchedUser.email,
                        role: fetchedUser.role
                    }
                    let access_token = jwt.sign(userDetails, process.env.ACCESSTOKENSECRET)
                    res.send({
                        Token: access_token,
                        message: 'User loggedin.'
                    })
                    mongoose.connection.close();
                } else {
                    res.send({
                        message: 'Wrong password.'
                    })
                    mongoose.connection.close();
                } 
            } else {
                res.send({
                    message: 'Wrong email.'
                })
                mongoose.connection.close();
            }
        });
    } catch (error) {
        res.send({
            message: 'Error',
            error: error.message
        })
    }
}

export async function getUser (req: Request, res: Response) {
    res.send({
        user: JSON.parse(req.user),
        status: "Success get user.",
        message: "Running"
    })
}

export async function refresh_token (req: Request, res: Response) {
    let access_token = jwt.sign(JSON.parse(req.user), process.env.ACCESSTOKENSECRET)
    res.send({
        Token: access_token,
        status: "Success user refresh token",
        message: "Running"
    })
}

