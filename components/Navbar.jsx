import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import Link from 'next/link';

export default function Navbar() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-white font-bold">Home</Link>
        <button onClick={handleLogin} className="text-white">Login with Google</button>
      </div>
    </nav>
  );
}
