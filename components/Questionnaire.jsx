import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { calculateScore } from '../lib/scoring';

export default function Questionnaire({ questions, type }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedProgress = localStorage.getItem(`${type}_progress`);
    if (savedProgress) {
      const { current, ans } = JSON.parse(savedProgress);
      setCurrentQuestion(current);
      setAnswers(ans);
    }
  }, [type]);

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    localStorage.setItem(
      `${type}_progress`,
      JSON.stringify({ current: currentQuestion + 1, ans: newAnswers })
    );

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculateScore(type, newAnswers);
      router.push({
        pathname: '/results',
        query: { type, score: result.score, category: result.category },
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].text}</h2>
      <div className="flex flex-col gap-2">
        {questions[currentQuestion].options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
