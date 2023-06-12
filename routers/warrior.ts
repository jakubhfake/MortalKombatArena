import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";

export const warriorRouter = Router();

warriorRouter
    .get('/add-form', (req, res) =>{
        res.render('warrior/warrior-add-form');
    })
    .post('/', async (req, res) => {

        const warrior = new WarriorRecord({
            name: "",
            ...req.body,
            force: Number(req.body.force),
            defence: Number(req.body.defence),
            stamina: Number(req.body.stamina),
            agility: Number(req.body.agility)
        });
        await warrior.insert();
        res.render('warrior/warrior-added');
    })