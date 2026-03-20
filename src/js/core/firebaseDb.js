import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdZjaGkRx51fs2Blr95o4c9wC_Om3XQ-I",
  authDomain: "vista-c2396.firebaseapp.com",
  projectId: "vista-c2396",
  storageBucket: "vista-c2396.firebasestorage.app",
  messagingSenderId: "380219072592",
  appId: "1:380219072592:web:30a234f629f083dbae7155"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveIconPosition(appId, left, top) {
  try {
    const docRef = doc(db, "desktopIcons", appId);
    await setDoc(docRef, { left, top });
  } catch (error) {
    console.error("Error saving icon position:", error);
  }
}

export async function getIconPositions() {
  const positions = {};
  try {
    const querySnapshot = await getDocs(collection(db, "desktopIcons"));
    querySnapshot.forEach((doc) => {
      positions[doc.id] = doc.data();
    });
  } catch (error) {
    console.error("Error loading icon positions:", error);
  }
  return positions;
}
