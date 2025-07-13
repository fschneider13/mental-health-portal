import { useRouter } from 'next/router';
import { Bar } from 'recharts';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import jsPDF from 'jspdf';
import Link from 'next/link';

export default function Results() {
  const router = useRouter();
  const { type, score, category } = router.query;

  if (!type || !score || !category) {
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

  const data = [{ name: 'Score', value: Number(score) }];

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Results for ${type.toUpperCase()}`, 10, 10);
    doc.text(`Score: ${score}`, 10, 20);
    doc.text(`Category: ${category}`, 10, 30);
    doc.save(`${type}_results.pdf`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Results</h1>
      <p>Type: {type.toUpperCase()}</p>
      <p>Score: {score}</p>
      <p>Category: {category}</p>
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
