import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";
import {ValidationError} from "../utils/errors";
import {fight} from "../utils/fight";

export const arenaRouter = Router();

arenaRouter
    .get('/fight-form', async (req, res) =>{
        const warriors = await WarriorRecord.listAll()
        res.render('arena/fight-form', {
            warriors,
        });
    })
    .post('/fight', async (req, res) => {
        const {warrior1: warrior1Id, warrior2: warrior2Id} = req.body;

        console.log(req.body);

        if(warrior1Id === warrior2Id) {
            throw new ValidationError(`Proszę wybrać różnych Wojowników`)
        }

        const warrior1 = await WarriorRecord.getOne(warrior1Id);
        const warrior2 = await WarriorRecord.getOne(warrior2Id);
        if (!warrior1) {
            throw new ValidationError(`Nie znaleziono wojownika nr 1.`);
        }

            if (!warrior2) {
                throw new ValidationError(`Nie znaleziono wojownika nr 2.`);
        }

    const {log, winner} = fight(warrior1, warrior2);
    console.log(log);
    winner.wins++;
    await  winner.update();

    res.render('arena/fight', {
        log,
    });
})