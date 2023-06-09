import {ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import {pool} from "../utils/db";

export class WarriorRecord {
    public id?: string;
    /**
     * name of warrior must be unique
     */
    public readonly name: string;
    public readonly force: number;
    public readonly defence: number;
    public readonly stamina: number;
    public readonly agility: number;
    public wins?: number;

    constructor(obj: WarriorRecord) {
        const{id, name, force, defence, stamina, agility, wins} = obj;

        const sum = [force, defence, stamina, agility].reduce((prev, curr) => prev + curr, 0);

        if (sum !== 10) {
            throw new ValidationError(`Suma wszystkich statystyk musi wynosić 10. Aktualnie wynosi ona ${sum}`);
        }

        if(name.length <= 3 && name.length >= 50) {
            throw new ValidationError(`Imię wojownika musi posiadać od 3 do 50 znaków. Aktualnie jest to ${name.length}`);
        }
        this.id = id;
        this.name = name;
        this.force = force;
        this.defence = defence;
        this.stamina = stamina;
        this.agility = agility;
        this.wins = wins;

    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        if (typeof this.wins !== 'number') {
            this.wins = 0;
        }

       await pool.execute("INSERT INTO 'warriors'('id','name', 'force', 'defence', 'stamina', 'agility', 'wins') VALIUES (:id, :name, :force, :defence, :stamina, :agility, :wins)", {
           //Find better way to put values example use reduce()
           id: this.id,
           name: this.name,
           force: this.force,
           defence: this.defence,
           stamina: this.stamina,
           agility: this.agility,
           wins: this.wins,
       })

    }

    async update(): Promise<void> {

    }

    static async getOne(id: string): Promise<WarriorRecord | null> {

    }

    static async listAll(): Promise<WarriorRecord[]>{

    }

    static async listTop(topCount: number): Promise<WarriorRecord[]> {

    }

}