import * as ex from "excalibur";

export const loader = new ex.Loader();

import RockSaltFont from "./RockSalt-Regular.ttf";
export const RockSalt = new ex.FontSource(RockSaltFont, "rocksalt")
loader.addResource(RockSalt);

import BackgroundThemeMusic from "./background-music.mp3";
export const backgroundMusic = new ex.Sound(BackgroundThemeMusic);
loader.addResource(backgroundMusic);

import HitSound from "./res-hit.wav";
export const hitSound = new ex.Sound(HitSound);
loader.addResource(hitSound);

import ExplosionSound from "./res-explosion.wav";
export const explosionSound = new ex.Sound(ExplosionSound);
loader.addResource(explosionSound);

import BallSprite from "./img/ball.png";
export const ball = new ex.ImageSource(BallSprite);
loader.addResource(ball);

import TorchBareSprite from "./img/torch-bare.png";
export const torchBare = new ex.ImageSource(TorchBareSprite);
loader.addResource(torchBare);

import TorchLitSprite from "./img/torch-lit.png";
export const torchLit = new ex.ImageSource(TorchLitSprite);
loader.addResource(torchLit);

import LaurelSprite from "./img/laurel.png";
export const laurel = new ex.ImageSource(LaurelSprite);
loader.addResource(laurel);

import AxeSprite from "./img/axe.png";
export const axe = new ex.ImageSource(AxeSprite);
loader.addResource(axe);

import ArmorSprite from "./img/armor.png";
export const armor = new ex.ImageSource(ArmorSprite);
loader.addResource(armor);

import SmackBadieSprite from "./img/smack-baddie.png";
export const smackBadie = new ex.ImageSource(SmackBadieSprite);
loader.addResource(smackBadie);

import SmackGoodieSprite from "./img/smack-goodie.png";
export const smackGoodie = new ex.ImageSource(SmackGoodieSprite);
loader.addResource(smackGoodie);

import DeadBlueSprite from "./img/dead-blue.png";
export const deadBlue = new ex.ImageSource(DeadBlueSprite);
loader.addResource(deadBlue);

import DeadBrownSprite from "./img/dead-brown.png";
export const deadBrown = new ex.ImageSource(DeadBrownSprite);
loader.addResource(deadBrown);

import DeadGreenSprite from "./img/dead-green.png";
export const deadGreen = new ex.ImageSource(DeadGreenSprite);
loader.addResource(deadGreen);

import BiologistSprite from "./img/biologist.png";
export const biologist = new ex.ImageSource(BiologistSprite);
loader.addResource(biologist);

import SeniorBiologistSprite from "./img/senior-biologist.png";
export const seniorBiologist = new ex.ImageSource(SeniorBiologistSprite);
loader.addResource(seniorBiologist);

import PrincipalScientistSprite from "./img/principal-scientist.png";
export const principalScientist = new ex.ImageSource(PrincipalScientistSprite);
loader.addResource(principalScientist);

import PharmacistSprite from "./img/pharmacist.png";
export const pharmacist = new ex.ImageSource(PharmacistSprite);
loader.addResource(pharmacist);

import DMPKScientistSprite from "./img/dmpk-scientist.png";
export const dmpkScientist = new ex.ImageSource(DMPKScientistSprite);
loader.addResource(dmpkScientist);

import DMPKLeadSprite from "./img/dmpk-lead.png";
export const dmpkLead = new ex.ImageSource(DMPKLeadSprite);
loader.addResource(dmpkLead);

import SoftwareEngineerSprite from "./img/software-engineer.png";
export const softwareEngineer = new ex.ImageSource(SoftwareEngineerSprite);
loader.addResource(softwareEngineer);

import MLEnginerSprite from "./img/ml-engineer.png";
export const mlEngineer = new ex.ImageSource(MLEnginerSprite);
loader.addResource(mlEngineer);

import StaffEngineerSprite from "./img/staff-engineer.png";
export const staffEngineer = new ex.ImageSource(StaffEngineerSprite);
loader.addResource(staffEngineer);

import DataScientistSprite from "./img/data-scientist.png";
export const dataScientist = new ex.ImageSource(DataScientistSprite);
loader.addResource(dataScientist);

import AIScientistSprite from "./img/ai-scientist.png";
export const aiScientist = new ex.ImageSource(AIScientistSprite);
loader.addResource(aiScientist);

import AIInfluencerSprite from "./img/ai-influencer.png";
export const aiInfluencer = new ex.ImageSource(AIInfluencerSprite);
loader.addResource(aiInfluencer);

import OperationsSprite from "./img/operations.png";
export const operations = new ex.ImageSource(OperationsSprite);
loader.addResource(operations);

import AdministratorSprite from "./img/administrator.png";
export const administrator = new ex.ImageSource(AdministratorSprite);
loader.addResource(administrator);

import COOSprite from "./img/coo.png";
export const coo = new ex.ImageSource(COOSprite);
loader.addResource(coo);

import ManagerSprite from "./img/manager.png";
export const manager = new ex.ImageSource(ManagerSprite);
loader.addResource(manager);

import DirectorSprite from "./img/director.png";
export const director = new ex.ImageSource(DirectorSprite);
loader.addResource(director);

import CEOSprite from "./img/ceo.png";
export const ceo = new ex.ImageSource(CEOSprite);
loader.addResource(ceo);

import SampleContaminationSprite from "./img/sample-contamination.png";
export const sampleContamination = new ex.ImageSource(SampleContaminationSprite);
loader.addResource(sampleContamination);

import BadStatisticsSprite from "./img/bad-statistics.png";
export const badStatistics = new ex.ImageSource(BadStatisticsSprite);
loader.addResource(badStatistics);

import FalsifiedPriorStudiesSprite from "./img/falsified-prior-studies.png";
export const falsifiedPriorStudies = new ex.ImageSource(FalsifiedPriorStudiesSprite);
loader.addResource(falsifiedPriorStudies);

import SleepDepreivationSprite from "./img/sleep-deprivation.png";
export const sleepDeprivation = new ex.ImageSource(SleepDepreivationSprite);
loader.addResource(sleepDeprivation);

import BadRequirementsSprite from "./img/bad-requirements.png";
export const badRequirements = new ex.ImageSource(BadRequirementsSprite);
loader.addResource(badRequirements);

import BurnoutSprite from "./img/burnout.png";
export const burnout = new ex.ImageSource(BurnoutSprite);
loader.addResource(burnout);

import DirtyDataSprite from "./img/dirty-data.png";
export const dirtyData = new ex.ImageSource(DirtyDataSprite);
loader.addResource(dirtyData);

import RealWorldSprite from "./img/real-world.png";
export const realWorld = new ex.ImageSource(RealWorldSprite);
loader.addResource(realWorld);

import MarketShiftSprite from "./img/market-shift.png";
export const marketShift = new ex.ImageSource(MarketShiftSprite);
loader.addResource(marketShift);
