require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const conString = process.env.MONGO_URI;
console.log("MONGO URI:", conString);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const connectToDb = async () => {
    try {
        const client = await MongoClient.connect(conString, { useNewUrlParser: true, useUnifiedTopology: true });
        return client.db("todosDB");
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Could not connect to the database");
    }
};

app.post("/register-user", async (req, res) => {
    const { UserId, UserName, Password, Email, Mobile } = req.body;
    const user = { UserId, UserName, Password, Email, Mobile };

    try {
        const db = await connectToDb();
        await db.collection("users").insertOne(user);
        console.log("User Registered");
        res.send("User registered successfully");
    } catch (error) {
        res.status(500).send("Error registering user");
    }
});

app.get("/get-users", async (req, res) => {
    try {
        const db = await connectToDb();
        const users = await db.collection("users").find({}).toArray();
        res.send(users);
    } catch (error) {
        res.status(500).send("Error fetching users");
    }
});

app.post("/add-appointment", async (req, res) => {
    const appointment = {
        AppointmentId: parseInt(req.body.AppointmentId),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId: req.body.UserId
    };

    try {
        const db = await connectToDb();
        await db.collection("appointments").insertOne(appointment);
        console.log("Appointment Added Successfully");
        res.send("Appointment added successfully");
    } catch (error) {
        res.status(500).send("Error adding appointment");
    }
});

app.get("/get-appointments/:userid", async (req, res) => {
    const userId = req.params.userid;
    try {
        const db = await connectToDb();
        const appointments = await db.collection("appointments").find({ UserId: userId }).toArray();
        res.send(appointments);
    } catch (error) {
        res.status(500).send("Error fetching appointments");
    }
});

app.get("/get-appointment/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const db = await connectToDb();
        const appointment = await db.collection("appointments").findOne({ AppointmentId: id });
        res.send(appointment);
    } catch (error) {
        res.status(500).send("Error fetching appointment");
    }
});

app.put("/edit-appointment/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const appointment = {
        AppointmentId: parseInt(req.body.AppointmentId),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId: req.body.UserId
    };

    try {
        const db = await connectToDb();
        await db.collection("appointments").updateOne({ AppointmentId: id }, { $set: appointment });
        console.log("Appointment updated successfully");
        res.send("Appointment updated successfully");
    } catch (error) {
        res.status(500).send("Error updating appointment");
    }
});

app.delete("/delete-appointment/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const db = await connectToDb();
        await db.collection("appointments").deleteOne({ AppointmentId: id });
        console.log("Appointment deleted");
        res.send("Appointment deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting appointment");
    }
});

const PORT = process.env.PORT || 1122;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
