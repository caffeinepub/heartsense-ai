import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AssessmentInput {
    age: bigint;
    smoking: Variant_none_current_former;
    symptomsFactor: {
        difficultySwallowing: boolean;
        bloodInSputum: boolean;
        cough: boolean;
        wheezing: boolean;
        shortnessOfBreath: boolean;
        unexplainedWeightLoss: boolean;
        stridor: boolean;
    };
    gender: Variant_female_male;
}
export interface RiskFactor {
    detail: string;
    category: string;
}
export interface AssessmentResult {
    explanation: Array<RiskFactor>;
    riskLevel: RiskLevel;
    riskScore: bigint;
}
export enum RiskLevel {
    low = "low",
    high = "high",
    moderate = "moderate"
}
export enum Variant_female_male {
    female = "female",
    male = "male"
}
export enum Variant_none_current_former {
    none = "none",
    current = "current",
    former = "former"
}
export interface backendInterface {
    calculateRisk(assessmentInput: AssessmentInput): Promise<AssessmentResult>;
    riskLevelToText(level: RiskLevel): Promise<string>;
}
