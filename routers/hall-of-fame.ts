import {Router} from "express";

export const hallOfFameRouter = Router();

hallOfFameRouter
    .get('/add-form', (req, res) =>{
        res.send('Lista najlepszych wojowników');
    });