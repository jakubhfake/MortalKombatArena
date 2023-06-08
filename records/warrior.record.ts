import {ValidationError} from "../utils/errors";

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

}