import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/userModel.js';
import user from './api/userApi.js';
import account from './api/accountApi.js';
import region from './models/region.js';
import migrateService from './migrateService.js';
import dotenv from 'dotenv';
const app = express();
const port = 3001
dotenv.config();
app.use(cors());
app.use(express.json());
const url=process.env.URL;
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log('Connected to MongoDB')})
.catch(err=>{console.log('Error',err);});

async function migrateLanguage() {
    try {
      const isMigrated = await region.findOne();
      if (!isMigrated) {
        const response = await migrateService.startLanguageMigration();
      }
    } catch (e) {
      throw e;
    }
  }

  if(port){
    migrateLanguage()
}
app.use('/',user);
app.use('/',account);

app.listen(port,() => {
    console.log(`server connected to port ${port}`);
})