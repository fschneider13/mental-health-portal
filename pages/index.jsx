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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {showConsent && <ConsentModal onConsent={handleConsent} />}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Mental Health Portal</h1>
        <p className="mb-4">Select a questionnaire to assess your mental health:</p>
        <div className="flex flex-col gap-4">
          <Link href="/phq9" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            PHQ-9 (Depression)
          </Link>
          <Link href="/gad7" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            GAD-7 (Anxiety)
          </Link>
          <Link href="/dass21" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            DASS-21 (Depression, Anxiety, Stress)
          </Link>
        </div>
      </div>
    </div>
  );
}
