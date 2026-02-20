import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export interface SymptomRespiratory {
    cough: Variant_individual_family;
    wheezing: Variant_individual_family;
    shortnessOfBreath: Variant_individual_family;
    stridorSeverity: Variant_individual_family;
    hemoptysis: Variant_individual_family;
    coughFrequency?: bigint;
}
export interface SocialFactors {
    alcohol: boolean;
    diet: string;
    exercise: string;
    smoking: boolean;
}
export interface AssessmentResult {
    suggestedTests: string;
    clinicalImpression: string;
    explanation: string;
    lifestyleRecommendations: string;
    riskLevel: RiskLevel;
    riskScore: bigint;
}
export interface AssessmentInput {
    age: bigint;
    socialFactors: SocialFactors;
    respiratorySymptoms: SymptomRespiratory;
    hypertension: boolean;
    generalSymptoms: SymptomGeneral;
    gender: Gender;
    diabetes: boolean;
}
export interface SymptomGeneral {
    pain: string;
    weightLoss?: {
        hasWeightLoss: boolean;
        severity: string;
    };
}
export type PatientId = bigint;
export interface Patient {
    id: PatientId;
    registeredBy: UserId;
    lastName: string;
    firstName: string;
}
export enum Gender {
    female = "female",
    male = "male"
}
export enum RiskLevel {
    low = "low",
    high = "high",
    moderate = "moderate"
}
export enum Variant_individual_family {
    individual = "individual",
    family = "family"
}
export interface backendInterface {
    calculateRisk(patientId: PatientId, assessmentInput: AssessmentInput): Promise<AssessmentResult>;
    getPatient(patientId: bigint): Promise<Patient>;
    registerPatient(firstName: string, lastName: string): Promise<PatientId>;
    riskLevelToText(level: RiskLevel): Promise<string>;
}
