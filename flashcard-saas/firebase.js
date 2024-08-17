import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCW7wlIbHJ_cY8vnbtU2-dl5WXlfFK0IbA",
  authDomain: "ai-flashcard-saas-4f0db.firebaseapp.com",
  projectId: "ai-flashcard-saas-4f0db",
  storageBucket: "ai-flashcard-saas-4f0db.appspot.com",
  messagingSenderId: "711789082434",
  appId: "1:711789082434:web:e04d84afd4b42663e8fadb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
