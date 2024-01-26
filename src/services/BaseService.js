// src/services/BaseService.js

import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'; // Added getDoc
import { db } from './firebaseConfig';

class BaseService {
  constructor(collectionName) {
    this.collection = collection(db, collectionName);
  }

  async getAll() {
    const querySnapshot = await getDocs(this.collection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getById(id) {
    const docRef = doc(this.collection, id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }

  async add(data) {
    const docRef = await addDoc(this.collection, data);
    return { id: docRef.id, ...data };
  }

  async update(id, data) {
    const docRef = doc(this.collection, id);
    await updateDoc(docRef, data);
    return { id, ...data };
  }

  async delete(id) {
    const docRef = doc(this.collection, id);
    await deleteDoc(docRef);
    return id;
  }
}

export default BaseService;
