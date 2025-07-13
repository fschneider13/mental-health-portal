import { useRouter } from 'next/router';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import jsPDF from 'jspdf';
import Link from 'next/link';

export default function Results() {
  const router = useRouter();
  const { type } = router.query;
  const score = router.query.score ? JSON.parse(router.query.score) : null;
  const category = router.query.category ? JSON.parse(router.query.category) : null;

  if (!type || score === null || category === null) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Results Unavailable</h1>
        <p>Please complete a questionnaire to view results.</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  const data = Array.isArray(score) || typeof score === 'object'
    ? Object.entries(typeof score === 'object' ? score : {})
        .map(([k, v]) => ({ name: k, value: v }))
    : [{ name: 'Score', value: Number(score) }];

  const getDiagnosis = () => {
    if (type === 'phq9') {
      const map = {
        Minimal: 'Minimal or no depression',
        Mild: 'Mild depression symptoms',
        Moderate: 'Moderate depression symptoms',
        'Moderately Severe': 'Moderately severe depression',
        Severe: 'Severe depression',
      };
      return map[category] || '';
    }
    if (type === 'gad7') {
      const map = {
        Minimal: 'Minimal anxiety',
        Mild: 'Mild anxiety',
        Moderate: 'Moderate anxiety',
        Severe: 'Severe anxiety',
      };
      return map[category] || '';
    }
    if (type === 'dass21') {
      return `Depression: ${category.depression}, Anxiety: ${category.anxiety}, Stress: ${category.stress}`;
    }
    return '';
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Results for ${type.toUpperCase()}`, 10, 10);
    doc.text(`Score: ${JSON.stringify(score)}`, 10, 20);
    doc.text(`Category: ${JSON.stringify(category)}`, 10, 30);
    doc.save(`${type}_results.pdf`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Results</h1>
      <p>Type: {type.toUpperCase()}</p>
      <p>Score: {JSON.stringify(score)}</p>
      <p>Category: {JSON.stringify(category)}</p>
      <p className="mt-2 font-semibold">Diagnostic: {getDiagnosis()}</p>
      <BarChart width={300} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
      <button
        onClick={handleExportPDF}
        className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
        aria-label="Export results as PDF"
      >
        Export as PDF
      </button>
      <Link href="/" className="mt-4 inline-block text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
