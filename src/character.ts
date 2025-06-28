import * as ex from "excalibur";
import * as res from "./resources";
import { BLINK_TIME, NUM_BLINKS } from "./constants";

// tune these for game balance
const DEFAULT_LIFE = 40;
const ATTACKER_LIFE = 80;
const DEFENDER_LIFE = 160;

const charcterStatusText = new ex.Text({
    text: "life:\nskill:\nstamina:\ngrit:\noptimism:",
    font: res.RockSalt.toFont({size: 8}),
    color: ex.Color.White,
});

const demonStatusText = new ex.Text({
    text: "life:\nforgetfullness:\npressure:\nskill resistance:\ngrit resistance:",
    font: res.RockSalt.toFont({size: 8}),
    color: ex.Color.White,
});

export class Character extends ex.Actor {
    hero: string;
    level: number;
    maxLevel: boolean = false;
    life: number;
    maxLife: number;
    skill: number;
    stamina: number;
    grit: number;
    optimism: number;
    defender: boolean = false;
    alive: boolean = true;
    sprite: ex.Actor;
    leftText: ex.Actor;
    midText: ex.Actor;
    rightText: ex.Actor;
    aliveImage: ex.ImageSource = res.torchBare
    deadImage: ex.ImageSource = res.torchLit;
    smackImage: ex.ImageSource = res.smackBadie;
    constructor() {
        super({width: 80, height: 120})
        this.sprite = new ex.Actor({offset: ex.vec(0, -36)});
        this.addChild(this.sprite);

        this.leftText = new ex.Actor({offset: ex.vec(-10, 30)});
        this.leftText.graphics.use(charcterStatusText);
        this.addChild(this.leftText);

        this.midText = new ex.Actor({offset: ex.vec(0, 0)});
        this.addChild(this.midText);

        this.rightText = new ex.Actor({offset: ex.vec(44, 30)});
        this.addChild(this.rightText);

        this.hero = "Scientist";
        this.level = 0;
        this.life = DEFAULT_LIFE; 
        this.maxLife = DEFAULT_LIFE;
        this.skill = 1;
        this.stamina = 1;
        this.grit = 1;
        this.optimism = 1;
    }
    attack(demon: Demon): number {
        if (this.skill > this.grit) {
            // Skill attack
            return Math.max(0, this.skill - demon.skillResistance);
        } else {
            // Grit attack
            return Math.max(0, this.grit - demon.gritResistance);
        }
    }
    smack(): void {
        let actor = new ex.Actor({offset: ex.vec(0, -36)});
        actor.graphics.add(this.smackImage.toSprite());
        this.sprite.addChild(actor);
        setTimeout(() => {
            actor.kill();
        }, BLINK_TIME);
    }
    killCharacter() {
        this.alive = false;
        this.sprite.graphics.use(this.deadImage.toSprite());
        this.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
    }
    levelUp(): Character {
        // Default implementation, can be overridden by subclasses
        this.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        this.fullHeal();
        return this;
    }
    fullHeal() {
        this.life = this.maxLife;
        this.alive = true;
        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateRightText();
    }
    updateMidText() {
        this.midText.graphics.use(
            new ex.Text({
                text: this.hero,
                font: res.RockSalt.toFont({size: 10, textAlign: ex.TextAlign.Left}),
                color: ex.Color.White,
            })
        );
    }
    updateRightText() {
        this.rightText.graphics.use(
            new ex.Text({
                text: `${this.life}\n${this.skill}\n${this.stamina}\n${this.grit}\n${this.optimism}`,
                font: res.RockSalt.toFont({size: 6, textAlign: ex.TextAlign.Right}),
                color: ex.Color.White,
            })
        );
    }
}

export class Demon extends ex.Actor {
    life: number;
    forgetfullness: number;
    pressure: number;
    skillResistance: number;
    gritResistance: number;
    demon: string;
    sprite: ex.Actor;
    leftText: ex.Actor;
    midText: ex.Actor;
    rightText: ex.Actor;
    smackImage: ex.ImageSource = res.smackGoodie;
    constructor() {
        super({width: 100, height: 120})
        this.sprite = new ex.Actor({offset: ex.vec(0, -36)});
        this.addChild(this.sprite);

        this.leftText = new ex.Actor({offset: ex.vec(-8, 30)});
        this.leftText.graphics.use(demonStatusText);
        this.addChild(this.leftText);

        this.midText = new ex.Actor({offset: ex.vec(0, 0)});
        this.addChild(this.midText);

        this.rightText = new ex.Actor({offset: ex.vec(52, 30)});
        this.addChild(this.rightText);

        this.demon = "Demon";
        this.life = 10; 
        this.forgetfullness = 1;
        this.pressure = 1;
        this.skillResistance = 0;
        this.gritResistance = 0;
    }
    smack(): void {
        let actor = new ex.Actor({offset: ex.vec(0, -36)});
        actor.graphics.add(this.smackImage.toSprite());
        this.sprite.addChild(actor);
        setTimeout(() => {
            if (actor.isActive) {
                actor.kill();
            }
        }, BLINK_TIME);
    }
    updateMidText() {
        this.midText.graphics.use(
            new ex.Text({
                text: this.demon,
                font: res.RockSalt.toFont({size: 10, textAlign: ex.TextAlign.Left}),
                color: ex.Color.White,
            })
        );
    }
    updateRightText() {
        this.rightText.graphics.use(
            new ex.Text({
                text: `${this.life}\n${this.forgetfullness}\n${this.pressure}\n${this.skillResistance}\n${this.gritResistance}`,
                font: res.RockSalt.toFont({size: 6, textAlign: ex.TextAlign.Right}),
                color: ex.Color.White,
            })
        );
    }
}

export class Biologist extends Character {
    constructor() {
        super();
        this.hero = "Biologist";
        this.level = 1;
        this.life = ATTACKER_LIFE; 
        this.maxLife = ATTACKER_LIFE;
        this.skill = 7;
        this.stamina = 3;
        this.grit = 3;
        this.optimism = 1;
        this.aliveImage = res.biologist
        this.deadImage = res.deadGreen;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
    levelUp(): SeniorBiologist {
        var seniorBiologist = new SeniorBiologist();
        seniorBiologist.life = this.life;
        if (seniorBiologist.life < 30) {
            seniorBiologist.life += 1;
        }
        seniorBiologist.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        return seniorBiologist;
    }
}

export class SeniorBiologist extends Character {
    constructor() {
        super();
        this.hero = "Senior Biologist";
        this.level = 2;
        this.life = ATTACKER_LIFE; 
        this.maxLife = ATTACKER_LIFE;
        this.skill = 8;
        this.stamina = 3;
        this.grit = 3;
        this.optimism = 1;
        this.aliveImage = res.seniorBiologist
        this.deadImage = res.deadGreen;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
    levelUp(): PrincipalScientist {
        var principalScientist = new PrincipalScientist();
        principalScientist.life = this.life;
        if (principalScientist.life < 30) {
            principalScientist.life += 1;
        }
        principalScientist.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        return principalScientist;
    }
}

export class PrincipalScientist extends Character {
    constructor() {
        super();
        this.hero = "Principal Scientist";
        this.level = 3;
        this.maxLevel = true;
        this.life = ATTACKER_LIFE;
        this.maxLife = ATTACKER_LIFE;
        this.skill = 10;
        this.stamina = 3;
        this.grit = 3;
        this.optimism = 1;
        this.aliveImage = res.principalScientist;
        this.deadImage = res.deadGreen;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
}

export class Pharmacist extends Character {
    constructor() {
        super();
        this.hero = "Pharmacist";
        this.level = 1;
        this.life = ATTACKER_LIFE;
        this.maxLife = ATTACKER_LIFE;
        this.skill = 3;
        this.stamina = 7;
        this.grit = 3;
        this.optimism = 1;
        this.aliveImage = res.pharmacist;
        this.deadImage = res.deadBlue;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
    levelUp(): DMPKScientist {
        var dmpkLead = new DMPKScientist();
        dmpkLead.life = this.life;
        if (dmpkLead.life < 30) {
            dmpkLead.life += 1;
        }
        dmpkLead.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        return dmpkLead;
    }
}

export class DMPKScientist extends Character {
    constructor() {
        super();
        this.hero = "DMPK Scientist";
        this.level = 2;
        this.life = ATTACKER_LIFE; 
        this.maxLife = ATTACKER_LIFE;
        this.skill = 3;
        this.stamina = 8;
        this.grit = 3;
        this.optimism = 1;
        this.aliveImage = res.dmpkScientist;
        this.deadImage = res.deadBlue;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
    levelUp(): DMPKLead {
        var dmpkLead = new DMPKLead();
        dmpkLead.life = this.life;
        if (dmpkLead.life < 30) {
            dmpkLead.life += 1;
        }
        dmpkLead.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        return dmpkLead;
    }
}

export class DMPKLead extends Character {
    constructor() {
        super();
        this.hero = "DMPK Lead";
        this.level = 3;
        this.maxLevel = true;
        this.life = ATTACKER_LIFE;
        this.maxLife = ATTACKER_LIFE;
        this.skill = 3;
        this.stamina = 10;
        this.grit = 3;
        this.optimism = 1;
        this.aliveImage = res.dmpkLead;
        this.deadImage = res.deadBlue;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
}

export class SoftwareEngineer extends Character {
    constructor() {
        super();
        this.hero = "Software Engineer";
        this.level = 1;
        this.life = ATTACKER_LIFE;
        this.maxLife = ATTACKER_LIFE;
        this.skill = 3;
        this.stamina = 1;
        this.grit = 3;
        this.optimism = 7;
        this.aliveImage = res.softwareEngineer;
        this.deadImage = res.deadBlue;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
    levelUp(): MLEngineer {
        var mlEngineer = new MLEngineer();
        mlEngineer.life = this.life;
        if (mlEngineer.life < 30) {
            mlEngineer.life += 1;
        }
        mlEngineer.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        return mlEngineer;
    }
}

export class MLEngineer extends Character {
    constructor() {
        super();
        this.hero = "ML Engineer";
        this.level = 2;
        this.life = ATTACKER_LIFE;
        this.maxLife = ATTACKER_LIFE;
        this.skill = 3;
        this.stamina = 1;
        this.grit = 3;
        this.optimism = 8;
        this.aliveImage = res.mlEngineer;
        this.deadImage = res.deadBlue;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
    levelUp(): StaffEngineer {
        var staffEngineer = new StaffEngineer();
        staffEngineer.life = this.life;
        if (staffEngineer.life < 30) {
            staffEngineer.life += 1;
        }
        staffEngineer.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        return staffEngineer;
    }
}

export class StaffEngineer extends Character {
    constructor() {
        super();
        this.hero = "Staff Engineer";
        this.level = 3;
        this.maxLevel = true;
        this.life = ATTACKER_LIFE;
        this.maxLife = ATTACKER_LIFE;
        this.skill = 3;
        this.stamina = 1;
        this.grit = 3;
        this.optimism = 10;
        this.aliveImage = res.staffEngineer;
        this.deadImage = res.deadBlue;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
}

export class DataScientist extends Character {
    constructor() {
        super();
        this.hero = "Data Scientist";
        this.level = 1;
        this.life = ATTACKER_LIFE;
        this.maxLife = ATTACKER_LIFE;
        this.skill = 3;
        this.stamina = 1;
        this.grit = 7;
        this.optimism = 3;
        this.aliveImage = res.dataScientist;
        this.deadImage = res.deadBrown;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
    levelUp(): AIScientist {
        var aiScientist = new AIScientist();
        aiScientist.life = this.life;
        if (aiScientist.life < 30) {
            aiScientist.life += 1;
        }
        aiScientist.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        return aiScientist;
    }
}

export class AIScientist extends Character {
    constructor() {
        super();
        this.hero = "AI Scientist";
        this.level = 2;
        this.life = ATTACKER_LIFE;
        this.maxLife = ATTACKER_LIFE;
        this.skill = 3;
        this.stamina = 1;
        this.grit = 8;
        this.optimism = 3;
        this.aliveImage = res.aiScientist;
        this.deadImage = res.deadBrown;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
    levelUp(): AIInfluencer {
        var aiInfluencer = new AIInfluencer();
        aiInfluencer.life = this.life;
        if (aiInfluencer.life < 30) {
            aiInfluencer.life += 1;
        }
        aiInfluencer.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        return aiInfluencer;
    }
}

export class AIInfluencer extends Character {
    constructor() {
        super();
        this.hero = "AI Influencer";
        this.level = 3;
        this.maxLevel = true;
        this.life = ATTACKER_LIFE;
        this.maxLife = ATTACKER_LIFE;
        this.skill = 3;
        this.stamina = 1;
        this.grit = 10;
        this.optimism = 3;
        this.aliveImage = res.aiInfluencer;
        this.deadImage = res.deadBrown;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
}

export class Operations extends Character {
    constructor() {
        super();
        this.hero = "Operations";
        this.level = 1;
        this.defender = true;
        this.life = DEFENDER_LIFE;
        this.maxLife = DEFENDER_LIFE;
        this.skill = 1;
        this.stamina = 10;
        this.grit = 1;
        this.optimism = 3;
        this.aliveImage = res.operations;
        this.deadImage = res.deadBrown;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
    levelUp(): Administrator {
        var administrator = new Administrator();
        administrator.life = this.life;
        if (administrator.life < 60) {
            administrator.life += 1;
        }
        administrator.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        return administrator;
    }
}

export class Administrator extends Character {
    constructor() {
        super();
        this.hero = "Administrator";
        this.level = 2;
        this.defender = true;
        this.life = DEFENDER_LIFE;
        this.maxLife = DEFENDER_LIFE;
        this.skill = 1;
        this.stamina = 12;
        this.grit = 1;
        this.optimism = 3;
        this.aliveImage = res.administrator;
        this.deadImage = res.deadBrown;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
    levelUp(): COO {
        var coo = new COO();
        coo.life = this.life;
        if (coo.life < 60) {
            coo.life += 1;
        }
        coo.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        return coo;
    }
}

export class COO extends Character {
    constructor() {
        super();
        this.hero = "COO";
        this.level = 3;
        this.maxLevel = true;
        this.defender = true;
        this.life = DEFENDER_LIFE;
        this.maxLife = DEFENDER_LIFE;
        this.skill = 1;
        this.stamina = 14;
        this.grit = 1;
        this.optimism = 3;
        this.aliveImage = res.coo;
        this.deadImage = res.deadBrown;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
}

export class Manager extends Character {
    constructor() {
        super();
        this.hero = "Manager";
        this.level = 1;
        this.defender = true;
        this.life = DEFENDER_LIFE;
        this.maxLife = DEFENDER_LIFE;
        this.skill = 1;
        this.stamina = 3;
        this.grit = 1;
        this.optimism = 10;
        this.aliveImage = res.manager;
        this.deadImage = res.deadGreen;

        this.sprite.graphics.use(res.manager.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
    levelUp(): Director {
        var director = new Director();
        director.life = this.life;
        if (director.life < 60) {
            director.life += 1;
        }
        director.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        return director;
    }
}

export class Director extends Character {
    constructor() {
        super();
        this.hero = "Director";
        this.level = 2;
        this.defender = true;
        this.life = DEFENDER_LIFE;
        this.maxLife = DEFENDER_LIFE;
        this.skill = 1;
        this.stamina = 3;
        this.grit = 1;
        this.optimism = 12;
        this.aliveImage = res.director;
        this.deadImage = res.deadGreen;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
    levelUp(): CEO {
        var ceo = new CEO();
        ceo.life = this.life;
        if (ceo.life < 60) {
            ceo.life += 1;
        }
        ceo.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
        return ceo;
    }
}

export class CEO extends Character {
    constructor() {
        super();
        this.hero = "CEO";
        this.level = 3;
        this.maxLevel = true;
        this.defender = true;
        this.life = DEFENDER_LIFE;
        this.maxLife = DEFENDER_LIFE;
        this.skill = 1;
        this.stamina = 3;
        this.grit = 1;
        this.optimism = 14;
        this.aliveImage = res.ceo;
        this.deadImage = res.deadGreen;

        this.sprite.graphics.use(this.aliveImage.toSprite());
        this.updateMidText();
        this.updateRightText();
    }
}

export class SampleContamination extends Demon {
    constructor() {
        super();
        this.demon = "Sample Contamination";
        this.life = 20; 
        this.forgetfullness = 10;
        this.pressure = 0;
        this.skillResistance = 0;
        this.gritResistance = 5;

        this.sprite.graphics.use(res.sampleContamination.toSprite({flipHorizontal: true}));
        this.updateMidText();
        this.updateRightText();
    }
}

export class BadStatistics extends Demon {
    constructor() {
        super();
        this.demon = "Bad Statistics";
        this.life = 30;
        this.forgetfullness = 14;
        this.pressure = 0;
        this.skillResistance = 0;
        this.gritResistance = 5;
        this.sprite.graphics.use(res.badStatistics.toSprite({flipHorizontal: true}));

        this.updateMidText();
        this.updateRightText();
    }
}

export class FalsifiedPriorStudies extends Demon {
    constructor() {
        super();
        this.demon = "Falsified Prior Studies";
        this.life = 40;
        this.forgetfullness = 20;
        this.pressure = 0;
        this.skillResistance = 0;
        this.gritResistance = 5;

        this.sprite.graphics.use(res.falsifiedPriorStudies.toSprite({flipHorizontal: true}));
        this.updateMidText();
        this.updateRightText();
    }
}

export class SleepDeprivation extends Demon {
    constructor() {
        super();
        this.demon = "Sleep Deprivation";
        this.life = 20; 
        this.forgetfullness = 0;
        this.pressure = 10;
        this.skillResistance = 5;
        this.gritResistance = 0;

        this.sprite.graphics.use(res.sleepDeprivation.toSprite({flipHorizontal: true}));
        this.updateMidText();
        this.updateRightText();
    }
}

export class BadRequirements extends Demon {
    constructor() {
        super();
        this.demon = "Bad Requirements";
        this.life = 30; 
        this.forgetfullness = 0;
        this.pressure = 14;
        this.skillResistance = 5;
        this.gritResistance = 0;

        this.sprite.graphics.use(res.badRequirements.toSprite({flipHorizontal: true}));
        this.updateMidText();
        this.updateRightText();
    }
}

export class Burnout extends Demon {
    constructor() {
        super();
        this.demon = "Burnout";
        this.life = 40; 
        this.forgetfullness = 0;
        this.pressure = 20;
        this.skillResistance = 5;
        this.gritResistance = 0;

        this.sprite.graphics.use(res.burnout.toSprite({flipHorizontal: true}));
        this.updateMidText();
        this.updateRightText();
    }
}

export class DirtyData extends Demon {
    constructor() {
        super();
        this.demon = "Dirty Data";
        this.life = 20; 
        this.forgetfullness = 6;
        this.pressure = 6;
        this.skillResistance = 1;
        this.gritResistance = 1;

        this.sprite.graphics.use(res.dirtyData.toSprite({flipHorizontal: true}));
        this.updateMidText();
        this.updateRightText();
    }
}

export class RealWorld extends Demon {
    constructor() {
        super();
        this.demon = "Real World";
        this.life = 30; 
        this.forgetfullness = 10;
        this.pressure = 10;
        this.skillResistance = 1;
        this.gritResistance = 1;

        this.sprite.graphics.use(res.realWorld.toSprite({flipHorizontal: true}));
        this.updateMidText();
        this.updateRightText();
    }
}

export class MarketShift extends Demon {
    constructor() {
        super();
        this.demon = "Market Shift";
        this.life = 40; 
        this.forgetfullness = 14;
        this.pressure = 14;
        this.skillResistance = 1;
        this.gritResistance = 1;

        this.sprite.graphics.use(res.marketShift.toSprite({flipHorizontal: true}));
        this.updateMidText();
        this.updateRightText();
    }
}
