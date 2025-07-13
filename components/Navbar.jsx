import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Login Error:', error.message);
      alert('Login failed: ' + error.message); // Notify user of failure
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout Error:', error.message);
      alert('Logout failed: ' + error.message);
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
