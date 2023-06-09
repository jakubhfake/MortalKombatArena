import * as express from "express";
import 'express-async-errors';
import * as methodOverride from "method-override"
import {static as staticExpress, urlencoded} from "express";
import {engine} from "express-handlebars";
import {homeRouter} from "./routers/home";
import {warriorRouter} from "./routers/warrior";
import {arenaRouter} from "./routers/arena";
import {hallOfFameRouter} from "./routers/hall-of-fame";
import './utils/db'
import {WarriorRecord} from "./records/warrior.record";

const app = express();

app.use(methodOverride('_method'));
app.use(urlencoded({
    extended: true,
}));
app.use(staticExpress('public'));
app.engine('.hbs', engine({
    extname: '.hbs',
    // helpers: handlebarsHelpers????,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter);
app.use('/hall-of-fame', hallOfFameRouter);

//app.use(handleError);

const warrior = new WarriorRecord({
    name: 'Jakub',
    agility: 3,
    defence: 0,
    force: 0,
    stamina: 0,
})

app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');
});