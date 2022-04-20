import express from 'express';
import User from '../models/userModel.js';

const router= express.Router();

router.post('/login',async (req, res) => {
        try {
            const UserData = await User.create({
                email: req.body.email,
                password: req.body.password
            });
            // console.log(UserData);
    
            res.status(200).json(UserData)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
)

export default router;