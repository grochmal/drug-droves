import * as ex from "excalibur";
import * as char from "./character";
import * as grid from "./grid";

const rand = new ex.Random();
const monstersLv1 = [char.SampleContamination, char.SleepDeprivation, char.DirtyData];
const monstersLv2 = [char.BadStatistics, char.BadRequirements, char.RealWorld];
const monstersLv3 = [char.FalsifiedPriorStudies, char.Burnout, char.MarketShift];

function randomMonsterLv1(): typeof char.Demon {
    return rand.pickOne(monstersLv1);
}
function randomMonsterLv2(): typeof char.Demon {
    return rand.pickOne(monstersLv2);
}
function randomMonsterLv3(): typeof char.Demon {
    return rand.pickOne(monstersLv3);
}

function battle0(difficulty: number): void {
    grid.demon0Pos.addDemon(randomMonsterLv1());
    grid.demon2Pos.addDemon(randomMonsterLv1());
    grid.demon6Pos.addDemon(randomMonsterLv1());
    if (difficulty > 3) {
        grid.demon3Pos.addDemon(randomMonsterLv1());
    }
    if (difficulty > 10) {
        grid.demon4Pos.addDemon(randomMonsterLv1());
    }
}
function battle1(difficulty: number): void {
    grid.demon0Pos.addDemon(randomMonsterLv1());
    grid.demon2Pos.addDemon(randomMonsterLv1());
    grid.demon6Pos.addDemon(randomMonsterLv2());
    if (difficulty > 6) {
        grid.demon3Pos.addDemon(randomMonsterLv1());
    }
    if (difficulty > 12) {
        grid.demon7Pos.addDemon(randomMonsterLv2());
    }
}
function battle2(difficulty: number): void {
    grid.demon0Pos.addDemon(randomMonsterLv2());
    grid.demon2Pos.addDemon(randomMonsterLv2());
    grid.demon3Pos.addDemon(randomMonsterLv1());
    grid.demon6Pos.addDemon(randomMonsterLv2());
    if (difficulty > 8) {
        grid.demon4Pos.addDemon(randomMonsterLv2());
    }
    if (difficulty > 16) {
        grid.demon7Pos.addDemon(randomMonsterLv3());
    }
}
function battle3(difficulty: number): void {
    grid.demon0Pos.addDemon(randomMonsterLv2());
    grid.demon2Pos.addDemon(randomMonsterLv2());
    grid.demon3Pos.addDemon(randomMonsterLv1());
    grid.demon6Pos.addDemon(randomMonsterLv3());
    if (difficulty > 3) {
        grid.demon4Pos.addDemon(randomMonsterLv2());
    }
    if (difficulty > 11) {
        grid.demon7Pos.addDemon(randomMonsterLv3());
    }
}
function battle4(difficulty: number): void {
    grid.demon0Pos.addDemon(randomMonsterLv2());
    grid.demon2Pos.addDemon(randomMonsterLv2());
    grid.demon3Pos.addDemon(randomMonsterLv2());
    grid.demon4Pos.addDemon(randomMonsterLv1());
    grid.demon6Pos.addDemon(randomMonsterLv3());
    if (difficulty > 5) {
        grid.demon5Pos.addDemon(randomMonsterLv3());
    }
    if (difficulty > 18) {
        grid.demon7Pos.addDemon(randomMonsterLv3());
    }
}
function battle5(difficulty: number): void {
    grid.demon0Pos.addDemon(randomMonsterLv3());
    grid.demon2Pos.addDemon(randomMonsterLv2());
    grid.demon3Pos.addDemon(randomMonsterLv2());
    grid.demon4Pos.addDemon(randomMonsterLv1());
    grid.demon6Pos.addDemon(randomMonsterLv3());
    if (difficulty > 1) {
        grid.demon5Pos.addDemon(randomMonsterLv2());
    }
    if (difficulty > 7) {
        grid.demon7Pos.addDemon(randomMonsterLv3());
    }
}
function battle6(difficulty: number): void {
    grid.demon0Pos.addDemon(randomMonsterLv3());
    grid.demon2Pos.addDemon(randomMonsterLv3());
    grid.demon3Pos.addDemon(randomMonsterLv2());
    grid.demon4Pos.addDemon(randomMonsterLv2());
    grid.demon5Pos.addDemon(randomMonsterLv1());
    grid.demon6Pos.addDemon(randomMonsterLv3());
    if (difficulty > 4) {
        grid.demon7Pos.addDemon(randomMonsterLv2());
    }
    if (difficulty > 17) {
        grid.demon1Pos.addDemon(randomMonsterLv3());
    }
}
export const battleOrder = [
    battle0,
    battle1,
    battle2,
    battle3,
    battle4,
    battle5,
    battle6,
];
