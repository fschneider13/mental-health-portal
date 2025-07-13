import { useState, useEffect } from 'react';
import Questionnaire from '../components/Questionnaire';

const questions = [
  { text: "Placeholder: Little interest or pleasure in doing things", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Feeling down, depressed, or hopeless", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Trouble falling or staying asleep", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Feeling tired or having little energy", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Poor appetite or overeating", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Feeling bad about yourself", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Trouble concentrating on things", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Moving or speaking slowly", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Thoughts of self-harm", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
];

export default function PHQ9() {
  const [Navbar, setNavbar] = useState(null);

  useEffect(() => {
    setNavbar(() => require('../components/Navbar').default);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {Navbar && <Navbar />}
      <Questionnaire questions={questions} type="phq9" />
    </div>
  );
}
