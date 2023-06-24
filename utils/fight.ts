import {WarriorRecord} from "../records/warrior.record";

export const fight = (warrior1: WarriorRecord, warrior2: WarriorRecord): {
    log: string[];
    winner: WarriorRecord;
} => {
    const log: string[] = [];

    const warrior1Obj = {
        hp: warrior1.stamina * 10,
        dp: warrior1.defence,
        warrior: warrior1,
    };

    const warrior2Obj = {
        hp: warrior2.stamina * 10,
        dp: warrior2.defence,
        warrior: warrior2,
    };

    let attacker = warrior1Obj;
    let defender = warrior2Obj;

    do {
        const attackForce = attacker.warrior.force;

        log.push(`${attacker.warrior.name} atakuje ${defender.warrior.name} z siłą ${attackForce}.`)

        if (defender.dp + defender.warrior.agility > attackForce) {
            log.push(`${defender.warrior.name} broni się przed atakiem ${attacker.warrior.name}.`)
            defender.dp -= attackForce;
            if (defender.dp < 0) {
                log.push(`${attacker.warrior.name} przełamał obronę ${defender.warrior.name} zadając mu ${-defender.hp} obrażeń.`)
                defender.hp += defender.dp
            }
        } else {
            log.push(`${attacker.warrior.name} zadał ${attackForce} obrażeń ${defender.warrior.name}.`)
            defender.hp -= attackForce;
        }


        [defender, attacker] = [attacker, defender];

    } while (defender.hp > 0);

    const winner = defender.warrior;
    log.push(`Starcie zwyciężył ${winner.name} !`)

    return {
        log,
        winner,
    };
}