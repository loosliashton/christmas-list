import { Injectable } from '@angular/core';
import { app } from 'src/environments/environment';
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { User } from './models/user';
import { List } from './models/list';

const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {}

  async getUsers(): Promise<User[]> {
    // Get users
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    const userList = await Promise.all(
      userSnapshot.docs.map(async (doc) => {
        const user = doc.data() as User;
        user.id = doc.id;
        return user;
      })
    );

    return userList;
  }

  async userExists(email: string): Promise<boolean> {
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);

    return userSnapshot.docs.some((doc) => {
      const user = doc.data() as User;
      return user.email === email;
    });
  }

  async getUser(email: string): Promise<User | null> {
    const usersCol = collection(db, 'users');
    const q = query(usersCol, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const user = doc.data() as User;
      user.id = doc.id;
      return user;
    }

    return null;
  }

  async addUser(email: string): Promise<void> {
    let newUser: User = { email: email, name: email };
    const usersCol = collection(db, 'users');
    await addDoc(usersCol, newUser);
  }

  async addList(user: User, listName: string): Promise<void> {
    let newList: List = { name: listName, creator: user.id! };
    const listsCol = collection(db, `lists`);
    const docRef = await addDoc(listsCol, newList);
    const docId = docRef.id;

    // Update the user's lists array in the database
    const userDocRef = doc(db, 'users', user.id!);
    await updateDoc(userDocRef, {
      lists: [...(user.lists ?? []), docId],
    });
  }

  async getLists(user: User): Promise<List[]> {
    let listIds = user.lists ?? [];
    let lists: List[] = [];
    for (let listId of listIds) {
      const listCol = collection(db, `lists`);
      const q = query(listCol, where('__name__', '==', listId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const list = doc.data() as List;
        list.id = doc.id;
        lists.push(list);
      }
    }
    return lists;
  }
}
