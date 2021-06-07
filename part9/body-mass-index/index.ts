import express from 'express';
const app = express();
import { calculateBmi } from "./bmiCalculator";

app.get('/hello', (_req, res) => {
    res.send('Hello Ful Stack!');
});

app.get("/bmi", (req, res) => {
    const { weight, height } = req.query;
    const validParameters: boolean =
        !isNaN(Number(height)) && !isNaN(Number(weight));
    const bmi = calculateBmi(Number(height), Number(weight));

    if (!validParameters || !weight || !height) {
        res.send({
            error: "malformatted parameters",
        });
    }

    res.send({ weight, height, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});