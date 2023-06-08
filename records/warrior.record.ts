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

        }
    }

}