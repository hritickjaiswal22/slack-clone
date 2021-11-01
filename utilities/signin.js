import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function signIn(email, password) {
  const auth = getAuth();
  const result = signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      return {
        accessToken: user.accessToken,
        userName: user.displayName,
      };
    })
    .catch((e) => e);
  return result;
}
