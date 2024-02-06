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
import { db } from '../utils/firebaseConfig';

class BaseService {
  constructor(collectionName) {
    // Constructor to initialize BaseService with a collection name
    this.collection = collection(db, collectionName); // Setting Firestore collection reference
  }

  // Method to retrieve all documents from the collection
  async getAll() {
    const querySnapshot = await getDocs(this.collection); // Retrieving all documents
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Mapping document data with IDs
  }

  // Method to retrieve a document by its ID
  async getById(id) {
    const docRef = doc(this.collection, id); // Creating reference to document by ID
    const docSnap = await getDoc(docRef); // Retrieving document snapshot

    // Checking if document exists and returning data
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }

  // Method to add a new document to the collection
  async add(data) {
    const docRef = await addDoc(this.collection, data); // Adding new document to collection
    return { id: docRef.id, ...data }; // Returning added document data with ID
  }

  // Method to update a document by its ID
  async update(id, data) {
    const docRef = doc(this.collection, id); // Creating reference to document by ID

    try {
      await updateDoc(docRef, data); // Updating document with new data
      return { id, ...data }; // Returning updated document data with ID
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  // Method to delete a document by its ID
  async delete(id) {
    const docRef = doc(this.collection, id); // Creating reference to document by ID
    await deleteDoc(docRef); // Deleting document from collection
    return id; // Returning ID of deleted document
  }

  // Method to listen for changes in the collection and trigger a callback function
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
