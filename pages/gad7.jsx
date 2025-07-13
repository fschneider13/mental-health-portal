import Questionnaire from '../components/Questionnaire';

const questions = [
  // Add official GAD7 questions here
  // Example: { text: "Little interest or pleasure in doing things", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
];

export default function GAD7() {
  return <Questionnaire questions={questions} type="gad7" />;
}
