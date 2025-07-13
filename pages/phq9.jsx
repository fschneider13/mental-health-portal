import Questionnaire from '../components/Questionnaire';

const phq9Questions = [
  { text: 'Little interest or pleasure in doing things', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
  { text: 'Feeling down, depressed, or hopeless', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
  { text: 'Trouble falling or staying asleep, or sleeping too much', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
  { text: 'Feeling tired or having little energy', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
  { text: 'Poor appetite or overeating', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
  { text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
  { text: 'Trouble concentrating on things, such as reading the newspaper or watching television', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
  { text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
  { text: 'Thoughts that you would be better off dead, or of hurting yourself in some way', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
];

export default function PHQ9() {
  return <Questionnaire questions={questions} type="phq9" />;
}
