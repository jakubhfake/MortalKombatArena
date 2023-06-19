import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";
import {ValidationError} from "../utils/errors";

export const warriorRouter = Router();

warriorRouter
    .get('/add-form', (req, res) =>{
        res.render('warrior/warrior-add-form');
    })
    .post('/', async (req, res) => {
        if (await WarriorRecord.isNameTaken(req.body.name)) {
            console.log( await WarriorRecord.isNameTaken(req.body.name));
            throw new ValidationError(`Przykro nam ale to imię ${req.body.name} wojownika jest już zajęte.`);
        }

        const warrior = new WarriorRecord({
            ...req.body,
            force: Number(req.body.force),
            defence: Number(req.body.defence),
            stamina: Number(req.body.stamina),
            agility: Number(req.body.agility)
        });
        await warrior.insert();
        res.render('warrior/warrior-added');
    })