import { useState } from 'react';
import Link from 'next/link';
import ConsentModal from '../components/ConsentModal';
import Navbar from '../components/Navbar';

export default function Home() {
  const [showConsent, setShowConsent] = useState(true);

  const handleConsent = () => {
    setShowConsent(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <Navbar />
      {showConsent && <ConsentModal onConsent={handleConsent} />}
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Mental Health Portal</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-prose mx-auto">
          Welcome! Select a questionnaire to assess your mental health and gain insights into your well-being.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link
            href="/phq9"
            className="p-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            PHQ-9 (Depression)
          </Link>
          <Link
            href="/gad7"
            className="p-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            GAD-7 (Anxiety)
          </Link>
          <Link
            href="/dass21"
            className="p-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            DASS-21 (Depression, Anxiety, Stress)
          </Link>
        </div>
      </div>
    </div>
  );
}
