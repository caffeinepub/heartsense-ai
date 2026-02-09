import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type RiskLevel = { #low; #moderate; #high };

  type RiskFactor = {
    category : Text;
    detail : Text;
  };

  public type BloodPressureType = {
    #systolic;
    #diastolic;
    #meanArterialPressure;
  };

  type AssessmentInput = {
    age : Nat;
    gender : { #male; #female };
    smoking : { #none; #former; #current };
    bloodPressure : ?{
      pressureType : BloodPressureType;
      value : Nat;
    };
    symptomsFactor : {
      cough : Bool;
      wheezing : Bool;
      shortnessOfBreath : Bool;
      stridor : Bool;
      difficultySwallowing : Bool;
      unexplained_weight_loss : Bool;
      bloodInSputum : Bool;
    };
  };

  public type AssessmentResult = {
    riskScore : Nat;
    riskLevel : RiskLevel;
    explanation : [RiskFactor];
  };

  module RiskLevel {
    public func compare(level1 : RiskLevel, level2 : RiskLevel) : Order.Order {
      switch (level1, level2) {
        case (#low, #moderate) { #less };
        case (#low, #high) { #less };
        case (#moderate, #low) { #greater };
        case (#moderate, #high) { #less };
        case (#high, #low) { #greater };
        case (#high, #moderate) { #greater };
        case (_, _) { #equal };
      };
    };
  };

  public query ({ caller }) func riskLevelToText(level : RiskLevel) : async Text {
    switch (level) {
      case (#low) { "Low" };
      case (#moderate) { "Moderate" };
      case (#high) { "High" };
    };
  };

  public shared ({ caller }) func calculateRisk(assessmentInput : AssessmentInput) : async AssessmentResult {
    let ageFactor = if (assessmentInput.age >= 0 and assessmentInput.age <= 39) {
      0;
    } else if (assessmentInput.age >= 40 and assessmentInput.age <= 49) {
      1;
    } else if (assessmentInput.age >= 50 and assessmentInput.age <= 59) {
      2;
    } else if (assessmentInput.age >= 60 and assessmentInput.age <= 69) {
      3;
    } else if (assessmentInput.age >= 70 and assessmentInput.age <= 90) {
      4;
    } else {
      Runtime.trap("Invalid age");
    };

    let bloodPressureFactor : Nat = switch (assessmentInput.bloodPressure) {
      case (null) { 0 };
      case (?(bp)) {
        switch (bp.pressureType) {
          case (#systolic) {
            if (bp.value > 140) { 2 } else { 0 };
          };
          case (#diastolic) {
            if (bp.value > 90) { 2 } else { 0 };
          };
          case (#meanArterialPressure) {
            if (bp.value > 100) { 2 } else { 0 };
          };
        };
      };
    };

    let smokingFactor = switch (assessmentInput.smoking) {
      case (#none) { 0 };
      case (#former) { 1 };
      case (#current) { 2 };
    };

    func boolToInt(b : Bool) : Nat {
      if (b) { 1 } else { 0 };
    };

    let symptomsFactor = boolToInt(assessmentInput.symptomsFactor.cough) +
      boolToInt(assessmentInput.symptomsFactor.wheezing) +
      boolToInt(assessmentInput.symptomsFactor.shortnessOfBreath) +
      boolToInt(assessmentInput.symptomsFactor.stridor) +
      boolToInt(assessmentInput.symptomsFactor.difficultySwallowing);

    func boolToTwo(b : Bool) : Nat {
      if (b) { 2 } else { 0 };
    };

    let highRiskSymptomsFactor = boolToTwo(assessmentInput.symptomsFactor.unexplained_weight_loss) +
      boolToTwo(assessmentInput.symptomsFactor.bloodInSputum);

    let totalRiskScore = (ageFactor + bloodPressureFactor + smokingFactor + symptomsFactor + highRiskSymptomsFactor) * 10;

    let riskLevel = if (totalRiskScore >= 0 and totalRiskScore <= 40) {
      #low;
    } else if (totalRiskScore >= 41 and totalRiskScore <= 70) {
      #moderate;
    } else {
      #high;
    };

    let explanation = Iter.empty<RiskFactor>()
      .concat(
        if (ageFactor > 0) {
          Iter.singleton({
            category = "Age Factor";
            detail = "Higher age increases risk";
          });
        } else { Iter.empty<RiskFactor>() }
      )
      .concat(
        if (bloodPressureFactor > 0) {
          Iter.singleton({
            category = "Blood Pressure";
            detail = "Higher blood pressure increases risk";
          });
        } else { Iter.empty<RiskFactor>() }
      )
      .concat(
        if (smokingFactor > 0) {
          Iter.singleton({
            category = "Smoking History";
            detail = "Current/Former smokers have higher risk";
          });
        } else { Iter.empty<RiskFactor>() }
      )
      .concat(
        if (symptomsFactor > 0) {
          Iter.singleton({
            category = "Symptoms";
            detail = "Certain symptoms increase risk";
          });
        } else { Iter.empty<RiskFactor>() }
      )
      .concat(
        if (highRiskSymptomsFactor > 0) {
          Iter.singleton({
            category = "High Risk Symptoms";
            detail = "Unplanned weight loss and blood in sputum are significant risk factors";
          });
        } else { Iter.empty<RiskFactor>() }
      )
      .toArray();

    {
      riskScore = totalRiskScore;
      riskLevel;
      explanation;
    };
  };
};
