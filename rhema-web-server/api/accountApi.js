import express from 'express';
import Account from '../models/createAccModel.js';
import mongoose from 'mongoose';
const router= express.Router();

router.post('/createaccount',async (req, res) => {
        try {
            const AccountData = await Account.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                role:req.body.values,
                region: req.body.region,
                country: req.body.country,
                language: req.body.language,
                mobile: req.body.mobile
            });
            // console.log(UserData);
    
            res.status(200).json(AccountData)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
    )
    router.get('/getallaccounts', async (req, res) => {
        try {
            const AccountData = await Account.find({});
            res.status(200).json(AccountData)
            } 
        catch (error) {
            res.status(500).json({error:error.message})
        }})
    
        router.get('/user/:role/:id', async (req, res) => {
            const role=req.params.role;
            const id=req.params.id;
            try {
                const SingleUser = await Account.findById({_id:id});
                if(SingleUser){
                    res.status(200).json(SingleUser)
                }
                else{
                    res.status(404).json({message:'User not found'})
                }
                } 
            catch (error) {
                res.status(500).json({error:error.message})
            }
        })    
        
        router.put('/user/:role/:id', async (req, res) => {
            const role=req.params.role;
            const id=req.params.id;
            const filter = {
                _id: mongoose.Types.ObjectId(id)
              };
              const options ={returnOriginal: false};
              const userData = req.body;

              try {
                  const UpdateSingleUser = await Account.findOneAndUpdate(filter, {$set: userData}, options);
                if(UpdateSingleUser){
                    res.status(200).json(UpdateSingleUser)
                }
                else{
                    res.status(404).json({message:'User not found to update'})
                }
                } 
            catch (error) {
                res.status(500).json({error:error.message})
            }
            
        }) 

        router.delete('/user/:role/:id', async (req, res) => {
            const role=req.params.role;
            const id=req.params.id;
            const filter = {
                _id: mongoose.Types.ObjectId(id)
              };
              try {
                  const UpdateSingleUser = await Account.findOneAndDelete(filter);
                if(UpdateSingleUser){
                    res.status(200).json({message:'User deleted successfully'})
                }
                else{
                    res.status(404).json({message:'User not found to update'})
                }
                } 
            catch (error) {
                res.status(500).json({error:error.message})
            }
            
        }) 

export default router;