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
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

class BaseService {
  constructor(collectionName) {
    this.collection = collection(db, collectionName);
  }

  async getAllPaged(startIdx, endIdx, filters = {}, sortBy = null, sortOrder = 'asc') {
    try {
      let queryRef = this.collection;
  
      // Apply filters
      for (const key in filters) {
        queryRef = query(queryRef, where(key, '==', filters[key]));
      }
  
      // Apply sorting
      if (sortBy) {
        queryRef = query(queryRef, orderBy(sortBy, sortOrder));
      }
  
      // Apply paging
      queryRef = query(queryRef, limit(endIdx - startIdx));
  
      const querySnapshot = await getDocs(queryRef);
      const total = querySnapshot.size;
  
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
      return { data, total };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
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
