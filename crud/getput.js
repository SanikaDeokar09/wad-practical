// server.js

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ===========================================
// Middleware
// ===========================================

app.use(express.json());


// ===========================================
// MongoDB Connection
// ===========================================

mongoose.connect("mongodb://127.0.0.1:27017/collegeDB")

.then(() => {

    console.log("MongoDB Connected");

})

.catch((err) => {

    console.log(err);

});


// ===========================================
// Schema
// ===========================================

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    course: {
        type: String,
        required: true
    },

    percentage: {
        type: Number,
        required: true
    }

});


// ===========================================
// Model
// ===========================================

const Student = mongoose.model("Student", studentSchema);


// ===========================================
// POST API
// Add Student Record
// ===========================================

app.post("/admissions", async (req, res) => {

    try {

        const student = new Student(req.body);

        const savedStudent = await student.save();

        res.status(201).json({

            message: "Student Added Successfully",

            data: savedStudent

        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


// ===========================================
// GET API
// Get All Student Records
// ===========================================

app.get("/admissions", async (req, res) => {

    try {

        const students = await Student.find();

        res.status(200).json(students);

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


// ===========================================
// GET API BY ID
// ===========================================

app.get("/admissions/:id", async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({

                message: "Student Record Not Found"

            });

        }

        res.status(200).json(student);

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


// ===========================================
// PUT API
// Update Student Record
// ===========================================

app.put("/admissions/:id", async (req, res) => {

    try {

        const updatedStudent = await Student.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        if (!updatedStudent) {

            return res.status(404).json({

                message: "Student Record Not Found"

            });

        }

        res.status(200).json({

            message: "Student Record Updated Successfully",

            data: updatedStudent

        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


// ===========================================
// DELETE API
// Delete Student Record
// ===========================================

app.delete("/admissions/:id", async (req, res) => {

    try {

        const deletedStudent = await Student.findByIdAndDelete(req.params.id);

        if (!deletedStudent) {

            return res.status(404).json({

                message: "Student Record Not Found"

            });

        }

        res.status(200).json({

            message: "Student Record Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


// ===========================================
// Server Port
// ===========================================

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});