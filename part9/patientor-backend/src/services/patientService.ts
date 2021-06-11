import { v1 as uuid } from 'uuid';
import patientData from "../../data/patients";
import { NewPatient, Patient, NonSensitivePatient } from "../types";

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name, 
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patient: NewPatient): Patient => {

    const newPatient = {
        // id: Math.max(...patients.map(p => p.id)) + 1,
        id: uuid(),
       ...patient
    };
    
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};