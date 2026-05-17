interface ValidationResult {
  readonly isValid: boolean;
  readonly error: string | null;
}

const CONGO_PHONE_REGEX = /^\+?243\s?\d{2}\s?\d{3}\s?\d{4}$/;
const PHONE_GENERIC_REGEX = /^\+?\d{10,15}$/;

export function validatePhoneNumber(phone: string): ValidationResult {
  const cleaned = phone.replace(/\s/g, '');

  if (!cleaned) {
    return { isValid: false, error: 'phone_required' };
  }

  if (CONGO_PHONE_REGEX.test(cleaned) || PHONE_GENERIC_REGEX.test(cleaned)) {
    return { isValid: true, error: null };
  }

  return { isValid: false, error: 'phone_invalid' };
}

export function validateRequired(value: string, fieldKey: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: `${fieldKey}_required` };
  }
  return { isValid: true, error: null };
}

export function validateLocation(
  province: string,
  city: string
): ValidationResult {
  if (!province.trim()) {
    return { isValid: false, error: 'province_required' };
  }
  if (!city.trim()) {
    return { isValid: false, error: 'city_required' };
  }
  return { isValid: true, error: null };
}

export function validateSymptomSelection(
  selectedSymptoms: readonly string[]
): ValidationResult {
  if (selectedSymptoms.length === 0) {
    return { isValid: false, error: 'symptoms_required' };
  }
  return { isValid: true, error: null };
}
