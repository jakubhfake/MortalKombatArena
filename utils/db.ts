import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'mortal_combat_arena',
    namedPlaceholders: true,
    decimalNumbers: true,
});