import Link from 'next/link'; // Ensure this is present

export default function ConsentModal({ onConsent }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-semibold mb-4">Consentimento</h2>
        <p className="mb-4">
          Este portal coleta dados para avaliar sua saúde mental. Seus dados são armazenados localmente ou, se autenticado, no Firebase, em conformidade com LGPD/GDPR. Leia nossa{' '}
          <Link href="/privacy" className="text-blue-500">
            Política de Privacidade
          </Link>{' '}
          e{' '}
          <Link href="/terms" className="text-blue-500">
            Termos de Uso
          </Link>.
        </p>
        <button
          onClick={onConsent}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          aria-label="Aceitar consentimento"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
