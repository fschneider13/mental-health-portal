import Questionnaire from '../components/Questionnaire';

const questions = [
  { text: "Placeholder: I found it hard to wind down", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I was aware of dryness of my mouth", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  // Add more placeholder questions to match DASS-21's 21 questions (7 depression, 7 anxiety, 7 stress)
  { text: "Placeholder: I couldn't seem to experience any positive feeling", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I found it difficult to work up the initiative", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I tended to over-react to situations", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I experienced trembling", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I felt that I was using a lot of nervous energy", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I was worried about situations in which I might panic", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I felt that I had nothing to look forward to", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I found myself getting agitated", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I found it difficult to relax", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I felt down-hearted and blue", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I was intolerant of anything that kept me from getting on", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I felt I was close to panic", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I was unable to become enthusiastic about anything", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I felt I wasn't worth much as a person", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I felt that I was rather touchy", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I was aware of the action of my heart", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I felt scared without any good reason", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I felt that life was meaningless", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
  { text: "Placeholder: I found myself getting impatient", options: ["Did not apply to me at all", "Applied to me to some degree", "Applied to me to a considerable degree", "Applied to me very much"] },
];

export default function DASS21() {
  return <Questionnaire questions={questions} type="dass21" />;
}
