import * as ex from "excalibur";
import * as res from "./resources";
import {moveToBattlePhase} from "./main";
import { battleOrder } from "./battle";

const tints: ex.Color[] = [
    ex.Color.fromHex("#440154"),
    ex.Color.fromHex("#481567"),

    ex.Color.fromHex("#482677"),
    ex.Color.fromHex("#453781"),
    ex.Color.fromHex("#404788"),

    ex.Color.fromHex("#39568c"),
    ex.Color.fromHex("#33638d"),
    ex.Color.fromHex("#2d708e"),
    ex.Color.fromHex("#277d8e"),
    ex.Color.fromHex("#238a8d"),

    ex.Color.fromHex("#1f968b"),
    ex.Color.fromHex("#20a387"),
    ex.Color.fromHex("#29af7f"),
    ex.Color.fromHex("#3cbb75"),
    ex.Color.fromHex("#55c667"),

    ex.Color.fromHex("#73d055"),
    ex.Color.fromHex("#95d840"),
    ex.Color.fromHex("#b8de29"),
    ex.Color.fromHex("#dce319"),
    ex.Color.fromHex("#fde725"),
];
class Drug extends ex.Actor {
    tint: ex.Color;
    isLit: boolean = false;
    constructor(offset: ex.Vector, tint: ex.Color) {
        super({
            offset: offset,
            width: 50,
            height: 30,
        });
        this.tint = tint;
        this.graphics.use(res.ball.toSprite({tint: this.tint, opacity: 0.1}));
    }
    light() {
        this.isLit = true;
        this.graphics.use(res.ball.toSprite({tint: this.tint, opacity: 1}));
    }
    putOut() {
        this.isLit = false;
        this.graphics.use(res.ball.toSprite({tint: this.tint, opacity: 0.1}));
    } 
}
class RightPanel extends ex.Actor {
    drugs: Drug[] = [];
    constructor() {
        super({
            pos: ex.vec(775, 0),
            width: 50,
            height: 600,
        });
        tints.forEach((color, index) => {
            var drug = new Drug(ex.vec(0, 15 + index * 30), color);
            this.drugs.push(drug);
            this.addChild(drug);
        });
    }
}
export const rightPanel = new RightPanel();
export function currentDifficulty(): number {
    return rightPanel.drugs.filter(d => d.isLit).length;
}
export function winDrug(): number {
    const rand = new ex.Random();
    const unlitDrugs = rightPanel.drugs.filter(d => !d.isLit);
    if (unlitDrugs.length > 0) {
        const currDrug = rand.pickOne(unlitDrugs);
        currDrug.light();
    }
    return rightPanel.drugs.filter(d => !d.isLit).length;
}
export function resetDrugs(): void {
    rightPanel.drugs.forEach(d => d.putOut());
}

class Torch extends ex.Actor {
    lit: boolean = false;
    constructor(pos: ex.Vector) {
        super({
            pos: pos,
            width: 50,
            height: 30,
        });
        this.graphics.use(res.torchBare.toSprite());
    }
    light() {
        this.lit = true;
        this.graphics.use(res.torchLit.toSprite());
    }
    putOut() {
        this.lit = false;
        this.graphics.use(res.torchBare.toSprite());
    }
}
class LeftPanel extends ex.Actor {
    torches: Torch[] = [];
    constructor() {
        super({
            pos: ex.vec(25, 75),
            width: 50,
            height: 600,
        });
        for (let i = 0; i < battleOrder.length; i++) {
            const torch = new Torch(ex.vec(0, 45 + i * 60));
            this.torches.push(torch);
            this.addChild(torch);
        }
    }
}
export const leftPanel = new LeftPanel();
export function currentBattle(): number {
    return leftPanel.torches.filter(t => t.lit).length;
}
export function winBattle(): void {
    const currBattle = leftPanel.torches.find(t => !t.lit);
    if (currBattle) {
        currBattle.light();
    }
}
export function resetTorches(): void {
    leftPanel.torches.forEach(t => t.putOut());
}

class PrepPhase extends ex.Actor {
    constructor(offset: ex.Vector) {
        super({
            pos: offset,
            width: 100,
            height: 100,
        });
    }
    show() {
        this.graphics.use(res.laurel.toSprite());
    }
    hide() {
        this.graphics.hide();
    }
}
class PrepPhaseLabel extends ex.Actor {
    text: ex.Text;
    constructor(offset: ex.Vector) {
        super({
            offset: offset,
            width: 100,
            height: 100,
        });
        this.text = new ex.Text({
            text: "Prep Phase\n\nDone:",
            font: res.RockSalt.toFont({size: 12, textAlign: ex.TextAlign.Left}),
            color: ex.Color.White,
        });
    }
    show() {
        this.graphics.use(this.text);
    }
    hide() {
        this.graphics.hide();
    }
}
class PrepPhaseButton extends ex.Actor {
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
                const midPanel = this.parent as MidPanel;
                moveToBattlePhase();
            });
        }, 100);
    }
}
class BattlePhase extends ex.Actor {
    constructor(offset: ex.Vector) {
        super({
            offset: offset,
            width: 100,
            height: 100,
        });
    }
    show() {
        this.graphics.use(res.axe.toSprite());
    }
    hide() {
        this.graphics.hide();
    }
}
class BattlePhaseLabel extends ex.Actor {
    text: ex.Text;
    constructor(offset: ex.Vector) {
        super({
            offset: offset,
            width: 100,
            height: 100,
        });
        this.text = new ex.Text({
            text: "Battle Phase",
            font: res.RockSalt.toFont({size: 12, textAlign: ex.TextAlign.Left}),
            color: ex.Color.White,
        });
    }
    show() {
        this.graphics.use(this.text);
    }
    hide() {
        this.graphics.hide();
    }
}
class UpgradePhase extends ex.Actor {
    constructor(offset: ex.Vector) {
        super({
            offset: offset,
            width: 100,
            height: 100,
        });
    }
    show() {
        this.graphics.use(res.armor.toSprite());
    }
    hide() {
        this.graphics.hide();
    }
}
class UpgradePhaseLabel extends ex.Actor {
    text: ex.Text;
    constructor(offset: ex.Vector) {
        super({
            offset: offset,
            width: 100,
            height: 100,
        });
        this.text = new ex.Text({
            text: "Upgrade Phase",
            font: res.RockSalt.toFont({size: 12, textAlign: ex.TextAlign.Left}),
            color: ex.Color.White,
        });
    }
    show() {
        this.graphics.use(this.text);
    }
    hide() {
        this.graphics.hide();
    }
}
class MidPanel extends ex.Actor {
    prepPhase: PrepPhase;
    prepPhaseLabel: PrepPhaseLabel;
    prepPhaseButton: PrepPhaseButton | null = null;
    battlePhase: BattlePhase;
    battlePhaseLabel: BattlePhaseLabel;
    upgradePhase: UpgradePhase;
    upgradePhaseLabel: UpgradePhaseLabel;
    constructor() {
        super({
            pos: ex.vec(330, 300),
            width: 100,
            height: 600,
        });
        this.prepPhase = new PrepPhase(ex.vec(0, -180));
        this.prepPhaseLabel = new PrepPhaseLabel(ex.vec(0, -120));
        this.battlePhase = new BattlePhase(ex.vec(0, -20));
        this.battlePhaseLabel = new BattlePhaseLabel(ex.vec(0, 30));
        this.upgradePhase = new UpgradePhase(ex.vec(0, 160));
        this.upgradePhaseLabel = new UpgradePhaseLabel(ex.vec(0, 200));
        this.addChild(this.prepPhase);
        this.addChild(this.prepPhaseLabel);
        this.addChild(this.battlePhase);
        this.addChild(this.battlePhaseLabel);
        this.addChild(this.upgradePhase);
        this.addChild(this.upgradePhaseLabel);
    }
    moveToPrepPhase(): void {
        this.prepPhase.show();
        this.prepPhaseLabel.show();
        this.battlePhase.hide();
        this.battlePhaseLabel.hide();
        this.upgradePhase.hide();
        this.upgradePhaseLabel.hide();
        this.prepPhaseButton = new PrepPhaseButton(ex.vec(10, -107));
        this.addChild(this.prepPhaseButton);
    }
    moveToBattlePhase(): void {
        this.prepPhase.hide();
        this.prepPhaseLabel.hide();
        this.battlePhase.show();
        this.battlePhaseLabel.show();
        this.upgradePhase.hide();
        this.upgradePhaseLabel.hide();
        if (this.prepPhaseButton) {
            this.prepPhaseButton.kill();
            this.prepPhaseButton = null;
        }
    }
    moveToUpgradePhase(): void {
        this.prepPhase.hide();
        this.prepPhaseLabel.hide();
        this.battlePhase.hide();
        this.battlePhaseLabel.hide();
        this.upgradePhase.show();
        this.upgradePhaseLabel.show();
        if (this.prepPhaseButton) {
            this.prepPhaseButton.kill();
            this.prepPhaseButton = null;
        }
    }
}
export const midPanel = new MidPanel();
