const express = require('express')

const router = express.Router()

// get all workouts
router.get("/", (req, res) => {
    res.json({ msg: "all workouts" })
})

// get single workout
router.get("/:id", (req, res) => {
    res.json({ msg: "single workouts" })
})

// create a new workout
router.post("/", (req, res) => {
    res.json({ msg: "create a new workout" })
})

// delete a workout
router.delete("/:id", (req, res) => {
    res.json({ msg: "delete a workout" })
})

// update a workout
router.patch("/:id", (req, res) => {
    res.json({ msg: "update a workout" })
})

module.exports = router