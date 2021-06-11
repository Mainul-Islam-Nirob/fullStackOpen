/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        const addedPatient = patientService.addPatient(newPatient);

        res.json(addedPatient);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }

//     const { name, dateOfBirth, gender, ssn, occupation } = req.body;
//     const newPatient = patientService.addPatient({
//         name,
//         dateOfBirth,
//         gender,
//         ssn,
//         occupation,
// });
//     res.json(newPatient);
});

export default router;