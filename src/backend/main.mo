import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Set "mo:core/Set";
import Runtime "mo:core/Runtime";

actor {
  public type UserId = Principal;
  public type PatientId = Nat;
  var nextPatientId = 0;

  public type Patient = {
    firstName : Text;
    lastName : Text;
    id : PatientId;
    registeredBy : UserId;
  };

  type Gender = { #male; #female };
  type UserRole = { #clinician; #admin };

  type SymptomRespiratory = {
    coughFrequency : ?Nat;
    cough : { #individual; #family };
    shortnessOfBreath : { #individual; #family };
    wheezing : { #individual; #family };
    hemoptysis : { #individual; #family };
    stridorSeverity : { #individual; #family };
  };

  type SymptomGeneral = {
    weightLoss : ?{
      hasWeightLoss : Bool;
      severity : Text;
    };
    pain : Text;
  };

  type SocialFactors = {
    smoking : Bool;
    alcohol : Bool;
    diet : Text;
    exercise : Text;
  };

  type AssessmentInput = {
    age : Nat;
    gender : Gender;
    respiratorySymptoms : SymptomRespiratory;
    generalSymptoms : SymptomGeneral;
    socialFactors : SocialFactors;
    hypertension : Bool;
    diabetes : Bool;
  };

  type RiskLevel = { #low; #moderate; #high };

  type AssessmentResult = {
    riskScore : Nat;
    riskLevel : RiskLevel;
    explanation : Text;
    clinicalImpression : Text;
    suggestedTests : Text;
    lifestyleRecommendations : Text;
  };

  let patients = Map.empty<PatientId, Patient>();
  let userRoles = Map.empty<UserId, (PatientId, UserRole)>();
  let activeClinicians = Set.empty<UserId>();

  public query ({ caller }) func riskLevelToText(level : RiskLevel) : async Text {
    switch (level) {
      case (#low) { "Low" };
      case (#moderate) { "Moderate" };
      case (#high) { "High" };
    };
  };

  func initializeSystem(adminId : Principal) {
    assignUserRole(adminId, 0, #admin);
    activateClinician(adminId);
    assignUserRole(adminId, 123, #clinician);
    activateClinician(adminId);
  };

  func assignUserRole(userId : UserId, _id : PatientId, role : UserRole) {
    if (userRoles.get(userId) == null) {
      userRoles.add(userId, (0, role));
    };
  };

  func activateClinician(clinicianId : UserId) {
    activeClinicians.add(clinicianId);
  };

  public shared ({ caller }) func registerPatient(firstName : Text, lastName : Text) : async PatientId {
    if (firstName == "" or lastName == "") {
      Runtime.trap("Invalid first / last name");
    };

    let patient = {
      firstName;
      lastName;
      id = nextPatientId;
      registeredBy = caller;
    };

    patients.add(nextPatientId, patient);
    let currentPatientId = nextPatientId;
    nextPatientId += 1;
    currentPatientId;
  };

  public query ({ caller }) func getPatient(patientId : Nat) : async Patient {
    switch (patients.get(patientId)) {
      case (?patient) { patient };
      case (null) { Runtime.trap("Patient not found") };
    };
  };

  public shared ({ caller }) func calculateRisk(
    patientId : PatientId,
    assessmentInput : AssessmentInput,
  ) : async AssessmentResult {
    if (patientId < 0 or patientId >= nextPatientId) {
      Runtime.trap("Invalid patient ID");
    };

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

    let chronicConditionsFactor = if (assessmentInput.hypertension and assessmentInput.diabetes) {
      3;
    } else if (assessmentInput.hypertension or assessmentInput.diabetes) {
      2;
    } else {
      0;
    };

    let smokingFactor = if (assessmentInput.socialFactors.smoking) { 2 } else {
      0;
    };

    let genderFactor = switch (assessmentInput.gender) {
      case (#male) { 1 };
      case (#female) { 0 };
    };

    func boolToInt(b : Bool) : Nat {
      if (b) { 1 } else { 0 };
    };

    func switchToInt(variant : { #individual; #family }) : Nat {
      switch (variant) {
        case (#individual) { 1 };
        case (#family) { 1 };
      };
    };

    let highRiskSymptomsFactor =
      boolToInt(assessmentInput.generalSymptoms.weightLoss != null) * 2 +
      switchToInt(assessmentInput.respiratorySymptoms.hemoptysis) * 2 +
      switchToInt(assessmentInput.respiratorySymptoms.stridorSeverity) * 2;

    let symptomsFactor =
      switchToInt(assessmentInput.respiratorySymptoms.cough) +
      switchToInt(assessmentInput.respiratorySymptoms.shortnessOfBreath) +
      switchToInt(assessmentInput.respiratorySymptoms.wheezing);

    let totalRiskScore = (ageFactor + chronicConditionsFactor + smokingFactor + genderFactor + symptomsFactor + highRiskSymptomsFactor) * 10;
    let normalizedRiskScore = if (totalRiskScore > 100) { 100 } else { totalRiskScore };

    let riskLevel = if (normalizedRiskScore >= 0 and normalizedRiskScore <= 40) { #low } else if (normalizedRiskScore >= 41 and normalizedRiskScore <= 70) {
      #moderate;
    } else { #high };

    let explanation = "Risk factors considered: Age, Hypertension/Diabetes, Smoking, Gender, Symptoms (Mild: cough, breathlessness, wheezing, Severe: weight loss, blood in sputum, stridor severity).";

    let clinicalImpression = switch (riskLevel) {
      case (#low) { "Likely non-malignant cause. Consider lifestyle advice and watchful waiting." };
      case (#moderate) {
        "Possible early signs of respiratory distress. Further assessment recommended, including lung function tests and chest imaging. Consider referral to specialist if symptoms persist.";
      };
      case (#high) {
        "Signs consistent with high risk of pulmonary fibrosis, cancer, or other serious pulmonary conditions. Immediate diagnostic tests and specialist consultation necessary.";
      };
    };

    let suggestedTests = switch (riskLevel) {
      case (#low) { "Basic blood work, chest X-ray if symptoms persist." };
      case (#moderate) {
        "Spirometry, complete pulmonary function tests, advanced chest imaging (CT scan), and blood work.";
      };
      case (#high) {
        "Immediate advanced diagnostics (CT/MRI), bronchoscopy, biopsy if indicated, and comprehensive systemic evaluation.";
      };
    };

    let lifestyleRecommendations = switch (riskLevel) {
      case (#low) { "Encourage balanced diet, regular exercise, non-smoking, moderation in alcohol consumption, and stress management." };
      case (#moderate) {
        "Emphasize smoking cessation, dietary improvements (increase fruits, vegetables, and lean proteins), and regular physical activity.";
      };
      case (#high) {
        "Prioritize respiratory health interventions (pulmonary rehabilitation, oxygen therapy), intensive dietary support, and mental health counseling.";
      };
    };

    {
      riskScore = normalizedRiskScore;
      riskLevel;
      explanation;
      clinicalImpression;
      suggestedTests;
      lifestyleRecommendations;
    };
  };
};
