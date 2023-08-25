import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";
// import {CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET} from "../constants.js"

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
})

const router = express.Router();

//GET ALL POSTS
router.route('/').get(async (req,res) => {

    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }

});

// CREATE A POST

router.route('/').post(async (req,res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })

        res.status(201).json({ success: true, data: newPost });
        console.log('seems fine')
    } catch (error) {
        res.status(500).json({ success: false, message: error })
        console.log('failed')
        console.log(error)
    }
});

router.route('/cloud/').get(async (req,res) => {
    try {
        await cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
            {public_id: "olympic_flag"},
            function (error, result) {
                console.log(result)
            })
        console.log('cloud seems fine')
    } catch (error) {
        res.status(500).json({ success: false, message: error })
        console.log('cloud failed')
        console.log(cloudinary.config())
        console.log(error)
    }
});

export default router;