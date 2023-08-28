export function getReadableError(rawMessage) {
  const locale = localStorage.getItem("preferredLocale");
  if (locale) {
    return messageMap[locale][rawMessage] || rawMessage;
  }
  return messageMap.en[rawMessage] || rawMessage;
}

const messageMap = {
  en: {
    "Firebase: Error (auth/invalid-email).": "Invalid email",
    "Firebase: Error (auth/user-not-found).": "User not found",
    "Firebase: Error (auth/wrong-password).": "Wrong password",
    "Firebase: Password should be at least 6 characters (auth/weak-password).":
      "Password should be at least 6 characters",
    "Firebase: Error (auth/email-already-exists).":
      "This email is already taken",
    "Firebase: Error (auth/email-already-in-use).":
      "This email is already taken",
    "Firebase: Error (auth/invalid-display-name).": "Invalid username",
  },
  ru: {
    "Firebase: Error (auth/invalid-email).": "Неверный email",
    "Firebase: Error (auth/user-not-found).": "Пользователь не найден",
    "Firebase: Error (auth/wrong-password).": "Неверный пароль",
    "Firebase: Password should be at least 6 characters (auth/weak-password).":
      "Пароль должен содержать минимум 6 символов",
    "Firebase: Error (auth/email-already-exists).": "Этот email уже занят",
    "Firebase: Error (auth/email-already-in-use).": "Этот email уже занят",
    "Firebase: Error (auth/invalid-display-name).": "Invalid username",
  },
};
