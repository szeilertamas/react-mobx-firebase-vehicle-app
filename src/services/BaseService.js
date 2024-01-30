// src/services/BaseService.js

import {
  collection,
  getDoc,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './FirebaseConfig';

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

    try {
      await updateDoc(docRef, data);
      return { id, ...data };
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  async delete(id) {
    const docRef = doc(this.collection, id);
    await deleteDoc(docRef);
    return id;
  }

  onCollectionUpdate(callback) {
    return onSnapshot(this.collection, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    });
  }
}

export default BaseService;
