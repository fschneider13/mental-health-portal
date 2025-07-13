import Questionnaire from '../components/Questionnaire';

const dass21Questions = [
  { text: 'I found it hard to wind down', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I was aware of dryness of my mouth', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: "I couldn't seem to experience any positive feeling at all", options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I found it difficult to work up the initiative to do things', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I tended to over-react to situations', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I experienced trembling (e.g., in the hands)', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I felt that I was using a lot of nervous energy', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I was worried about situations in which I might panic and make a fool of myself', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I felt that I had nothing to look forward to', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I found myself getting agitated', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I found it difficult to relax', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I felt down-hearted and blue', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I was intolerant of anything that kept me from getting on with what I was doing', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I felt I was close to panic', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I was unable to become enthusiastic about anything', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: "I felt I wasn't worth much as a person", options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I felt that I was rather touchy', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat)', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I felt scared without any good reason', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
  { text: 'I felt that life was meaningless', options: ['Did not apply to me at all', 'Applied to me to some degree', 'Applied to me to a considerable degree', 'Applied to me very much'] },
];

export default function DASS21() {
  return <Questionnaire questions={questions} type="dass21" />;
}
