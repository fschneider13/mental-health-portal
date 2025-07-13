import Questionnaire from '../components/Questionnaire';

const questions = [
  // Add official DASS21 questions here
  // Example: { text: "Little interest or pleasure in doing things", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
];

export default function DASS21() {
  return <Questionnaire questions={questions} type="dass219" />;
}
