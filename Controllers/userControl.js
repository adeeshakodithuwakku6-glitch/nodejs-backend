import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export async function Createuser(req ,res){
    try{
        const password = req.body.password;
        const passwordHash =  await bcrypt.hash(password, 10);

        const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: passwordHash,
        })
        await user.save()
        res.json({
            message: "User saved successfully"
        
        });
        console.log("user saved successfully");
    } catch (error) {   
        console.error(error);
        res.json({ message: 'Internal server error' });
    }
}
export async function loginUser(req , res){
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: email });
        if(user === null){
            res.status(404).json({ message: "User does not exist" });
            return;
        }
        const ispasswordmatching = await bcrypt.compare(password, user.password);
        if(ispasswordmatching){
            const userInfo={
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,    
                isadmin: user.isadmin,
                isblocked: user.isblocked,
                isemailverified: user.isemailverified,
            }
            const token = jwt.sign(userInfo, process.env.jwtSecret);
            res.json({ token: token });
        }
        else{
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export function isAdmin(req){
    if(req.user == null){
            return false;
        }
        if(!req.user.isadmin){
            return false;
        }
        return true;
}