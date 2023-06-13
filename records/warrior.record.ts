import {ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type WarriorRecordResults = [WarriorRecord[], FieldPacket[]];

export class WarriorRecord {
    public id?: string;
    /**
     * name of warrior must be unique
     */
    public readonly name?: string;
    public readonly force: number;
    public readonly defence: number;
    public readonly stamina: number;
    public readonly agility: number;
    public wins?: number;

    constructor(obj: Omit<WarriorRecord, "insert" | "update">) {
        const {id, name, force, defence, stamina, agility, wins} = obj;

        const skills = [force, defence, stamina, agility];

        for (const skill of skills) {
            if (skill < 1) {
                throw new ValidationError(`Każda z umiejetności musi wynosić min. 1. Proszę dokonać zmiany.`);
            }
        }

        const sum = skills.reduce((prev, curr) => prev + curr, 0);

        if (sum !== 10) {
            throw new ValidationError(`Suma wszystkich statystyk musi wynosić 10. Aktualnie wynosi ona ${sum}`);
        }
        console.log(name.length);
        if(name.length < 3 || name.length > 50) {
            throw new ValidationError(`Imię wojownika musi posiadać od 3 do 50 znaków. Aktualnie jest to ${name.length}`);
        }
        this.id = id ?? uuid();
        this.wins = wins ?? 0;
        this.name = name;
        this.force = force;
        this.defence = defence;
        this.stamina = stamina;
        this.agility = agility;

    }

    async insert(): Promise<string> {

       await pool.execute("INSERT INTO warriors(`id`, `name`, `force`, `defence`, `stamina`, `agility`, `wins`) VALUES (:id, :name, :force, :defence, :stamina, :agility, :wins)", {
           //Find better way to put values example use reduce()
           id: this.id,
           name: this.name,
           force: this.force,
           defence: this.defence,
           stamina: this.stamina,
           agility: this.agility,
           wins: this.wins,
       })
        return this.id;
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE warriors SET `wins` = :wins", {
            wins: this.wins,
        });
    }

    static async getOne(id: string): Promise<WarriorRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `warriors` WHERE `id` = :id", {
            id,
        }) as WarriorRecordResults;

        return results.length === 0 ? null : results[0];
    }

    static async listAll(): Promise<WarriorRecord[]>{
        const [results] = await pool.execute("SELECT * FROM `warriors`") as WarriorRecordResults;
        return results.map(obj => new WarriorRecord(obj));
    }

    static async listTop(topCount: number): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors` ORDER BY `wins` DESC LIMIT :topCount", {
            topCount,
        }) as WarriorRecordResults;
        return results.map(obj => new WarriorRecord(obj));
    }

}