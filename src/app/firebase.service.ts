import { Injectable } from '@angular/core';
import { app } from 'src/environments/environment';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
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
    const userList = await Promise.all(userSnapshot.docs.map(async (doc) => {
      const user = doc.data() as User;
      user.id = doc.id;
      // Get the lists for each user
      const userLists = collection(db, `users/${doc.id}/lists`);
      const listsSnapshot = await getDocs(userLists);
      user.lists = await Promise.all(listsSnapshot.docs.map(async (doc) => {
        const list = doc.data() as List;
        list.id = doc.id;
        // Get the items for each list
        const listItems = collection(db, `users/${user.id}/lists/${list.id}/items`);
        const itemsSnapshot = await getDocs(listItems);
        list.items = await Promise.all(itemsSnapshot.docs.map(async (doc) => {
          const item = doc.data() as Item;
          item.id = doc.id;
          return item;
        }));
        return list;
      }));
      return user;
    }));

    return userList;
  }
}
