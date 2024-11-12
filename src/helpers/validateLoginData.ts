export function validatePhoneNumber(phoneNumber: string): boolean | string {
  const phoneRegex = /^(?:\+7|8|7)\d{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return "Неверный формат телефона";
  }
  return true;
}

export function validatePassword(password: string): boolean | string {
  if (password.length < 8) {
    return "Минимум 8 символов";
  }
  return true;
}
