import * as ex from "excalibur";
import * as char from "./character";
import * as res from "./resources";
import { BLINK_TIME, NUM_BLINKS, FULL_ATTACK_TIME } from "./constants";
import { checkIfBattleOver, moveToBattlePhase } from "./main";

const heroSetup: (typeof char.Character)[] = [
    char.Biologist,
    char.Pharmacist,
    char.SoftwareEngineer,
    char.DataScientist,
    char.Operations,
    char.Manager,
];
class NextHero extends ex.Actor {
    constructor(offset: ex.Vector) {
        super({
            offset: offset,
            collider: new ex.CircleCollider({radius: 15, offset: offset})
        });
        this.graphics.use(res.ball.toSprite());
        // prevent bubbling
        setTimeout(() => {
            if (this == null) {
                return;
            }
            this.on("pointerdown", (evt: ex.PointerEvent) => {
                const heroPosition = this.parent as HeroPosition;
                heroPosition.nextHero();
            });
        }, 100);
    }
}
class PreviousHero extends ex.Actor {
    constructor(offset: ex.Vector) {
        super({
            offset: offset,
            collider: new ex.CircleCollider({radius: 15, offset: offset}),
        });
        this.graphics.use(res.ball.toSprite());
        this.on("pointerdown", (evt: ex.PointerEvent) => {
            const heroPosition = this.parent as HeroPosition;
            heroPosition.previousHero();
        });
    }
}
class LevelUpHero extends ex.Actor {
    constructor(offset: ex.Vector) {
        super({
            offset: offset,
            collider: new ex.CircleCollider({radius: 15, offset: offset}),
        });
        this.graphics.use(res.ball.toSprite());
        setTimeout(() => {
            this.on("pointerdown", (evt: ex.PointerEvent) => {
                const parent = this.parent as HeroPosition;
                console.log("Leveling up hero at position", parent.pos);
                const heroPosition = this.parent as HeroPosition;
                heroPosition.levelUpHero();
                moveToBattlePhase();
            });
        }, 100);
    }
}
class HeroPosition extends ex.Actor {
    heroClass: typeof char.Character;
    hero: char.Character;
    nextHeroButton: NextHero | null = null;
    previousHeroButton: PreviousHero | null = null;
    levelUpButton: LevelUpHero | null = null;
    constructor(pos: ex.Vector, heroClass: typeof char.Character) {
        super({
            pos: pos,
            width: 80,
            height: 120,
        });
        this.heroClass = heroClass;
        this.hero = new this.heroClass();
        this.addChild(this.hero);
        this.addNextPreviousButtons();
    }
    addNextPreviousButtons(): void {
        this.removeNextPreviousButtons();
        this.nextHeroButton = new NextHero(ex.vec(40, -30));
        this.addChild(this.nextHeroButton);
        this.previousHeroButton = new PreviousHero(ex.vec(-40, -30));
        this.addChild(this.previousHeroButton);
    }
    removeNextPreviousButtons(): void {
        if (this.nextHeroButton) {
            this.nextHeroButton.kill();
            this.nextHeroButton = null;
        }
        if (this.previousHeroButton) {
            this.previousHeroButton.kill();
            this.previousHeroButton = null;
        }
    }
    nextHero(): void {
        let nextHeroClassIndex = heroSetup.indexOf(this.heroClass) + 1;
        if (nextHeroClassIndex >= heroSetup.length) {
            nextHeroClassIndex = 0;
        }
        this.heroClass = heroSetup[nextHeroClassIndex];
        this.hero.kill();
        this.hero = new this.heroClass();
        this.addChild(this.hero);
    }
    previousHero(): void {
        let previousHeroClassIndex = heroSetup.indexOf(this.heroClass) - 1;
        if (previousHeroClassIndex < 0) {
            previousHeroClassIndex = heroSetup.length - 1;
        }
        this.hero.kill();
        this.heroClass = heroSetup[previousHeroClassIndex];
        this.hero = new this.heroClass();
        this.addChild(this.hero);
    }
    levelUpHero(): void {
        let hero = this.hero.levelUp();
        this.hero.kill();
        this.hero = hero;
        this.addChild(this.hero);
        clearUpgradeButtons();
    }
    addLevelUpButton(): void {
        if (this.hero.alive && !this.hero.maxLevel) {
            this.removeLevelUpButton();
            this.levelUpButton = new LevelUpHero(ex.vec(0, -30));
            this.addChild(this.levelUpButton);
        }
    }
    removeLevelUpButton(): void {
        if (this.levelUpButton) {
            this.levelUpButton.kill();
            this.levelUpButton = null;
        }
    }
    resetToPrepPhase(): void {
        this.removeNextPreviousButtons();
        this.removeLevelUpButton();
        if (this.hero) {
            this.hero.kill();
        }
        this.hero = new this.heroClass();
        this.addChild(this.hero);
        this.addNextPreviousButtons();
    }
}

export const hero0Pos = new HeroPosition(ex.vec(160, 100), char.Biologist);
export const hero1Pos = new HeroPosition(ex.vec(100, 240), char.Pharmacist);
export const hero2Pos = new HeroPosition(ex.vec(160, 380), char.Manager);
export const hero3Pos = new HeroPosition(ex.vec(100, 520), char.DataScientist);
export const heroPositions = [
    hero0Pos,
    hero1Pos,
    hero2Pos,
    hero3Pos
];
export function clearPrepButtons(): void {
    for (let heroPosition of heroPositions) {
        heroPosition.removeNextPreviousButtons();
    }
}
export function clearUpgradeButtons(): void {
    for (let heroPosition of heroPositions) {
        heroPosition.removeLevelUpButton();
    }
}
export function addUpgradeButtons(): void {
    for (let heroPosition of heroPositions) {
        heroPosition.addLevelUpButton();
    }
}
export function resetToPrepPhase(): void {
    for (let heroPosition of heroPositions) {
        heroPosition.resetToPrepPhase();
    }
}
export function healAllHeroes(): void {
    for (let heroPosition of heroPositions) {
        heroPosition.hero.fullHeal();
        heroPosition.hero.updateRightText();
    }
}

export class DemonPosition extends ex.Actor {
    demon: char.Demon | null = null;
    constructor(pos: ex.Vector) {
        super({
            pos: pos,
            width: 100,
            height: 120,
        });
    }
    addDemon(demonClass: typeof char.Demon): void {
        if (this.demon) {
            this.demon.kill();
        }
        this.demon = new demonClass();
        this.addChild(this.demon);
    }
}

export const demon0Pos = new DemonPosition(ex.vec(480, 100));
export const demon1Pos = new DemonPosition(ex.vec(480, 310));
export const demon2Pos = new DemonPosition(ex.vec(480, 520));

export const demon3Pos = new DemonPosition(ex.vec(580, 200));
export const demon4Pos = new DemonPosition(ex.vec(580, 420));

export const demon5Pos = new DemonPosition(ex.vec(680, 100));
export const demon6Pos = new DemonPosition(ex.vec(680, 310));
export const demon7Pos = new DemonPosition(ex.vec(680, 520));

export const demonPositions = [
    demon0Pos,
    demon1Pos,
    demon2Pos,
    demon3Pos,
    demon4Pos,
    demon5Pos,
    demon6Pos,
    demon7Pos
];

export function clearAllDemons(): void {
    for (let demonPosition of demonPositions) {
        if (demonPosition.demon) {
            demonPosition.demon.kill();
            demonPosition.demon = null;
        }
    }
}

function demonAttackHero(demon: char.Demon, chars: HeroPosition[]): number {
    chars = chars.filter((heroPosition) => heroPosition.hero.alive);
    if (chars.length === 0) {
        console.log("No heroes left to attack.");
        return 0;
    }
    if (demon.forgetfullness === 0) {
        // attacks using pressure
        chars.sort((a, b) => {return a.hero.optimism > b.hero.optimism ? -1 : 1;});
        var charToAttack = chars[0];
        var attackValue = Math.max(0, demon.pressure - charToAttack.hero.optimism);
    } else {
        // attacks using forgetfullness
        chars.sort((a, b) => {return a.hero.stamina > b.hero.stamina ? -1 : 1;});
        var charToAttack = chars[0];
        var attackValue = Math.max(0, demon.forgetfullness - charToAttack.hero.stamina);
    }
    charToAttack.hero.life -= attackValue;
    charToAttack.hero.smack();
    res.hitSound.play();
    charToAttack.hero.updateRightText();
    if (charToAttack.hero.life <= 0) {
        res.explosionSound.play();
        charToAttack.hero.killCharacter();
    }
    return attackValue;
}

export function addDemonClickHandlers(): void {
    for (let demonPosition of demonPositions) {
        demonPosition.on("pointerdown", (evt: ex.PointerEvent) => {
            clearDemonClickHandlers();
            if (demonPosition.demon) {
                console.log("Demon clicked at position", demonPosition.pos);
                demonPosition.demon.sprite.actions.blink(BLINK_TIME, BLINK_TIME, NUM_BLINKS);
                var demonHit = 0
                for (let heroPosition of heroPositions) {
                    if (heroPosition.hero.alive && !heroPosition.hero.defender) {
                        heroPosition.hero.sprite.actions.moveBy(20, 0, BLINK_TIME);
                        heroPosition.hero.sprite.actions.moveBy(-20, 0, BLINK_TIME);
                        demonPosition.demon.smack();
                        res.hitSound.play();
                        demonHit += heroPosition.hero.attack(demonPosition.demon);
                    }
                }
                demonPosition.demon.life -= demonHit;
                demonPosition.demon.updateRightText();
                if (demonPosition.demon.life <= 0) {
                    demonPosition.demon.kill();
                    demonPosition.demon = null;
                }
                setTimeout(() => {
                    for (let demonPosition of demonPositions) {
                        if (demonPosition.demon) {
                            demonPosition.demon.sprite.actions.moveBy(-20, 0, BLINK_TIME);
                            demonPosition.demon.sprite.actions.moveBy(20, 0, BLINK_TIME);
                            demonAttackHero(demonPosition.demon, heroPositions);
                        }
                    }
                    checkIfBattleOver();
                }, BLINK_TIME);
            }
            setTimeout(addDemonClickHandlers, FULL_ATTACK_TIME);
        });
    }
}
export function clearDemonClickHandlers(): void {
    for (let demonPosition of demonPositions) {
        demonPosition.off("pointerdown");
    }
}

class ExplanationPane extends ex.Actor {
    prepText: ex.Text;
    upgradeText: ex.Text;
    winRoundText: ex.Text;
    winAllText: ex.Text;
    defeatText: ex.Text;
    constructor(pos: ex.Vector) {
        super({
            pos: pos,
            width: 400,
            height: 500,
            // debug
            color: ex.Color.fromHex("#1f2a3b")
        });
        this.prepText = new ex.Text({
            text: "Thrive through a round of Drug Discovery Droves\n\n" + 
            "Select your team (of 4 heroes):\n\n" +
            "* Biologist: Great at dealing with scientific challenges.\n" +
            "  Fragile on its own.\n\n" +
            "* Pharmacist: Balanced between offense and defense\n" +
            "  against scientific challenges.\n\n" +
            "* Software Engineer: Great at dealing with chores\n" +
            "  and technical challenges.  Fragile on its own.\n\n" +
            "* Data Scientist: Balanced between offense and defense\n" +
            "  against technical challenges and chores.\n\n" +
            "* Operations: Does not attack the problem directly,\n" +
            "  but defends the team from scientific hazards.\n\n" +
            "* Manager: Does not attack the problem directly,\n" +
            "  but defends the team from too many chores.\n\n" +
            "Click the done button to begin a round of seven\n" +
            "increasingly difficult challenges.\n" +
            "On each challenge click the demon to deal with first.\n" +
            "But be aware that the demons fight back!\n\n" +
            "After each completed round of seven battles you will\n" +
            "be awarded with one of twenty viable drug targets.\n" +
            "Investigate, go forth, and good luck!",
            font: res.RockSalt.toFont({size: 10, textAlign: ex.TextAlign.Left}),
            color: ex.Color.White
        });
        this.upgradeText = new ex.Text({
            text: "You won!\n\n" +
            "Before the next battle take a moment\n" +
            "to upgrade your heroes.\n" +
            "Click on one of your heroes to level them up.\n" +
            "Each level increases their\n" +
            "effectiveness in battle.\n" +
            "Be strategic about your upgrades!",
            font: res.RockSalt.toFont({size: 12, textAlign: ex.TextAlign.Left}),
            color: ex.Color.White
        });
        this.winRoundText = new ex.Text({
            text: "You won!\n\n" +
            "Congratulations! You have successfully\n" +
            "completed a round of Drug Discovery Droves.\n\n" +
            "A new drug target has been revealed!\n" +
            "The next round will be even more challenging!",
            font: res.RockSalt.toFont({size: 12, textAlign: ex.TextAlign.Left}),
            color: ex.Color.White,
        });
        this.winAllText = new ex.Text({
            text: "You won!\n\n" +
            "Congratulations! You have successfully\n" +
            "completed all rounds of Drug Discovery Droves.\n" +
            "You have proven your prowess in drug discovery!\n\n" +
            "The world is a better place\n" +
            "because of your efforts.\n" +
            "Thank you for playing!",
            font: res.RockSalt.toFont({size: 12, textAlign: ex.TextAlign.Left}),
            color: ex.Color.White,
        });
        this.defeatText = new ex.Text({
            text: "Things didn't go as planned\n\n" +
            "Unfortunately, you were unable to\n" +
            "complete the round of Drug Discovery Droves.\n\n" +
            "But don't be discouraged! You can try again\n" +
            "and improve your strategy.\n\n" +
            "Good luck next time!",
            font: res.RockSalt.toFont({size: 12, textAlign: ex.TextAlign.Left}),
            color: ex.Color.White,
        });
    }
    showPrep(): void {
        this.graphics.use(this.prepText);
    }
    showUpgrade(): void {
        this.graphics.use(this.upgradeText);
    }
    showWinRound(): void {
        this.graphics.use(this.winRoundText);
    }
    showWinAll(): void {
        this.graphics.use(this.winAllText);
    }
    showDefeat(): void {
        this.graphics.use(this.defeatText);
    }
    hide(): void {
        this.graphics.hide();
    }
}

export const explanationPane = new ExplanationPane(ex.vec(580, 300));
