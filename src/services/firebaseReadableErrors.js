export function getReadableError(rawMessage) {
  return messageMap[rawMessage] || rawMessage;
}

const messageMap = {
  "Firebase: Error (auth/invalid-email).": "Invalid email",
  "Firebase: Error (auth/user-not-found).": "User not found",
  "Firebase: Error (auth/wrong-password).": "Wrong password",
  "Firebase: Password should be at least 6 characters (auth/weak-password).":
    "Password should be at least 6 characters",
  "Firebase: Error (auth/email-already-exists).": "This email is already taken",
  "Firebase: Error (auth/email-already-in-use).": "This email is already taken",
  "Firebase: Error (auth/invalid-display-name).": "Invalid username",
};
