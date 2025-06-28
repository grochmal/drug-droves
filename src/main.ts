import * as ex from "excalibur";
import * as res from "./resources";
import * as grid from "./grid";
import * as battle from "./battle";
import * as menu from "./menu";

const game = new ex.Engine({
    canvasElementId: "game",
    width: 800,
    height: 600,
    backgroundColor: ex.Color.fromHex("#151721"),
    pixelArt: true,
    displayMode: ex.DisplayMode.FitScreen,
});

game.add(grid.hero0Pos);
game.add(grid.hero1Pos);
game.add(grid.hero2Pos);
game.add(grid.hero3Pos);

game.add(grid.demon0Pos);
game.add(grid.demon1Pos);
game.add(grid.demon2Pos);
game.add(grid.demon3Pos);
game.add(grid.demon4Pos);
game.add(grid.demon5Pos);
game.add(grid.demon6Pos);
game.add(grid.demon7Pos);

game.add(grid.explanationPane);

game.add(menu.rightPanel);
game.add(menu.leftPanel);
game.add(menu.midPanel);

function resetGameToPrepPhase(): void {
    grid.clearPrepButtons();
    grid.clearUpgradeButtons();
    grid.explanationPane.hide();

    menu.midPanel.moveToPrepPhase();
    menu.resetTorches();
    grid.resetToPrepPhase();
    grid.explanationPane.showPrep();
}

export function moveToBattlePhase(): void {
    console.log("Moving to battle phase.");
    grid.clearPrepButtons();
    grid.clearUpgradeButtons();
    grid.explanationPane.hide();
    menu.midPanel.moveToBattlePhase();
    let currentBattle = menu.currentBattle();
    if (currentBattle >= battle.battleOrder.length) {
        console.log("End of battles reached.");
        return;
    }
    battle.battleOrder[currentBattle](menu.currentDifficulty());
    grid.clearDemonClickHandlers();
    grid.addDemonClickHandlers();
}

function moveToUpgradePhase(): void {
    console.log("Moving to upgrade phase.");
    grid.clearPrepButtons();
    grid.clearUpgradeButtons();
    grid.explanationPane.hide();

    grid.healAllHeroes();
    grid.addUpgradeButtons();
    grid.explanationPane.showUpgrade();

    menu.midPanel.moveToUpgradePhase();
}

function moveToFinishPhase(): void {
    console.log("Moving to finish phase.");
    grid.clearPrepButtons();
    grid.clearUpgradeButtons();
    grid.explanationPane.hide();

    let drugsLeftToWin = menu.winDrug();
    if (drugsLeftToWin === 0) {
        grid.explanationPane.showWinAll();
        // prevent bubbling
        setTimeout(() => {
            game.input.pointers.once("down", () => {
                menu.resetDrugs();
                resetGameToPrepPhase();
            });
        }, 2000);
    } else {
        grid.explanationPane.showWinRound();
        // prevent bubbling
        setTimeout(() => {
            game.input.pointers.once("down", () => {
                resetGameToPrepPhase();
            });
        }, 2000);
    }
}

function moveToDefeatPhase(): void {
    console.log("Moving to defeat phase.");
    grid.clearPrepButtons();
    grid.clearUpgradeButtons();
    grid.explanationPane.hide();

    grid.clearAllDemons();
    grid.explanationPane.showDefeat();
    // prevent bubbling
    setTimeout(() => {
        game.input.pointers.once("down", () => {
            resetGameToPrepPhase();
        });
    }, 2000);
}

function nextBattle(): number | null {
    let currentBattle = menu.currentBattle();
    console.log("Current battle:", currentBattle);
    if (currentBattle >= battle.battleOrder.length) {
        return null;
    }
    return currentBattle;
}
export function checkIfBattleOver(): void {
    if (grid.demonPositions.filter(d => d.demon).length === 0) {
        menu.winBattle();
        let next = nextBattle();
        console.log("Next battle:", next);
        if (next === null) {
            moveToFinishPhase();
        } else {
            moveToUpgradePhase();
        }   
    }
    if (grid.heroPositions.filter(h => h.hero.alive).length === 0) {
        moveToDefeatPhase();
    }
}

resetGameToPrepPhase();
game.start(res.loader).then(() => {
    console.log("Game started.");
    res.backgroundMusic.play(0.2);
});
