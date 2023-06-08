export class WarriorRecord {
    public id?: string;
    /**
     * name of warrior must be unique
     */
    public readonly name: string;
    public readonly force: string;
    public readonly defence: string;
    public readonly stamina: string;
    public readonly agility: string;
    public wins = 0;

}