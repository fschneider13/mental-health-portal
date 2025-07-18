import { useState, useEffect } from 'react';
import Questionnaire from '../components/Questionnaire';

const questions = [
  { text: "Placeholder: Feeling nervous, anxious, or on edge", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Not being able to stop or control worrying", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Worrying too much about different things", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Trouble relaxing", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Being so restless that it is hard to sit still", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Becoming easily annoyed or irritable", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { text: "Placeholder: Feeling afraid as if something awful might happen", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
];

export default function GAD7() {
  const [Navbar, setNavbar] = useState(null);

  useEffect(() => {
    setNavbar(() => require('../components/Navbar').default);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {Navbar && <Navbar />}
      <Questionnaire questions={questions} type="gad7" />
    </div>
  );
}
