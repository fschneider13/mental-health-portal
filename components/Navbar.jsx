import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAuthInstance } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    getAuthInstance().then((authInstance) => {
      setAuth(authInstance);
      const unsubscribe = authInstance.onAuthStateChanged((user) => {
        setUser(user);
      });
      return () => unsubscribe();
    });
  }, []);

  const handleGoogleLogin = async () => {
    if (auth) {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error('Google Login Error:', error.message);
        alert('Login failed: ' + error.message);
      }
    } else {
      alert('Authentication not initialized. Please refresh the page.');
    }
  };

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Logout Error:', error.message);
        alert('Logout failed: ' + error.message);
      }
    } else {
      alert('Authentication not initialized.');
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-blue-200">
          Mental Health Portal
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-500 rounded hover:bg-red-600"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="p-2 bg-green-500 rounded hover:bg-green-600"
              aria-label="Login with Google"
            >
              Login with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
