import axios from "axios";
import Region from "./models/region.js";
import Country from "./models/country.js";
import Language from "./models/language.js";


class MigrationService{
    constructor(){}

    async startLanguageMigration(){
        const response=await axios.get('https://restcountries.com/v3.1/all')
        let data=[];
        for(let object of response.data){
            const lang=Object.values(object.languages);
            // const data =lang.map((language)=>{
            //     const obj={
            //         country: object.name.common,
            //         language: language,
            //         region: object.region,
            //      }
            // return obj
            // })
            const obj ={
                        country: object.name.common,
                        language: lang[1],
                        region: object.region,
            }
            data.push(obj);

               for(let regions of data) {
                this.createRegion(regions)
               }
        }
    }

    async createRegion(regionData){
        let region;
            try {
                if(!regionData.region){
                        return ;
                }
                const filter={
                    regionName:regionData.region.toLowerCase()
                }
                region=await Region.findOne(filter);
                if(!region){
                    region = await new Region({
                        region:regionData.region.toLowerCase()
                    })
                    .save();
                    await this.createCountry(regionData, region);
                    return { success: true, message: "Language created Successfully" };  
                }
            } catch (error) {
                throw new Error(error.message)
            }
    }

    async createCountry(regionData,region){
        let country;
        try {
            if(!regionData.country){
                return ;
            }
            const filter={
                countryName:regionData.country.toLowerCase()
            }
            country=await Country.findOne(filter);
            if(!country){
                country = await new Country({
                    country:regionData.country.toLowerCase(),
                    regionId:region["_id"]
                })
                .save();
            }
            await this.createLanguage(regionData, country);
        } catch (error) {
            throw new Error(error.message)
        }

    }

    async createLanguage(regionData,country){
        let language;
        try {
            if(!regionData.language){
                return ;
            }
            const filter={
                languageName:regionData.language.toLowerCase()
            }
            language=await Language.findOne(filter);
            if(!language){
                language = await new Language({
                    language:regionData.language.toLowerCase(),
                    countryId:country["_id"]
                })
                .save();
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


export default new MigrationService();