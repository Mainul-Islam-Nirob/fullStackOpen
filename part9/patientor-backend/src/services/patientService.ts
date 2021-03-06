import { v1 as uuid } from 'uuid';
import patientData from "../../data/patients";
import { NewPatient, Patient, PublicPatient, NewEntry, Entry } from "../types";

const patients: Array<Patient> = patientData;

const getPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name, 
        dateOfBirth,
        gender,
        occupation
    }));
};

const findPatientById = (id: string): Patient | undefined => {
    let patient = patients.find((p) => p.id === id);

    if (patient && !patient?.entries)
        patient = {
            ...patient,
            entries: [],
        };

    return patient;
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

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
    const id: string = uuid();

    const entryToAdd: Entry = {
        ...newEntry,
        id,
    };
    patient.entries.push(entryToAdd);

    return patient;
};

export default {
    getPatients,
    findPatientById,
    addPatient,
    addEntry
};