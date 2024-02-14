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
    // Initialize the Firestore collection
    this.collection = collection(db, collectionName);
  }

  // Sort the data based on sortBy and sortOrder
  async sortData(queryRef, sortBy, sortOrder) {
    if (sortBy) {
      return query(queryRef, orderBy(sortBy, sortOrder));
    }
    return queryRef;
  }

  // Filter the data based on the provided filters
  async filterData(queryRef, filters) {
    let filteredQueryRef = queryRef;
    for (const key in filters) {
      filteredQueryRef = query(filteredQueryRef, where(key, '==', filters[key]));
    }
    return filteredQueryRef;
  }

  // Paginate the data based on startAfterDoc and limitCount
  async paginateData(queryRef, startAfterDoc, limitCount) {
    if (startAfterDoc) {
      queryRef = query(queryRef, startAfter(startAfterDoc));
    }
    queryRef = query(queryRef, limit(limitCount));
    return queryRef;
  }

  // Retrieve all documents from the query reference
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

  // Retrieve a single document by ID
  async getById(id) {
    const docRef = doc(this.collection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }

  // Add a new document to the collection
  async add(data) {
    const docRef = await addDoc(this.collection, data);
    return { id: docRef.id, ...data };
  }

  // Update an existing document
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

  // Delete a document by ID
  async delete(id) {
    const docRef = doc(this.collection, id);
    await deleteDoc(docRef);
    return id;
  }

  // Retrieve paginated data
  async getPaginated(page, limit) {
    const startAt = (page - 1) * limit;
    const querySnapshot = await this.collection.orderBy('name').startAt(startAt).limit(limit).get();
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }

  // Get the total count of documents in the collection
  async getTotalCount() {
    const querySnapshot = await this.collection.get();
    return querySnapshot.size;
  }

  // Listen for updates to the collection
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
