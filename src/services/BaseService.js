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
  startAfter,
} from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

class BaseService {
  constructor(collectionName) {
    this.collection = collection(db, collectionName);
  }

  async sortData(queryRef, sortBy, sortOrder) {
    if (sortBy) {
      return query(queryRef, orderBy(sortBy, sortOrder));
    }
    return queryRef;
  }

  async filterData(queryRef, filters) {
    let filteredQueryRef = queryRef;
    for (const key in filters) {
      filteredQueryRef = query(filteredQueryRef, where(key, '==', filters[key]));
    }
    return filteredQueryRef;
  }

  async paginateData(queryRef, startAfterDoc, limitCount) {
    if (startAfterDoc) {
      queryRef = query(queryRef, startAfter(startAfterDoc));
    }
    queryRef = query(queryRef, limit(limitCount));
    return queryRef;
  }

  async getAll(queryRef) {
    try {
      const querySnapshot = await getDocs(queryRef);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.error('Error getting documents:', error);
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

  async getPaginated(page, limit) {
    const startAt = (page - 1) * limit;
    const querySnapshot = await this.collection.orderBy('name').startAt(startAt).limit(limit).get();
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }

  async getTotalCount() {
    const querySnapshot = await this.collection.get();
    return querySnapshot.size;
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
