import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Questionnaire({ questions, type }) {
  const [answers, setAnswers] = useState({});
  const router = useRouter();

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const handleSubmit = () => {
    const score = Object.values(answers).reduce((sum, val) => sum + parseInt(val) || 0, 0);
    const category = getCategory(score, type); // Placeholder logic
    router.push(`/results?type=${type}&score=${score}&category=${category}`);
  };

  const getCategory = (score, type) => {
    // Placeholder category logic (replace with actual thresholds)
    if (type === 'phq9') {
      if (score < 5) return 'None';
      if (score < 10) return 'Mild';
      if (score < 15) return 'Moderate';
      return 'Severe';
    } else if (type === 'gad7') {
      if (score < 5) return 'None';
      if (score < 10) return 'Mild';
      if (score < 15) return 'Moderate';
      return 'Severe';
    }
    return 'Unknown';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{type.toUpperCase()} Questionnaire</h1>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p className="mb-2">{question.text}</p>
          {question.options.map((option, optIndex) => (
            <label key={optIndex} className="block">
              <input
                type="radio"
                name={`question-${index}`}
                value={optIndex}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-6 p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        aria-label="Submit questionnaire"
      >
        Submit
      </button>
      <Link href="/" className="mt-4 inline-block text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
