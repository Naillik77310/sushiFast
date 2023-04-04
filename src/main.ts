/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from "firebase/app";

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  
  
const firebaseConfig = {
  apiKey: "AIzaSyAkhny9qXOrNTRivFDENtAYaw0LBMRfKKo",
  authDomain: "sushifast-26585.firebaseapp.com",
  projectId: "sushifast-26585",
  storageBucket: "sushifast-26585.appspot.com",
  messagingSenderId: "36602257243",
  appId: "1:36602257243:web:9a3c7cfcae6d52ec3d047e"
  };

const app = initializeApp(firebaseConfig);
