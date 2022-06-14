const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.patch("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;
        // console.log("User id: ",userId);
        //todo: I can't see req.user
        // console.log("Request user id",req.user._id);//DOES NOT WORK!!!
        // console.log("Request user id",req.user.toString());//DOES NOT WORK!!!

        //todo: userId = current user id

        if (userId === req.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
            res.send(updatedUser);
        } else {
            res.status(401).json({
                message: "Unauthorized"
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Server error. Please try again later"
        });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const list = await User.find();
        res.send(list);
    } catch (e) {
        res.status(500).json({
            message: "Server error. Please try again later"
        });
    }
});

module.exports = router;