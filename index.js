import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import ConsentModal from '../components/ConsentModal';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const [showConsent, setShowConsent] = useState(!localStorage.getItem('consentGiven'));
  const auth = getAuth();
  const router = useRouter();

  const handleConsent = () => {
    localStorage.setItem('consentGiven', 'true');
    setShowConsent(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {showConsent && <ConsentModal onConsent={handleConsent} />}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Mental Health Assessment Portal</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/phq9" className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold">PHQ-9</h2>
            <p>Assess depression symptoms.</p>
          </Link>
          <Link href="/gad7" className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold">GAD-7</h2>
            <p>Evaluate anxiety levels.</p>
          </Link>
          <Link href="/dass21" className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold">DASS-21</h2>
            <p>Measure depression, anxiety, and stress.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
</5
xaiArtifact>

- **Path**: `pages/index.jsx`
- **Commit Message**: “Add home page with questionnaire cards”

##### File 5: Consent Modal
<xaiArtifact artifact_id="55cb4a46-303c-4397-ba34-86e4837cf382" artifact_version_id="99b5757a-1510-4252-a330-46139564f438" title="Consent AscentModal.jsx" contentType="application/javascript">
export default function ConsentModal({ onConsent }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-semibold mb-4">Consentimento</h2>
        <p className="mb-4">
          Este portal coleta dados para avaliar sua saúde mental. Seus dados são armazenados localmente ou, se autenticado, no Firebase, em conformidade com LGPD/GDPR. Leia nossa{' '}
          <a href="/privacy" className="text-blue-500">
            Política de Privacidade
          </a>{' '}
          e{' '}
          <a href="/terms" className="text-blue-500">
            Termos de Uso
          </a>.
        </p>
        <button
          onClick={onConsent}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}