import { auth, provider } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOG_OUT, USER_AUTH } from "./actionType";
import {
  getStorage,
  ref,
  // getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
// import { collection } from "firebase/firestore";
import db from "../firebase";

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFail = (error) => ({
  type: LOGIN_FAIL,
  payload: error,
});

export const logOut = () => ({
  type: LOG_OUT,
  payload: null,
});

export const userAuth = (user) => ({
  type: USER_AUTH,
  payload: user,
});

export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(loginSuccess(payload));
      })
      .catch((error) => dispatch(loginFail(error)));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(userAuth(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    signOut(auth);
    dispatch(logOut()).catch((error) => console.log(error));
  };
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    if (payload.image !== " ") {
      const storage = getStorage();
      const image = payload.image;
      const ImgRef = ref(storage, `images/${payload.image.name}`);
      const uploadTask = uploadBytesResumable(ImgRef, image);

      uploadTask.on(
        "state_change",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress: ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`progress: ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const docRef = db.collection("articles");
          await docRef.set({
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: docRef,
            comments: 0,
            description: payload.description,
          });
          console.log(`File available at ${docRef}`);
        }
      );
    }
  };
}
