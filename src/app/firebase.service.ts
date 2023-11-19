import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }
}
