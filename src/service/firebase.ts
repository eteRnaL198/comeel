import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  WithFieldValue,
  DocumentData,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  autoDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORASGE_BACKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getDocRef = (collection: string, document: string) => {
  return doc(db, collection, document);
};

export const existDocument = async (collection: string, document: string) => {
  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

export const fetchAllDocumentsWithId = async <T>(
  collect: string
): Promise<T[]> => {
  const collectionRef = collection(db, collect);
  const querySnap = await getDocs(collectionRef);
  return querySnap.docs.map(
    (doc) => ({ ...doc.data(), ...{ id: doc.id } } as T)
  );
};

export const fetchDocument = async <T>(
  collection: string,
  document: string
) => {
  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as T;
};

export const addDocument = async (
  collect: string,
  data: WithFieldValue<DocumentData>
) => {
  const docRef = await addDoc(collection(db, collect), data);
  return docRef;
};

export const updateDocument = async (
  collect: string,
  document: string,
  data: WithFieldValue<DocumentData>
) => {
  const docRef = doc(db, collect, document);
  await updateDoc(docRef, data);
};

export const addElementToArrayinDocument = async <T>(
  collection: string,
  document: string,
  field: string,
  data: T
) => {
  const docRef = doc(db, collection, document);
  await updateDoc(docRef, {
    [field]: arrayUnion(data),
  });
};
