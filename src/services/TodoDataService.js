/* eslint-disable */
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore/lite";
import db from "../firebase";

export default {
  async getAll() {
    const todoSnapshot = await getDocs(collection(db, "todos"));
    const todoList = todoSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return todoList;
  },
  async get(id) {
    const todoSnapshot = await getDoc(doc(db, "todos", id));
    if (todoSnapshot.exists()) {
      return todoSnapshot.data();
    }
    return null
  },
  async create(data) {
    await setDoc(doc(collection(db, "todos")), data);
  },
  async update(id, data) {
    await setDoc(doc(db, "todos", id), data);
  },
  async delete(id) {
    await deleteDoc(doc(db, "todos", id));
  }
};
