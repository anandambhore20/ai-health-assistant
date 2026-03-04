import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Thermometer, 
  Brain, 
  Heart, 
  Activity as Lungs, 
  Beef as Stomach, 
  Bone, 
  User, 
  Eye, 
  Droplets,
  Palette as Skin,
  ChevronDown,
  ChevronUp,
  Search
} from "lucide-react";
import SeverityScale from "./SeverityScale";

export interface SymptomData {
  // General/Constitutional
  fever: { severity: number; temperature: string; pattern: string; duration: string; };
  chills: { severity: number; };
  rigors: { severity: number; };
  nightSweats: { severity: number; frequency: string; };
  excessiveSweating: { severity: number; };
  coldIntolerance: { severity: number; };
  heatIntolerance: { severity: number; };
  fatigue: { energyLevel: number; pattern: string[]; dailyImpact: number; };
  weakness: { severity: number; location: string[]; };
  malaise: { severity: number; };
  weightChanges: { type: string; amount: string; timePeriod: string; appetite: number; };
  excessiveThirst: { severity: number; };
  excessiveHunger: { severity: number; };
  sleepDisturbances: { severity: number; type: string[]; };
  energyFluctuations: { severity: number; };
  
  // Neurological/Nervous System
  headache: { severity: number; type: string[]; location: string[]; duration: string; triggers: string[]; associated: string[]; };
  migraines: { severity: number; frequency: string; triggers: string[]; };
  dizziness: { severity: number; type: string; triggers: string[]; duration: string; };
  lightheadedness: { severity: number; };
  balanceProblems: { severity: number; };
  fainting: { frequency: string; triggers: string[]; };
  nearFainting: { severity: number; };
  cognitive: { severity: number; affected: string[]; dailyImpact: number; };
  confusion: { severity: number; };
  brainFog: { severity: number; };
  speechProblems: { severity: number; type: string[]; };
  seizures: { type: string; frequency: string; description: string; };
  tremors: { severity: number; location: string[]; };
  numbness: { severity: number; location: string[]; pattern: string; };
  tingling: { severity: number; location: string[]; };
  burningSensations: { severity: number; location: string[]; };
  muscleTwitching: { severity: number; location: string[]; };
  muscleWeakness: { severity: number; location: string[]; };
  paralysis: { severity: number; location: string[]; };
  coordinationProblems: { severity: number; };
  restlessLegs: { severity: number; };
  sleepWalking: { frequency: string; };
  nightmares: { frequency: string; };
  hallucinations: { type: string[]; severity: number; };
  blackouts: { frequency: string; };
  photophobia: { severity: number; };
  phonophobia: { severity: number; };
  
  // Cardiovascular/Circulatory
  chestPain: { severity: number; type: string[]; location: string[]; triggers: string[]; duration: string; associated: string[]; };
  palpitations: { severity: number; pattern: string; triggers: string[]; duration: string; };
  tachycardia: { severity: number; };
  bradycardia: { severity: number; };
  irregularHeartbeat: { severity: number; };
  skippedHeartbeats: { severity: number; };
  heartRacingExertion: { severity: number; };
  chestTightness: { severity: number; };
  chestBurning: { severity: number; };
  radiatingPain: { severity: number; location: string[]; };
  breathlessness: { severity: number; triggers: string[]; associated: string[]; };
  breathlessRest: { severity: number; };
  difficultyBreathingFlat: { severity: number; };
  swelling: { severity: number; location: string[]; pattern: string; };
  coldExtremities: { severity: number; };
  cyanosis: { severity: number; location: string[]; };
  varicoseVeins: { severity: number; };
  easyBruising: { severity: number; };
  bleedingTendencies: { severity: number; };
  
  // Respiratory/Pulmonary
  cough: { severity: number; type: string; sputum: string[]; timing: string[]; duration: string; };
  coughWithBlood: { severity: number; };
  chronicCough: { severity: number; };
  morningCough: { severity: number; };
  nightCough: { severity: number; };
  shortnessBreath: { severity: number; };
  difficultyBreathing: { severity: number; };
  wheezing: { severity: number; timing: string[]; };
  chestCongestion: { severity: number; };
  soreThroat: { severity: number; associated: string[]; duration: string; };
  hoarseVoice: { severity: number; };
  runnyNose: { severity: number; };
  stuffyNose: { severity: number; };
  sinusPressure: { severity: number; };
  postNasalDrip: { severity: number; };
  sneezing: { severity: number; };
  lossOfSmell: { severity: number; };
  nosebleeds: { frequency: string; };
  difficultySwallowing: { severity: number; };
  lumpInThroat: { severity: number; };
  excessiveMucus: { severity: number; };
  sleepApnea: { severity: number; };
  
  // Gastrointestinal/Digestive
  nausea: { severity: number; timing: string[]; associated: string[]; };
  vomiting: { frequency: string; content: string[]; timing: string[]; };
  vomitingBlood: { severity: number; };
  abdominalPain: { severity: number; location: string[]; type: string[]; timing: string[]; associated: string[]; };
  stomachPain: { severity: number; };
  cramping: { severity: number; location: string[]; };
  bloating: { severity: number; };
  gasFlatus: { severity: number; };
  belching: { severity: number; };
  heartburn: { severity: number; triggers: string[]; timing: string[]; };
  indigestion: { severity: number; };
  dysphagia: { severity: number; };
  odynophagia: { severity: number; };
  lossAppetite: { severity: number; };
  earlySatiety: { severity: number; };
  diarrhea: { frequency: string; consistency: string; duration: string; associated: string[]; };
  constipation: { severity: string; duration: string; associated: string[]; };
  bowelHabitChanges: { type: string[]; };
  bloodInStool: { severity: number; };
  blackStools: { severity: number; };
  paleStools: { severity: number; };
  mucusInStool: { severity: number; };
  urgentDefecation: { severity: number; };
  incompleteEvacuation: { severity: number; };
  analPain: { severity: number; };
  hemorrhoids: { severity: number; };
  rectalBleeding: { severity: number; };
  jaundice: { severity: number; };
  
  // Genitourinary/Kidney-Bladder
  painfulUrination: { severity: number; };
  burningUrination: { severity: number; };
  frequentUrination: { severity: number; };
  urgentUrination: { severity: number; };
  difficultyStartingUrination: { severity: number; };
  weakUrineStream: { severity: number; };
  interruptedUrineStream: { severity: number; };
  bloodInUrine: { severity: number; };
  darkUrine: { severity: number; };
  cloudyUrine: { severity: number; };
  foamyUrine: { severity: number; };
  strongSmellingUrine: { severity: number; };
  excessiveUrination: { severity: number; };
  decreasedUrination: { severity: number; };
  inabilityUrinate: { severity: number; };
  incontinence: { severity: number; };
  nocturia: { severity: number; };
  kidneyPain: { severity: number; };
  bladderPain: { severity: number; };
  pelvicPain: { severity: number; };
  
  // Female Reproductive/Gynecological
  menstrualIrregularities: { type: string[]; };
  menstrualChanges: { lastPeriod: string; regularity: string; daysLate: string; flowChanges: string; };
  missedPeriods: { duration: string; };
  heavyPeriods: { severity: number; };
  lightPeriods: { severity: number; };
  painfulPeriods: { severity: number; };
  bleedingBetweenPeriods: { severity: number; };
  postMenopausalBleeding: { severity: number; };
  vaginalDischarge: { type: string; odor: string; };
  vaginalItching: { severity: number; };
  vaginalDryness: { severity: number; };
  painWithIntercourse: { severity: number; };
  breastTenderness: { severity: number; };
  breastLumps: { severity: number; };
  breastDischarge: { severity: number; };
  hotFlashes: { severity: number; frequency: string; };
  pregnancySymptoms: { 
    missedPeriod: string; morningSickness: number; breastChanges: string[]; 
    frequentUrination: number; fatigue: number; foodChanges: string[]; 
    moodChanges: number; implantationBleeding: string; pelvicPressure: number; 
  };
  
  // Male Reproductive/Urological
  testicularPain: { severity: number; };
  scrotalSwelling: { severity: number; };
  erectileDysfunction: { severity: number; };
  prematureEjaculation: { severity: number; };
  delayedEjaculation: { severity: number; };
  decreasedLibido: { severity: number; };
  penileDischarge: { severity: number; };
  penilePain: { severity: number; };
  bloodInSemen: { severity: number; };
  prostateSymptoms: { severity: number; type: string[]; };
  
  // Musculoskeletal/Orthopedic
  jointPain: { severity: number; location: string[]; stiffness: number; swelling: string[]; pattern: string; };
  jointSwelling: { severity: number; location: string[]; };
  jointStiffness: { severity: number; timing: string[]; };
  morningStiffness: { severity: number; duration: string; };
  backPain: { severity: number; location: string; type: string[]; radiation: string[]; triggers: string[]; };
  neckPain: { severity: number; };
  shoulderPain: { severity: number; };
  elbowPain: { severity: number; };
  wristPain: { severity: number; };
  handPain: { severity: number; };
  hipPain: { severity: number; };
  kneePain: { severity: number; };
  anklePain: { severity: number; };
  footPain: { severity: number; };
  heelPain: { severity: number; };
  musclePain: { severity: number; location: string[]; type: string; triggers: string[]; };
  muscleCramps: { severity: number; location: string[]; };
  muscleSpasms: { severity: number; location: string[]; };
  muscleStiffness: { severity: number; };
  bonePain: { severity: number; location: string[]; };
  growingPains: { severity: number; };
  limitedRangeMotion: { severity: number; location: string[]; };
  difficultyWalking: { severity: number; };
  limping: { severity: number; };
  
  // Dermatological/Skin
  skinRash: { severity: number; type: string[]; location: string[]; };
  itchySkin: { severity: number; location: string[]; };
  drySkin: { severity: number; };
  oilySkin: { severity: number; };
  acne: { severity: number; };
  skinColorChanges: { type: string[]; location: string[]; };
  newMoles: { number: number; changes: string[]; };
  changingMoles: { severity: number; changes: string[]; };
  skinLesions: { type: string[]; location: string[]; };
  bumpsOnSkin: { severity: number; location: string[]; };
  blisters: { severity: number; location: string[]; };
  hives: { severity: number; };
  skinBurning: { severity: number; location: string[]; };
  skinSensitivity: { severity: number; };
  slowWoundHealing: { severity: number; };
  skinInfections: { type: string[]; location: string[]; };
  hairLoss: { severity: number; pattern: string[]; };
  excessiveHairGrowth: { severity: number; location: string[]; };
  nailChanges: { type: string[]; };
  
  // Endocrine/Hormonal
  temperatureRegulation: { severity: number; type: string[]; };
  growthProblems: { type: string[]; };
  developmentalDelays: { type: string[]; };
  sexualDevelopment: { issues: string[]; };
  thyroidSymptoms: { type: string[]; severity: number; };
  diabetesSymptoms: { type: string[]; severity: number; };
  adrenalSymptoms: { type: string[]; severity: number; };
  hormonalImbalances: { type: string[]; severity: number; };
  metabolicChanges: { type: string[]; severity: number; };
  
  // Psychiatric/Mental Health
  depression: { severity: number; };
  anxiety: { severity: number; type: string[]; };
  panicAttacks: { frequency: string; severity: number; };
  moodSwings: { severity: number; };
  irritability: { severity: number; };
  stress: { severity: number; };
  fears: { type: string[]; severity: number; };
  obsessiveThoughts: { severity: number; };
  compulsiveBehaviors: { severity: number; };
  eatingDisorders: { type: string[]; severity: number; };
  attentionProblems: { severity: number; };
  hyperactivity: { severity: number; };
  socialWithdrawal: { severity: number; };
  suicidalThoughts: { severity: number; };
  selfHarmThoughts: { severity: number; };
  substanceUse: { type: string[]; severity: number; };
  
  // Eye/Vision
  visionChanges: { severity: number; type: string[]; };
  blurredVision: { severity: number; };
  doubleVision: { severity: number; };
  visionLoss: { severity: number; location: string[]; };
  blindSpots: { severity: number; };
  halosAroundLights: { severity: number; };
  flashingLights: { severity: number; };
  eyePain: { severity: number; };
  eyeRedness: { severity: number; };
  eyeDischarge: { severity: number; };
  itchyEyes: { severity: number; };
  wateryEyes: { severity: number; };
  dryEyes: { severity: number; };
  lightSensitivity: { severity: number; };
  nightBlindness: { severity: number; };
  colorVisionProblems: { severity: number; };
  bulgingEyes: { severity: number; };
  droopingEyelids: { severity: number; };
  eyeFloaters: { severity: number; };
  
  // Ear/Hearing
  hearingLoss: { severity: number; type: string; };
  tinnitus: { severity: number; type: string; };
  earPain: { severity: number; };
  earDischarge: { severity: number; };
  earFullness: { severity: number; };
  itchyEars: { severity: number; };
  earBalanceProblems: { severity: number; };
  
  // Hematologic/Blood
  easyBleeding: { severity: number; };
  easeBruising: { severity: number; };
  prolongedBleeding: { severity: number; };
  swollenLymphNodes: { severity: number; location: string[]; };
  unexplainedLumps: { severity: number; location: string[]; };
  frequentInfections: { severity: number; type: string[]; };
  poorWoundHealing: { severity: number; };
  anemiaSymptoms: { severity: number; type: string[]; };
  bloodClots: { severity: number; location: string[]; };
  
  // Immune/Allergic
  recurrentInfections: { severity: number; type: string[]; };
  recurrentFever: { severity: number; };
  allergicReactions: { severity: number; triggers: string[]; };
  foodAllergies: { severity: number; foods: string[]; };
  environmentalAllergies: { severity: number; triggers: string[]; };
  medicationAllergies: { severity: number; medications: string[]; };
  autoimmune: { severity: number; symptoms: string[]; };
  chronicFatigue: { severity: number; };
  
  // Sleep-Related
  difficultyFallingAsleep: { severity: number; };
  frequentAwakening: { severity: number; };
  earlyMorningAwakening: { severity: number; };
  unrefreshingSleep: { severity: number; };
  snoring: { severity: number; };
  sleepApneaSx: { severity: number; };
  restlessSleep: { severity: number; };
  sleepWalkingFreq: { frequency: string; };
  nightTerrors: { frequency: string; };
  excessiveDaytimeSleepiness: { severity: number; };
  narcolepsySymptoms: { severity: number; };
  
  // Pediatric-Specific
  developmentalDelaysPed: { type: string[]; severity: number; };
  growthConcerns: { type: string[]; severity: number; };
  feedingProblems: { severity: number; type: string[]; };
  cryingFussiness: { severity: number; pattern: string; };
  behavioralProblems: { type: string[]; severity: number; };
  schoolPerformance: { severity: number; areas: string[]; };
  socialDifficulties: { severity: number; type: string[]; };
  bedwetting: { frequency: string; age: number; };
}

interface ComprehensiveSymptomsProps {
  symptomData: SymptomData;
  onSymptomDataChange: (data: SymptomData) => void;
  patientGender: string;
  pregnancyStatus: string;
}

const defaultSymptomData: SymptomData = {
  // General/Constitutional defaults
  fever: { severity: 0, temperature: "", pattern: "", duration: "" },
  chills: { severity: 0 },
  rigors: { severity: 0 },
  nightSweats: { severity: 0, frequency: "" },
  excessiveSweating: { severity: 0 },
  coldIntolerance: { severity: 0 },
  heatIntolerance: { severity: 0 },
  fatigue: { energyLevel: 0, pattern: [], dailyImpact: 0 },
  weakness: { severity: 0, location: [] },
  malaise: { severity: 0 },
  weightChanges: { type: "", amount: "", timePeriod: "", appetite: 5 },
  excessiveThirst: { severity: 0 },
  excessiveHunger: { severity: 0 },
  sleepDisturbances: { severity: 0, type: [] },
  energyFluctuations: { severity: 0 },
  
  // Neurological defaults
  headache: { severity: 0, type: [], location: [], duration: "", triggers: [], associated: [] },
  migraines: { severity: 0, frequency: "", triggers: [] },
  dizziness: { severity: 0, type: "", triggers: [], duration: "" },
  lightheadedness: { severity: 0 },
  balanceProblems: { severity: 0 },
  fainting: { frequency: "", triggers: [] },
  nearFainting: { severity: 0 },
  cognitive: { severity: 0, affected: [], dailyImpact: 0 },
  confusion: { severity: 0 },
  brainFog: { severity: 0 },
  speechProblems: { severity: 0, type: [] },
  seizures: { type: "", frequency: "", description: "" },
  tremors: { severity: 0, location: [] },
  numbness: { severity: 0, location: [], pattern: "" },
  tingling: { severity: 0, location: [] },
  burningSensations: { severity: 0, location: [] },
  muscleTwitching: { severity: 0, location: [] },
  muscleWeakness: { severity: 0, location: [] },
  paralysis: { severity: 0, location: [] },
  coordinationProblems: { severity: 0 },
  restlessLegs: { severity: 0 },
  sleepWalking: { frequency: "" },
  nightmares: { frequency: "" },
  hallucinations: { type: [], severity: 0 },
  blackouts: { frequency: "" },
  photophobia: { severity: 0 },
  phonophobia: { severity: 0 },
  
  // Cardiovascular defaults
  chestPain: { severity: 0, type: [], location: [], triggers: [], duration: "", associated: [] },
  palpitations: { severity: 0, pattern: "", triggers: [], duration: "" },
  tachycardia: { severity: 0 },
  bradycardia: { severity: 0 },
  irregularHeartbeat: { severity: 0 },
  skippedHeartbeats: { severity: 0 },
  heartRacingExertion: { severity: 0 },
  chestTightness: { severity: 0 },
  chestBurning: { severity: 0 },
  radiatingPain: { severity: 0, location: [] },
  breathlessness: { severity: 0, triggers: [], associated: [] },
  breathlessRest: { severity: 0 },
  difficultyBreathingFlat: { severity: 0 },
  swelling: { severity: 0, location: [], pattern: "" },
  coldExtremities: { severity: 0 },
  cyanosis: { severity: 0, location: [] },
  varicoseVeins: { severity: 0 },
  easyBruising: { severity: 0 },
  bleedingTendencies: { severity: 0 },
  
  // Respiratory defaults
  cough: { severity: 0, type: "", sputum: [], timing: [], duration: "" },
  coughWithBlood: { severity: 0 },
  chronicCough: { severity: 0 },
  morningCough: { severity: 0 },
  nightCough: { severity: 0 },
  shortnessBreath: { severity: 0 },
  difficultyBreathing: { severity: 0 },
  wheezing: { severity: 0, timing: [] },
  chestCongestion: { severity: 0 },
  soreThroat: { severity: 0, associated: [], duration: "" },
  hoarseVoice: { severity: 0 },
  runnyNose: { severity: 0 },
  stuffyNose: { severity: 0 },
  sinusPressure: { severity: 0 },
  postNasalDrip: { severity: 0 },
  sneezing: { severity: 0 },
  lossOfSmell: { severity: 0 },
  nosebleeds: { frequency: "" },
  difficultySwallowing: { severity: 0 },
  lumpInThroat: { severity: 0 },
  excessiveMucus: { severity: 0 },
  sleepApnea: { severity: 0 },
  
  // All other systems with defaults...
  nausea: { severity: 0, timing: [], associated: [] },
  vomiting: { frequency: "", content: [], timing: [] },
  vomitingBlood: { severity: 0 },
  abdominalPain: { severity: 0, location: [], type: [], timing: [], associated: [] },
  stomachPain: { severity: 0 },
  cramping: { severity: 0, location: [] },
  bloating: { severity: 0 },
  gasFlatus: { severity: 0 },
  belching: { severity: 0 },
  heartburn: { severity: 0, triggers: [], timing: [] },
  indigestion: { severity: 0 },
  dysphagia: { severity: 0 },
  odynophagia: { severity: 0 },
  lossAppetite: { severity: 0 },
  earlySatiety: { severity: 0 },
  diarrhea: { frequency: "", consistency: "", duration: "", associated: [] },
  constipation: { severity: "", duration: "", associated: [] },
  bowelHabitChanges: { type: [] },
  bloodInStool: { severity: 0 },
  blackStools: { severity: 0 },
  paleStools: { severity: 0 },
  mucusInStool: { severity: 0 },
  urgentDefecation: { severity: 0 },
  incompleteEvacuation: { severity: 0 },
  analPain: { severity: 0 },
  hemorrhoids: { severity: 0 },
  rectalBleeding: { severity: 0 },
  jaundice: { severity: 0 },
  
  // Genitourinary defaults
  painfulUrination: { severity: 0 },
  burningUrination: { severity: 0 },
  frequentUrination: { severity: 0 },
  urgentUrination: { severity: 0 },
  difficultyStartingUrination: { severity: 0 },
  weakUrineStream: { severity: 0 },
  interruptedUrineStream: { severity: 0 },
  bloodInUrine: { severity: 0 },
  darkUrine: { severity: 0 },
  cloudyUrine: { severity: 0 },
  foamyUrine: { severity: 0 },
  strongSmellingUrine: { severity: 0 },
  excessiveUrination: { severity: 0 },
  decreasedUrination: { severity: 0 },
  inabilityUrinate: { severity: 0 },
  incontinence: { severity: 0 },
  nocturia: { severity: 0 },
  kidneyPain: { severity: 0 },
  bladderPain: { severity: 0 },
  pelvicPain: { severity: 0 },
  
  // Female reproductive defaults
  menstrualIrregularities: { type: [] },
  menstrualChanges: { lastPeriod: "", regularity: "", daysLate: "", flowChanges: "" },
  missedPeriods: { duration: "" },
  heavyPeriods: { severity: 0 },
  lightPeriods: { severity: 0 },
  painfulPeriods: { severity: 0 },
  bleedingBetweenPeriods: { severity: 0 },
  postMenopausalBleeding: { severity: 0 },
  vaginalDischarge: { type: "", odor: "" },
  vaginalItching: { severity: 0 },
  vaginalDryness: { severity: 0 },
  painWithIntercourse: { severity: 0 },
  breastTenderness: { severity: 0 },
  breastLumps: { severity: 0 },
  breastDischarge: { severity: 0 },
  hotFlashes: { severity: 0, frequency: "" },
  pregnancySymptoms: { 
    missedPeriod: "", morningSickness: 0, breastChanges: [], frequentUrination: 0, 
    fatigue: 0, foodChanges: [], moodChanges: 0, implantationBleeding: "", pelvicPressure: 0 
  },
  
  // Male reproductive defaults
  testicularPain: { severity: 0 },
  scrotalSwelling: { severity: 0 },
  erectileDysfunction: { severity: 0 },
  prematureEjaculation: { severity: 0 },
  delayedEjaculation: { severity: 0 },
  decreasedLibido: { severity: 0 },
  penileDischarge: { severity: 0 },
  penilePain: { severity: 0 },
  bloodInSemen: { severity: 0 },
  prostateSymptoms: { severity: 0, type: [] },
  
  // Musculoskeletal defaults
  jointPain: { severity: 0, location: [], stiffness: 0, swelling: [], pattern: "" },
  jointSwelling: { severity: 0, location: [] },
  jointStiffness: { severity: 0, timing: [] },
  morningStiffness: { severity: 0, duration: "" },
  backPain: { severity: 0, location: "", type: [], radiation: [], triggers: [] },
  neckPain: { severity: 0 },
  shoulderPain: { severity: 0 },
  elbowPain: { severity: 0 },
  wristPain: { severity: 0 },
  handPain: { severity: 0 },
  hipPain: { severity: 0 },
  kneePain: { severity: 0 },
  anklePain: { severity: 0 },
  footPain: { severity: 0 },
  heelPain: { severity: 0 },
  musclePain: { severity: 0, location: [], type: "", triggers: [] },
  muscleCramps: { severity: 0, location: [] },
  muscleSpasms: { severity: 0, location: [] },
  muscleStiffness: { severity: 0 },
  bonePain: { severity: 0, location: [] },
  growingPains: { severity: 0 },
  limitedRangeMotion: { severity: 0, location: [] },
  difficultyWalking: { severity: 0 },
  limping: { severity: 0 },
  
  // Dermatological defaults
  skinRash: { severity: 0, type: [], location: [] },
  itchySkin: { severity: 0, location: [] },
  drySkin: { severity: 0 },
  oilySkin: { severity: 0 },
  acne: { severity: 0 },
  skinColorChanges: { type: [], location: [] },
  newMoles: { number: 0, changes: [] },
  changingMoles: { severity: 0, changes: [] },
  skinLesions: { type: [], location: [] },
  bumpsOnSkin: { severity: 0, location: [] },
  blisters: { severity: 0, location: [] },
  hives: { severity: 0 },
  skinBurning: { severity: 0, location: [] },
  skinSensitivity: { severity: 0 },
  slowWoundHealing: { severity: 0 },
  skinInfections: { type: [], location: [] },
  hairLoss: { severity: 0, pattern: [] },
  excessiveHairGrowth: { severity: 0, location: [] },
  nailChanges: { type: [] },
  
  // Endocrine defaults
  temperatureRegulation: { severity: 0, type: [] },
  growthProblems: { type: [] },
  developmentalDelays: { type: [] },
  sexualDevelopment: { issues: [] },
  thyroidSymptoms: { type: [], severity: 0 },
  diabetesSymptoms: { type: [], severity: 0 },
  adrenalSymptoms: { type: [], severity: 0 },
  hormonalImbalances: { type: [], severity: 0 },
  metabolicChanges: { type: [], severity: 0 },
  
  // Psychiatric defaults
  depression: { severity: 0 },
  anxiety: { severity: 0, type: [] },
  panicAttacks: { frequency: "", severity: 0 },
  moodSwings: { severity: 0 },
  irritability: { severity: 0 },
  stress: { severity: 0 },
  fears: { type: [], severity: 0 },
  obsessiveThoughts: { severity: 0 },
  compulsiveBehaviors: { severity: 0 },
  eatingDisorders: { type: [], severity: 0 },
  attentionProblems: { severity: 0 },
  hyperactivity: { severity: 0 },
  socialWithdrawal: { severity: 0 },
  suicidalThoughts: { severity: 0 },
  selfHarmThoughts: { severity: 0 },
  substanceUse: { type: [], severity: 0 },
  
  // Eye/Vision defaults
  visionChanges: { severity: 0, type: [] },
  blurredVision: { severity: 0 },
  doubleVision: { severity: 0 },
  visionLoss: { severity: 0, location: [] },
  blindSpots: { severity: 0 },
  halosAroundLights: { severity: 0 },
  flashingLights: { severity: 0 },
  eyePain: { severity: 0 },
  eyeRedness: { severity: 0 },
  eyeDischarge: { severity: 0 },
  itchyEyes: { severity: 0 },
  wateryEyes: { severity: 0 },
  dryEyes: { severity: 0 },
  lightSensitivity: { severity: 0 },
  nightBlindness: { severity: 0 },
  colorVisionProblems: { severity: 0 },
  bulgingEyes: { severity: 0 },
  droopingEyelids: { severity: 0 },
  eyeFloaters: { severity: 0 },
  
  // Ear/Hearing defaults
  hearingLoss: { severity: 0, type: "" },
  tinnitus: { severity: 0, type: "" },
  earPain: { severity: 0 },
  earDischarge: { severity: 0 },
  earFullness: { severity: 0 },
  itchyEars: { severity: 0 },
  earBalanceProblems: { severity: 0 },
  
  // Hematologic defaults
  easyBleeding: { severity: 0 },
  easeBruising: { severity: 0 },
  prolongedBleeding: { severity: 0 },
  swollenLymphNodes: { severity: 0, location: [] },
  unexplainedLumps: { severity: 0, location: [] },
  frequentInfections: { severity: 0, type: [] },
  poorWoundHealing: { severity: 0 },
  anemiaSymptoms: { severity: 0, type: [] },
  bloodClots: { severity: 0, location: [] },
  
  // Immune/Allergic defaults
  recurrentInfections: { severity: 0, type: [] },
  recurrentFever: { severity: 0 },
  allergicReactions: { severity: 0, triggers: [] },
  foodAllergies: { severity: 0, foods: [] },
  environmentalAllergies: { severity: 0, triggers: [] },
  medicationAllergies: { severity: 0, medications: [] },
  autoimmune: { severity: 0, symptoms: [] },
  chronicFatigue: { severity: 0 },
  
  // Sleep-Related defaults
  difficultyFallingAsleep: { severity: 0 },
  frequentAwakening: { severity: 0 },
  earlyMorningAwakening: { severity: 0 },
  unrefreshingSleep: { severity: 0 },
  snoring: { severity: 0 },
  sleepApneaSx: { severity: 0 },
  restlessSleep: { severity: 0 },
  sleepWalkingFreq: { frequency: "" },
  nightTerrors: { frequency: "" },
  excessiveDaytimeSleepiness: { severity: 0 },
  narcolepsySymptoms: { severity: 0 },
  
  // Pediatric defaults
  developmentalDelaysPed: { type: [], severity: 0 },
  growthConcerns: { type: [], severity: 0 },
  feedingProblems: { severity: 0, type: [] },
  cryingFussiness: { severity: 0, pattern: "" },
  behavioralProblems: { type: [], severity: 0 },
  schoolPerformance: { severity: 0, areas: [] },
  socialDifficulties: { severity: 0, type: [] },
  bedwetting: { frequency: "", age: 0 }
};

const ComprehensiveSymptoms = ({ symptomData, onSymptomDataChange, patientGender, pregnancyStatus }: ComprehensiveSymptomsProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const updateSymptom = (category: keyof SymptomData, field: string, value: any) => {
    const updated = {
      ...symptomData,
      [category]: {
        ...symptomData[category],
        [field]: value
      }
    };
    onSymptomDataChange(updated);
  };

  const toggleArrayValue = (category: keyof SymptomData, field: string, value: string) => {
    const current = symptomData[category][field] as string[];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateSymptom(category, field, updated);
  };

  const getActiveSymptomCount = () => {
    let count = 0;
    
    // Count symptoms with severity > 0
    if (symptomData.fever.severity > 0) count++;
    if (symptomData.fatigue.energyLevel > 0) count++;
    if (symptomData.nightSweats.severity > 0) count++;
    if (symptomData.headache.severity > 0) count++;
    if (symptomData.dizziness.severity > 0) count++;
    if (symptomData.cognitive.severity > 0) count++;
    if (symptomData.numbness.severity > 0) count++;
    if (symptomData.chestPain.severity > 0) count++;
    if (symptomData.palpitations.severity > 0) count++;
    if (symptomData.breathlessness.severity > 0) count++;
    if (symptomData.swelling.severity > 0) count++;
    if (symptomData.cough.severity > 0) count++;
    if (symptomData.soreThroat.severity > 0) count++;
    if (symptomData.wheezing.severity > 0) count++;
    if (symptomData.runnyNose.severity > 0) count++;
    if (symptomData.nausea.severity > 0) count++;
    if (symptomData.abdominalPain.severity > 0) count++;
    if (symptomData.heartburn.severity > 0) count++;
    if (symptomData.jointPain.severity > 0) count++;
    if (symptomData.musclePain.severity > 0) count++;
    if (symptomData.backPain.severity > 0) count++;
    if (symptomData.skinRash.severity > 0) count++;
    if (symptomData.painfulUrination.severity > 0) count++;
    if (symptomData.visionChanges.severity > 0) count++;
    
    // Count other active symptoms
    if (symptomData.vomiting.frequency && symptomData.vomiting.frequency !== '') count++;
    if (symptomData.diarrhea.frequency && symptomData.diarrhea.frequency !== '') count++;
    if (symptomData.constipation.severity && symptomData.constipation.severity !== '') count++;
    if (symptomData.seizures.type && symptomData.seizures.type !== '') count++;
    
    // Count pregnancy symptoms if applicable
    if ((patientGender === 'female' && pregnancyStatus !== 'not-pregnant') || pregnancyStatus === 'possibly-pregnant' || pregnancyStatus === 'confirmed-pregnant') {
      if (symptomData.pregnancySymptoms.morningSickness > 0) count++;
      if (symptomData.pregnancySymptoms.frequentUrination > 0) count++;
      if (symptomData.pregnancySymptoms.fatigue > 0) count++;
      if (symptomData.pregnancySymptoms.moodChanges > 0) count++;
      if (symptomData.pregnancySymptoms.pelvicPressure > 0) count++;
    }
    
    return count;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-blue-600" />
            <span>Comprehensive Symptom Assessment</span>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {getActiveSymptomCount()} Active Symptoms
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* General/Constitutional Symptoms */}
        <Collapsible>
          <CollapsibleTrigger 
            onClick={() => toggleSection('general')}
            className="flex items-center justify-between w-full p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-orange-600" />
              <span className="font-medium">General/Constitutional Symptoms</span>
            </div>
            {expandedSections.includes('general') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-6">
            {/* Fever */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Fever</h4>
              <SeverityScale
                label="Fever Severity"
                value={symptomData.fever.severity}
                onChange={(value) => updateSymptom('fever', 'severity', value)}
                lowLabel="Normal"
                midLabel="Moderate fever"
                highLabel="High fever"
              />
            </div>

            {/* Chills & Rigors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Chills</h4>
                <SeverityScale
                  label="Chills Severity"
                  value={symptomData.chills.severity}
                  onChange={(value) => updateSymptom('chills', 'severity', value)}
                  lowLabel="None"
                  midLabel="Moderate chills"
                  highLabel="Severe chills"
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Rigors (Severe Shaking)</h4>
                <SeverityScale
                  label="Rigors Severity"
                  value={symptomData.rigors.severity}
                  onChange={(value) => updateSymptom('rigors', 'severity', value)}
                  lowLabel="None"
                  midLabel="Moderate shaking"
                  highLabel="Severe rigors"
                />
              </div>
            </div>

            {/* Fatigue & Weakness */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Fatigue/Exhaustion</h4>
              <SeverityScale
                label="Energy Level"
                value={symptomData.fatigue.energyLevel}
                onChange={(value) => updateSymptom('fatigue', 'energyLevel', value)}
                lowLabel="Normal energy"
                midLabel="Moderate fatigue"
                highLabel="Extreme exhaustion"
              />
              {symptomData.fatigue.energyLevel > 0 && (
                <SeverityScale
                  label="Impact on Daily Activities"
                  value={symptomData.fatigue.dailyImpact}
                  onChange={(value) => updateSymptom('fatigue', 'dailyImpact', value)}
                  lowLabel="No impact"
                  midLabel="Some difficulty"
                  highLabel="Cannot perform activities"
                />
              )}
            </div>

            {/* Night Sweats & Excessive Sweating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Night Sweats</h4>
                <SeverityScale
                  label="Night Sweats Severity"
                  value={symptomData.nightSweats.severity}
                  onChange={(value) => updateSymptom('nightSweats', 'severity', value)}
                  lowLabel="None"
                  midLabel="Moderate sweating"
                  highLabel="Drenching sweats"
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Excessive Sweating</h4>
                <SeverityScale
                  label="Hyperhidrosis Severity"
                  value={symptomData.excessiveSweating.severity}
                  onChange={(value) => updateSymptom('excessiveSweating', 'severity', value)}
                  lowLabel="Normal"
                  midLabel="Noticeable sweating"
                  highLabel="Excessive sweating"
                />
              </div>
            </div>

            {/* Weight Changes */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Weight Changes</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Type of Change</Label>
                  <Select 
                    value={symptomData.weightChanges.type} 
                    onValueChange={(value) => updateSymptom('weightChanges', 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loss">Weight loss</SelectItem>
                      <SelectItem value="gain">Weight gain</SelectItem>
                      <SelectItem value="none">No change</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Amount</Label>
                  <Select 
                    value={symptomData.weightChanges.amount} 
                    onValueChange={(value) => updateSymptom('weightChanges', 'amount', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 lbs</SelectItem>
                      <SelectItem value="5-10">5-10 lbs</SelectItem>
                      <SelectItem value="10-20">10-20 lbs</SelectItem>
                      <SelectItem value="20+">20+ lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Time Period</Label>
                  <Select 
                    value={symptomData.weightChanges.timePeriod} 
                    onValueChange={(value) => updateSymptom('weightChanges', 'timePeriod', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-week">1 week</SelectItem>
                      <SelectItem value="1-month">1 month</SelectItem>
                      <SelectItem value="3-months">3 months</SelectItem>
                      <SelectItem value="6-months">6+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <SeverityScale
                label="Appetite Level"
                value={symptomData.weightChanges.appetite}
                onChange={(value) => updateSymptom('weightChanges', 'appetite', value)}
                lowLabel="No appetite"
                midLabel="Normal"
                highLabel="Excessive appetite"
              />
            </div>

            {/* Excessive Thirst & Hunger */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Excessive Thirst (Polydipsia)</h4>
                <SeverityScale
                  label="Thirst Level"
                  value={symptomData.excessiveThirst.severity}
                  onChange={(value) => updateSymptom('excessiveThirst', 'severity', value)}
                  lowLabel="Normal"
                  midLabel="Increased thirst"
                  highLabel="Extreme thirst"
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Excessive Hunger (Polyphagia)</h4>
                <SeverityScale
                  label="Hunger Level"
                  value={symptomData.excessiveHunger.severity}
                  onChange={(value) => updateSymptom('excessiveHunger', 'severity', value)}
                  lowLabel="Normal"
                  midLabel="Increased hunger"
                  highLabel="Extreme hunger"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Neurological Symptoms */}
        <Collapsible>
          <CollapsibleTrigger 
            onClick={() => toggleSection('neurological')}
            className="flex items-center justify-between w-full p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span className="font-medium">Neurological/Nervous System</span>
            </div>
            {expandedSections.includes('neurological') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-6">
            {/* Headache */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Headache</h4>
              <SeverityScale
                label="Pain Intensity"
                value={symptomData.headache.severity}
                onChange={(value) => updateSymptom('headache', 'severity', value)}
                lowLabel="No pain"
                midLabel="Moderate pain"
                highLabel="Worst possible pain"
              />
              {symptomData.headache.severity > 0 && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Type of Pain</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Throbbing', 'Sharp/stabbing', 'Dull ache', 'Pressure', 'Burning'].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`headache-type-${type}`}
                            checked={symptomData.headache.type.includes(type)}
                            onCheckedChange={() => toggleArrayValue('headache', 'type', type)}
                          />
                          <Label htmlFor={`headache-type-${type}`} className="text-sm cursor-pointer">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Location</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Forehead', 'Temples', 'Back of head', 'Top of head', 'Behind eyes', 'Neck', 'Whole head'].map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={`headache-location-${location}`}
                            checked={symptomData.headache.location.includes(location)}
                            onCheckedChange={() => toggleArrayValue('headache', 'location', location)}
                          />
                          <Label htmlFor={`headache-location-${location}`} className="text-sm cursor-pointer">
                            {location}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Migraines */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Migraines</h4>
              <SeverityScale
                label="Migraine Severity"
                value={symptomData.migraines.severity}
                onChange={(value) => updateSymptom('migraines', 'severity', value)}
                lowLabel="None"
                midLabel="Moderate migraines"
                highLabel="Severe, disabling migraines"
              />
            </div>

            {/* Dizziness & Balance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Dizziness/Vertigo</h4>
                <SeverityScale
                  label="Dizziness Severity"
                  value={symptomData.dizziness.severity}
                  onChange={(value) => updateSymptom('dizziness', 'severity', value)}
                  lowLabel="None"
                  midLabel="Affecting balance"
                  highLabel="Preventing standing"
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Balance Problems</h4>
                <SeverityScale
                  label="Balance Issues"
                  value={symptomData.balanceProblems.severity}
                  onChange={(value) => updateSymptom('balanceProblems', 'severity', value)}
                  lowLabel="Normal balance"
                  midLabel="Some unsteadiness"
                  highLabel="Severe balance issues"
                />
              </div>
            </div>

            {/* Cognitive Issues */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Memory/Cognitive Issues</h4>
              <SeverityScale
                label="Cognitive Problems"
                value={symptomData.cognitive.severity}
                onChange={(value) => updateSymptom('cognitive', 'severity', value)}
                lowLabel="Normal"
                midLabel="Noticeable problems"
                highLabel="Severe impairment"
              />
              {symptomData.cognitive.severity > 0 && (
                <>
                  <SeverityScale
                    label="Impact on Daily Life"
                    value={symptomData.cognitive.dailyImpact}
                    onChange={(value) => updateSymptom('cognitive', 'dailyImpact', value)}
                    lowLabel="No impact"
                    midLabel="Some difficulty"
                    highLabel="Cannot function independently"
                  />
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Areas Affected</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Short-term memory', 'Long-term memory', 'Concentration', 'Word finding', 'Decision making'].map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cognitive-${area}`}
                            checked={symptomData.cognitive.affected.includes(area)}
                            onCheckedChange={() => toggleArrayValue('cognitive', 'affected', area)}
                          />
                          <Label htmlFor={`cognitive-${area}`} className="text-sm cursor-pointer">
                            {area}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Numbness & Tingling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Numbness</h4>
                <SeverityScale
                  label="Numbness Severity"
                  value={symptomData.numbness.severity}
                  onChange={(value) => updateSymptom('numbness', 'severity', value)}
                  lowLabel="None"
                  midLabel="Noticeable numbness"
                  highLabel="Severe numbness"
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Tingling/Pins & Needles</h4>
                <SeverityScale
                  label="Tingling Severity"
                  value={symptomData.tingling.severity}
                  onChange={(value) => updateSymptom('tingling', 'severity', value)}
                  lowLabel="None"
                  midLabel="Noticeable tingling"
                  highLabel="Severe tingling"
                />
              </div>
            </div>

            {/* Seizures */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Seizures</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Seizure History</Label>
                  <RadioGroup 
                    value={symptomData.seizures.type} 
                    onValueChange={(value) => updateSymptom('seizures', 'type', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="never" id="never" />
                      <Label htmlFor="never">Never had seizures</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="witnessed" id="witnessed" />
                      <Label htmlFor="witnessed">Witnessed by others</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="suspected" id="suspected" />
                      <Label htmlFor="suspected">Suspected episodes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="confirmed" id="confirmed" />
                      <Label htmlFor="confirmed">Confirmed by doctor</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Female-specific/Pregnancy Symptoms */}
        {(patientGender === 'female') && (
          <Collapsible>
            <CollapsibleTrigger 
              onClick={() => toggleSection('pregnancy')}
              className="flex items-center justify-between w-full p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-600" />
                <span className="font-medium">Female-specific/Pregnancy Symptoms</span>
              </div>
              {expandedSections.includes('pregnancy') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-6">
              {(pregnancyStatus === 'possibly-pregnant' || pregnancyStatus === 'confirmed-pregnant' || pregnancyStatus === 'unsure') && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Early Pregnancy Symptoms</h4>
                  
                  <SeverityScale
                    label="Morning Sickness/Nausea"
                    value={symptomData.pregnancySymptoms.morningSickness}
                    onChange={(value) => updateSymptom('pregnancySymptoms', 'morningSickness', value)}
                    lowLabel="None"
                    midLabel="Moderate nausea"
                    highLabel="Severe vomiting"
                  />
                  
                  <SeverityScale
                    label="Frequent Urination"
                    value={symptomData.pregnancySymptoms.frequentUrination}
                    onChange={(value) => updateSymptom('pregnancySymptoms', 'frequentUrination', value)}
                    lowLabel="Normal"
                    midLabel="Noticeable increase"
                    highLabel="Very frequent, urgent"
                  />
                  
                  <SeverityScale
                    label="Unusual Fatigue"
                    value={symptomData.pregnancySymptoms.fatigue}
                    onChange={(value) => updateSymptom('pregnancySymptoms', 'fatigue', value)}
                    lowLabel="Normal energy"
                    midLabel="More tired than usual"
                    highLabel="Extreme exhaustion"
                  />
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Breast Changes</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Tenderness', 'Swelling', 'Nipple changes', 'Darkening', 'Tingling'].map((change) => (
                        <div key={change} className="flex items-center space-x-2">
                          <Checkbox
                            id={`breast-${change}`}
                            checked={symptomData.pregnancySymptoms.breastChanges.includes(change)}
                            onCheckedChange={() => toggleArrayValue('pregnancySymptoms', 'breastChanges', change)}
                          />
                          <Label htmlFor={`breast-${change}`} className="text-sm cursor-pointer">
                            {change}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Cardiovascular/Circulatory Symptoms */}
        <Collapsible>
          <CollapsibleTrigger 
            onClick={() => toggleSection('cardiovascular')}
            className="flex items-center justify-between w-full p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-600" />
              <span className="font-medium">Cardiovascular/Circulatory</span>
            </div>
            {expandedSections.includes('cardiovascular') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Chest Pain/Pressure</h4>
                <SeverityScale
                  label="Chest Pain Severity"
                  value={symptomData.chestPain.severity}
                  onChange={(value) => updateSymptom('chestPain', 'severity', value)}
                  lowLabel="No pain"
                  midLabel="Moderate pain"
                  highLabel="Severe pain"
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Heart Palpitations</h4>
                <SeverityScale
                  label="Palpitations Severity"
                  value={symptomData.palpitations.severity}
                  onChange={(value) => updateSymptom('palpitations', 'severity', value)}
                  lowLabel="None"
                  midLabel="Noticeable"
                  highLabel="Very concerning"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Rapid Heartbeat</h4>
                <SeverityScale
                  label="Tachycardia Severity"
                  value={symptomData.tachycardia.severity}
                  onChange={(value) => updateSymptom('tachycardia', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Slow Heartbeat</h4>
                <SeverityScale
                  label="Bradycardia Severity"
                  value={symptomData.bradycardia.severity}
                  onChange={(value) => updateSymptom('bradycardia', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Irregular Heartbeat</h4>
                <SeverityScale
                  label="Arrhythmia Severity"
                  value={symptomData.irregularHeartbeat.severity}
                  onChange={(value) => updateSymptom('irregularHeartbeat', 'severity', value)}
                />
              </div>
            </div>

            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Swelling (Edema)</h4>
              <SeverityScale
                label="Swelling Severity"
                value={symptomData.swelling.severity}
                onChange={(value) => updateSymptom('swelling', 'severity', value)}
                lowLabel="None"
                midLabel="Mild swelling"
                highLabel="Severe swelling"
              />
              {symptomData.swelling.severity > 0 && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">Location of Swelling</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['Feet/Ankles', 'Legs', 'Hands/Arms', 'Around Eyes', 'Face', 'Abdomen'].map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={`swelling-${location}`}
                          checked={symptomData.swelling.location.includes(location)}
                          onCheckedChange={() => toggleArrayValue('swelling', 'location', location)}
                        />
                        <Label htmlFor={`swelling-${location}`} className="text-sm cursor-pointer">
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Respiratory/Pulmonary Symptoms */}
        <Collapsible>
          <CollapsibleTrigger 
            onClick={() => toggleSection('respiratory')}
            className="flex items-center justify-between w-full p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Lungs className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Respiratory/Pulmonary</span>
            </div>
            {expandedSections.includes('respiratory') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Cough</h4>
                <SeverityScale
                  label="Cough Severity"
                  value={symptomData.cough.severity}
                  onChange={(value) => updateSymptom('cough', 'severity', value)}
                  lowLabel="None"
                  midLabel="Moderate cough"
                  highLabel="Severe, persistent"
                />
                {symptomData.cough.severity > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Cough Type</Label>
                    <Select 
                      value={symptomData.cough.type} 
                      onValueChange={(value) => updateSymptom('cough', 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dry">Dry cough</SelectItem>
                        <SelectItem value="productive">Productive (with phlegm)</SelectItem>
                        <SelectItem value="barking">Barking cough</SelectItem>
                        <SelectItem value="whooping">Whooping cough</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Shortness of Breath</h4>
                <SeverityScale
                  label="Breathing Difficulty"
                  value={symptomData.shortnessBreath.severity}
                  onChange={(value) => updateSymptom('shortnessBreath', 'severity', value)}
                  lowLabel="Normal breathing"
                  midLabel="Mild difficulty"
                  highLabel="Severe difficulty"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Wheezing</h4>
                <SeverityScale
                  label="Wheezing Severity"
                  value={symptomData.wheezing.severity}
                  onChange={(value) => updateSymptom('wheezing', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Sore Throat</h4>
                <SeverityScale
                  label="Throat Pain"
                  value={symptomData.soreThroat.severity}
                  onChange={(value) => updateSymptom('soreThroat', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Runny Nose</h4>
                <SeverityScale
                  label="Nasal Discharge"
                  value={symptomData.runnyNose.severity}
                  onChange={(value) => updateSymptom('runnyNose', 'severity', value)}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Gastrointestinal/Digestive Symptoms */}
        <Collapsible>
          <CollapsibleTrigger 
            onClick={() => toggleSection('gastrointestinal')}
            className="flex items-center justify-between w-full p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Stomach className="h-5 w-5 text-green-600" />
              <span className="font-medium">Gastrointestinal/Digestive</span>
            </div>
            {expandedSections.includes('gastrointestinal') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Nausea</h4>
                <SeverityScale
                  label="Nausea Severity"
                  value={symptomData.nausea.severity}
                  onChange={(value) => updateSymptom('nausea', 'severity', value)}
                  lowLabel="None"
                  midLabel="Moderate nausea"
                  highLabel="Severe nausea"
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Abdominal Pain</h4>
                <SeverityScale
                  label="Pain Severity"
                  value={symptomData.abdominalPain.severity}
                  onChange={(value) => updateSymptom('abdominalPain', 'severity', value)}
                  lowLabel="No pain"
                  midLabel="Moderate pain"
                  highLabel="Severe pain"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Heartburn/Acid Reflux</h4>
                <SeverityScale
                  label="Heartburn Severity"
                  value={symptomData.heartburn.severity}
                  onChange={(value) => updateSymptom('heartburn', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Bloating</h4>
                <SeverityScale
                  label="Bloating Severity"
                  value={symptomData.bloating.severity}
                  onChange={(value) => updateSymptom('bloating', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Loss of Appetite</h4>
                <SeverityScale
                  label="Appetite Loss"
                  value={symptomData.lossAppetite.severity}
                  onChange={(value) => updateSymptom('lossAppetite', 'severity', value)}
                />
              </div>
            </div>

            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Bowel Changes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Diarrhea Frequency</Label>
                  <Select 
                    value={symptomData.diarrhea.frequency} 
                    onValueChange={(value) => updateSymptom('diarrhea', 'frequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="occasional">Occasional</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="multiple-daily">Multiple times daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Constipation Severity</Label>
                  <Select 
                    value={symptomData.constipation.severity} 
                    onValueChange={(value) => updateSymptom('constipation', 'severity', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Musculoskeletal/Orthopedic Symptoms */}
        <Collapsible>
          <CollapsibleTrigger 
            onClick={() => toggleSection('musculoskeletal')}
            className="flex items-center justify-between w-full p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Bone className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">Musculoskeletal/Orthopedic</span>
            </div>
            {expandedSections.includes('musculoskeletal') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Joint Pain</h4>
                <SeverityScale
                  label="Joint Pain Severity"
                  value={symptomData.jointPain.severity}
                  onChange={(value) => updateSymptom('jointPain', 'severity', value)}
                  lowLabel="No pain"
                  midLabel="Moderate pain"
                  highLabel="Severe pain"
                />
                {symptomData.jointPain.severity > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Affected Joints</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Neck', 'Shoulders', 'Elbows', 'Wrists', 'Fingers', 'Hips', 'Knees', 'Ankles'].map((joint) => (
                        <div key={joint} className="flex items-center space-x-2">
                          <Checkbox
                            id={`joint-${joint}`}
                            checked={symptomData.jointPain.location.includes(joint)}
                            onCheckedChange={() => toggleArrayValue('jointPain', 'location', joint)}
                          />
                          <Label htmlFor={`joint-${joint}`} className="text-sm cursor-pointer">
                            {joint}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Back Pain</h4>
                <SeverityScale
                  label="Back Pain Severity"
                  value={symptomData.backPain.severity}
                  onChange={(value) => updateSymptom('backPain', 'severity', value)}
                  lowLabel="No pain"
                  midLabel="Moderate pain"
                  highLabel="Severe pain"
                />
                {symptomData.backPain.severity > 0 && (
                  <div>
                    <Label>Back Pain Location</Label>
                    <Select 
                      value={symptomData.backPain.location} 
                      onValueChange={(value) => updateSymptom('backPain', 'location', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upper">Upper back</SelectItem>
                        <SelectItem value="middle">Middle back</SelectItem>
                        <SelectItem value="lower">Lower back</SelectItem>
                        <SelectItem value="whole">Whole back</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Muscle Pain</h4>
                <SeverityScale
                  label="Muscle Pain Severity"
                  value={symptomData.musclePain.severity}
                  onChange={(value) => updateSymptom('musclePain', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Morning Stiffness</h4>
                <SeverityScale
                  label="Stiffness Severity"
                  value={symptomData.morningStiffness.severity}
                  onChange={(value) => updateSymptom('morningStiffness', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Limited Range of Motion</h4>
                <SeverityScale
                  label="Limitation Severity"
                  value={symptomData.limitedRangeMotion.severity}
                  onChange={(value) => updateSymptom('limitedRangeMotion', 'severity', value)}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Dermatological/Skin Symptoms */}
        <Collapsible>
          <CollapsibleTrigger 
            onClick={() => toggleSection('dermatological')}
            className="flex items-center justify-between w-full p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Skin className="h-5 w-5 text-yellow-600" />
              <span className="font-medium">Dermatological/Skin</span>
            </div>
            {expandedSections.includes('dermatological') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Skin Rash</h4>
                <SeverityScale
                  label="Rash Severity"
                  value={symptomData.skinRash.severity}
                  onChange={(value) => updateSymptom('skinRash', 'severity', value)}
                  lowLabel="None"
                  midLabel="Moderate rash"
                  highLabel="Severe, widespread"
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Itchy Skin</h4>
                <SeverityScale
                  label="Itching Severity"
                  value={symptomData.itchySkin.severity}
                  onChange={(value) => updateSymptom('itchySkin', 'severity', value)}
                  lowLabel="No itching"
                  midLabel="Moderate itching"
                  highLabel="Severe, constant itching"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Dry Skin</h4>
                <SeverityScale
                  label="Dryness Severity"
                  value={symptomData.drySkin.severity}
                  onChange={(value) => updateSymptom('drySkin', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Acne</h4>
                <SeverityScale
                  label="Acne Severity"
                  value={symptomData.acne.severity}
                  onChange={(value) => updateSymptom('acne', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Hair Loss</h4>
                <SeverityScale
                  label="Hair Loss Severity"
                  value={symptomData.hairLoss.severity}
                  onChange={(value) => updateSymptom('hairLoss', 'severity', value)}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Genitourinary/Kidney-Bladder Symptoms */}
        <Collapsible>
          <CollapsibleTrigger 
            onClick={() => toggleSection('genitourinary')}
            className="flex items-center justify-between w-full p-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-teal-600" />
              <span className="font-medium">Genitourinary/Kidney-Bladder</span>
            </div>
            {expandedSections.includes('genitourinary') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Painful Urination</h4>
                <SeverityScale
                  label="Pain Severity"
                  value={symptomData.painfulUrination.severity}
                  onChange={(value) => updateSymptom('painfulUrination', 'severity', value)}
                  lowLabel="No pain"
                  midLabel="Moderate pain"
                  highLabel="Severe pain"
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Frequent Urination</h4>
                <SeverityScale
                  label="Frequency"
                  value={symptomData.frequentUrination.severity}
                  onChange={(value) => updateSymptom('frequentUrination', 'severity', value)}
                  lowLabel="Normal"
                  midLabel="More frequent"
                  highLabel="Very frequent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Blood in Urine</h4>
                <SeverityScale
                  label="Hematuria Severity"
                  value={symptomData.bloodInUrine.severity}
                  onChange={(value) => updateSymptom('bloodInUrine', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Kidney/Flank Pain</h4>
                <SeverityScale
                  label="Pain Severity"
                  value={symptomData.kidneyPain.severity}
                  onChange={(value) => updateSymptom('kidneyPain', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Incontinence</h4>
                <SeverityScale
                  label="Incontinence Severity"
                  value={symptomData.incontinence.severity}
                  onChange={(value) => updateSymptom('incontinence', 'severity', value)}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Eye/Vision Symptoms */}
        <Collapsible>
          <CollapsibleTrigger 
            onClick={() => toggleSection('vision')}
            className="flex items-center justify-between w-full p-3 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-violet-600" />
              <span className="font-medium">Eye/Vision</span>
            </div>
            {expandedSections.includes('vision') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Vision Changes</h4>
                <SeverityScale
                  label="Vision Change Severity"
                  value={symptomData.visionChanges.severity}
                  onChange={(value) => updateSymptom('visionChanges', 'severity', value)}
                  lowLabel="Normal vision"
                  midLabel="Noticeable changes"
                  highLabel="Significant vision loss"
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Eye Pain</h4>
                <SeverityScale
                  label="Pain Severity"
                  value={symptomData.eyePain.severity}
                  onChange={(value) => updateSymptom('eyePain', 'severity', value)}
                  lowLabel="No pain"
                  midLabel="Moderate pain"
                  highLabel="Severe pain"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Blurred Vision</h4>
                <SeverityScale
                  label="Blurriness"
                  value={symptomData.blurredVision.severity}
                  onChange={(value) => updateSymptom('blurredVision', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Double Vision</h4>
                <SeverityScale
                  label="Double Vision Severity"
                  value={symptomData.doubleVision.severity}
                  onChange={(value) => updateSymptom('doubleVision', 'severity', value)}
                />
              </div>
              
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Light Sensitivity</h4>
                <SeverityScale
                  label="Photophobia Severity"
                  value={symptomData.lightSensitivity.severity}
                  onChange={(value) => updateSymptom('lightSensitivity', 'severity', value)}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Expand All Sections Button */}
        <div className="text-center py-4">
          <Button 
            variant="outline" 
            onClick={() => {
              // Expand all sections to show comprehensive form
              const allSections = ['general', 'neurological', 'cardiovascular', 'respiratory', 'gastrointestinal', 'musculoskeletal', 'dermatological', 'genitourinary', 'vision'];
              if (patientGender === 'female') allSections.push('pregnancy');
              setExpandedSections(allSections);
            }}
          >
            Expand All Sections
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComprehensiveSymptoms;
export { defaultSymptomData };