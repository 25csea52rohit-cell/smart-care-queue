import { CATEGORY_CONFIG } from '../config/constants';

export function classifyCategoryAndScore(symptoms: string, age?: number): { category: 'EMERGENCY' | 'URGENT' | 'PRIORITY' | 'GENERAL'; score: number } {
  const lowerSymptoms = symptoms.toLowerCase();
  
  // Emergency keywords: heart attack, stroke, heavy bleeding, unconscious, chest pain, seizure, severe trauma
  const emergencyKeywords = ['heart attack', 'stroke', 'bleeding', 'unconscious', 'chest pain', 'seizure', 'trauma', 'anaphylaxis', 'choking'];
  const isEmergency = emergencyKeywords.some(kw => lowerSymptoms.includes(kw));

  if (isEmergency) {
    return {
      category: 'EMERGENCY',
      score: CATEGORY_CONFIG.EMERGENCY.baseScore + (age && age > 65 ? 50 : 0),
    };
  }

  // Urgent keywords: high fever, severe pain, pregnant, elderly 70+, children under 5, fracture, burn
  const urgentKeywords = ['high fever', 'severe pain', 'pregnant', 'fracture', 'burn', 'shortness of breath', 'vomiting blood'];
  const isUrgent = urgentKeywords.some(kw => lowerSymptoms.includes(kw)) || (age !== undefined && (age >= 70 || age <= 5));

  if (isUrgent) {
    return {
      category: 'URGENT',
      score: CATEGORY_CONFIG.URGENT.baseScore + (age && age >= 70 ? 30 : 0),
    };
  }

  // Priority keywords: disabled, post-surgery, chronic, wheelchair, diabetes complication, hypertension
  const priorityKeywords = ['disabled', 'surgery', 'chronic', 'wheelchair', 'dialysis', 'oncology', 'hypertension'];
  const isPriority = priorityKeywords.some(kw => lowerSymptoms.includes(kw));

  if (isPriority) {
    return {
      category: 'PRIORITY',
      score: CATEGORY_CONFIG.PRIORITY.baseScore,
    };
  }

  // Fallback to General
  return {
    category: 'GENERAL',
    score: CATEGORY_CONFIG.GENERAL.baseScore,
  };
}
