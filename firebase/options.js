import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const getPhotoURL = async (uid) => {
  const storage = getStorage();
  // console.log("uid", uid);
  try {
    const storageRef = await ref(storage, `userLogo/${uid}`);
    const photoURL = await getDownloadURL(storageRef);
    // console.log("photoURL", photoURL);
    if (!photoURL) {
      return "";
    }
    return photoURL;
  } catch (error) {
    console.log(error);
    return "";
  }
};
