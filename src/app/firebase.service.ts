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
  deleteDoc,
} from 'firebase/firestore';
import { User } from './models/user';
import { List } from './models/list';
import { Item } from './models/item';

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

  async getUserIdByEmail(email: string): Promise<string> {
    const usersCol = collection(db, 'users');
    const q = query(usersCol, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return doc.id;
    }

    return '';
  }

  async getUserById(id: string): Promise<User | null> {
    const usersCol = collection(db, 'users');
    const q = query(usersCol, where('__name__', '==', id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const user = doc.data() as User;
      user.id = doc.id;
      return user;
    }

    return null;
  }

  async addUser(email: string): Promise<string> {
    let newUser: User = { email: email.toLowerCase().trim(), name: email };
    const usersCol = collection(db, 'users');
    const docRef = await addDoc(usersCol, newUser);
    return docRef.id;
  }

  async addList(user: User, listName: string): Promise<void> {
    let newList: List = { name: listName, creatorID: user.id! };
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

        // Get the items in the list
        const itemsCol = collection(db, `lists/${listId}/items`);
        const itemsSnapshot = await getDocs(itemsCol);
        list.items = await Promise.all(
          itemsSnapshot.docs.map(async (doc) => {
            const item = doc.data() as Item;
            item.id = doc.id;
            return item;
          })
        );

        lists.push(list);
      }
    }
    return lists;
  }

  async getList(listId: string): Promise<List | null> {
    const listCol = collection(db, `lists`);
    const q = query(listCol, where('__name__', '==', listId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const list = doc.data() as List;
      list.id = doc.id;
      // Get the items in the list
      const itemsCol = collection(db, `lists/${listId}/items`);
      const itemsSnapshot = await getDocs(itemsCol);
      list.items = await Promise.all(
        itemsSnapshot.docs.map(async (doc) => {
          const item = doc.data() as Item;
          item.id = doc.id;
          return item;
        })
      );
      return list;
    }

    return null;
  }

  async addToList(item: Item, listId: string): Promise<void> {
    const itemsCol = collection(db, `lists/${listId}/items`);
    await addDoc(itemsCol, item);
  }

  async editItem(item: Item, listId: string): Promise<void> {
    if (listId && item.id) {
      const itemDocRef = doc(db, `lists/${listId}/items`, item.id);
      await updateDoc(itemDocRef, {
        // Don't update purchased status
        name: item.name,
        url: item.url,
        details: item.details,
      });
    }
  }

  async removeFromList(listId: string, itemId: string): Promise<void> {
    if (listId && itemId) {
      const itemDocRef = doc(db, `lists/${listId}/items`, itemId);
      await deleteDoc(itemDocRef);
    }
  }

  async purchaseItem(listId: string, itemId: string, purchased: boolean): Promise<void> {
    const itemDocRef = doc(db, `lists/${listId}/items`, itemId);
    await updateDoc(itemDocRef, {
      purchased: purchased,
    });
  }
}
