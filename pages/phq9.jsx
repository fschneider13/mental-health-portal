import Questionnaire from '../components/Questionnaire';

const questions = [
  // Add official PHQ-9 questions here
  // Example: { text: "Little interest or pleasure in doing things", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
];

export default function PHQ9() {
  return <Questionnaire questions={questions} type="phq9" />;
}
