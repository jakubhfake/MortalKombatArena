import * as express from "express";
import * as methodOverride from "method-override"
import {static as staticExpress, urlencoded} from "express";
import {engine} from "express-handlebars";
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

app.get('/', (req, res) => {
    res.send('Hello!!!')
});
//app.use(handleError);

app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');
});