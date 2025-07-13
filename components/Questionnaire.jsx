import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getAuthInstance } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { calculateScore } from '../lib/scoring';

export default function Questionnaire({ questions, type }) {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getAuthInstance().then((authInstance) => {
      setAuth(authInstance);
      const unsubscribe = authInstance.onAuthStateChanged((u) => setUser(u));
      return () => unsubscribe();
    });
  }, []);

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      alert('Please select an option to proceed.');
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const answerValues = questions.map((_, idx) => Number(answers[idx]));
    const { score, category } = calculateScore(type, answerValues);
    const scoreParam = encodeURIComponent(JSON.stringify(score));
    const categoryParam = encodeURIComponent(JSON.stringify(category));
    router.push(`/results?type=${type}&score=${scoreParam}&category=${categoryParam}`);
  };

  if (!auth || !user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="mb-4">Please login with Google to start the questionnaire.</p>
        <button
          onClick={async () => {
            if (auth) {
              const provider = new GoogleAuthProvider();
              try {
                await signInWithPopup(auth, provider);
              } catch (err) {
                alert('Login failed: ' + err.message);
              }
            }
          }}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Login with Google
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {type.toUpperCase()} Questionnaire
      </h1>
      <div className="mb-4">
        <p className="mb-2 font-medium">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <p className="mb-2">{question.text}</p>
        {question.options.map((option, optIndex) => (
          <label key={optIndex} className="block">
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              value={optIndex}
              checked={answers[currentQuestion] === optIndex}
              onChange={() => handleAnswerChange(currentQuestion, optIndex)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        {currentQuestion > 0 && (
          <button
            onClick={handlePrevious}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
        )}
        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="ml-auto p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next Question
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        )}
      </div>
      <Link href="/" className="mt-8 inline-block text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
