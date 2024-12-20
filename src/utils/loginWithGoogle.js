import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Logged in user:", user);
    // localStorage.setItem(
    //   "usersession",
    //   JSON.stringify({
    //     uid: user.uid,
    //     displayName: user.displayName,
    //     email: user.email,
    //     photoURL: user.photoURL,
    //   })
    // );
    return user;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }

};

export default loginWithGoogle;