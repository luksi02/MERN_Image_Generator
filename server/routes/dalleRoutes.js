import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import OPENAI_API_KEY from "../constants.js"

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    // API KEY below:
    apiKey: OPENAI_API_KEY,


});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.status(200).json( {message:'Hello from DALL-E!'} )
    // res.send('Hello from DALL-E! This time API should work')
})

router.route('/').post( async (req, res) => {
    try {
        const { prompt } = req.body;

        console.log(prompt)

        const aiResponse = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        })

        // console.log(aiResponse.data.data[0].url)
        // console.log(aiResponse)


        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({ photo: image });

    }
    catch (error) {

        console.log(error);

        // console.log(error.response.status)
        // console.log(error.response.data)


        // res.status(500).send(error?.response.data.error.message)

    }
})

export default router;



//
// import express from 'express';
// import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';
//
// dotenv.config();
//
// const router = express.Router();
//
// const configuration = new Configuration({
//     apiKey: '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',
// });
//
// const openai = new OpenAIApi(configuration);
//
// router.route('/').get((req, res) => {
//     res.status(200).json({ message: 'Hello from DALL-E!' });
// });
//
// router.route('/').post(async (req, res) => {
//     try {
//         const { prompt } = req.body;
//
//         const aiResponse = await openai.createImage({
//             prompt,
//             n: 1,
//             size: '1024x1024',
//             response_format: 'b64_json',
//         });
//
//         const image = aiResponse.data.data[0].b64_json;
//         res.status(200).json({ photo: image });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error?.response.data.error.message || 'Something went wrong');
//     }
// });
//
// export default router;