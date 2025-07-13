import Questionnaire from '../components/Questionnaire';

const questions = [
  { text: "Placeholder: Little interest or pleasure in doing things", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Feeling down, depressed, or hopeless", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  // Add more placeholder questions to match PHQ-9's 9 questions
  { text: "Placeholder: Trouble falling or staying asleep", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Feeling tired or having little energy", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Poor appetite or overeating", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Feeling bad about yourself", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Trouble concentrating on things", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Moving or speaking slowly", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Thoughts of self-harm", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
];

export default function PHQ9() {
  return <Questionnaire questions={questions} type="phq9" />;
}
