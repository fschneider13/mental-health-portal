const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let authPromise = null;

if (typeof window !== 'undefined') {
  authPromise = import('firebase/app')
    .then(({ initializeApp }) => initializeApp(firebaseConfig))
    .then((app) => import('firebase/auth'))
    .then(({ getAuth }) => getAuth(app));
}

export const getAuthInstance = () => authPromise;
