import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    cloud_api_key: process.env.CLOUD_API_KEY,
    cloud_secret: process.env.CLOUD_SECRET_KEY,
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

export default router;