export function calculateScore(type, answers) {
  const sum = answers.reduce((acc, val) => acc + val, 0);
  let category;

  switch (type) {
    case 'phq9':
      if (sum <= 4) category = 'Minimal';
      else if (sum <= 9) category = 'Mild';
      else if (sum <= 14) category = 'Moderate';
      else if (sum <= 19) category = 'Moderately Severe';
      else category = 'Severe';
      break;
    case 'gad7':
      if (sum <= 4) category = 'Minimal';
      else if (sum <= 9) category = 'Mild';
      else if (sum <= 14) category = 'Moderate';
      else category = 'Severe';
      break;
    case 'dass21':
      const depression = answers.slice(0, 7).reduce((acc, val) => acc + val, 0) * 2;
      const anxiety = answers.slice(7, 14).reduce((acc, val) => acc + val, 0) * 2;
      const stress = answers.slice(14, 21).reduce((acc, val) => acc + val, 0) * 2;
      return {
        score: { depression, anxiety, stress },
        category: {
          depression: getDASS21Category(depression, 'depression'),
          anxiety: getDASS21Category(anxiety, 'anxiety'),
          stress: getDASS21Category(stress, 'stress'),
        },
      };
    default:
      category = 'Unknown';
  }
  return { score: sum, category };
}

function getDASS21Category(score, type) {
  const ranges = {
    depression: { normal: 9, mild: 13, moderate: 20, severe: 27 },
    anxiety: { normal: 7, mild: 9, moderate: 14, severe: 19 },
    stress: { normal: 14, mild: 18, moderate: 25, severe: 33 },
  };
  if (score <= ranges[type].normal) return 'Normal';
  if (score <= ranges[type].mild) return 'Mild';
  if (score <= ranges[type].moderate) return 'Moderate';
  if (score <= ranges[type].severe) return 'Severe';
  return 'Extremely Severe';
}
