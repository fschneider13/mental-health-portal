import Navbar from '../components/Navbar';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Política de Privacidade</h1>
        <p>Este portal está em conformidade com a LGPD e GDPR. Os dados coletados são armazenados localmente (localStorage) ou, se autenticado, no Firebase, com consentimento explícito do usuário. Não compartilhamos dados com terceiros sem permissão.</p>
      </div>
    </div>
  );
}
