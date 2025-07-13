import Navbar from '../components/Navbar';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Termos de Uso</h1>
        <p>Ao usar este portal, você concorda em responder aos questionários de forma honesta e utilizar os resultados para fins informativos. Este portal não substitui aconselhamento médico profissional.</p>
      </div>
    </div>
  );
}
