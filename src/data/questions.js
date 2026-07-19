import javascript from './javascriptQuestions';
import html from './htmlQuestions';
import css from './cssQuestions';
import react from './reactQuestions';
import cybersecurity from './cybersecurityQuestions';
import typescript from './typescriptQuestions';
import python from './pythonQuestions';
import backend from './backendQuestions';
import sql from './sqlQuestions';
import nosql from './nosqlQuestions';
import aiEngineering from './aiEngineeringQuestions';
import artificialIntelligence from './artificialIntelligenceQuestions';
import dsa from './dsaQuestions';

const questions = [
  ...javascript,
  ...html,
  ...css,
  ...react,
  ...cybersecurity,
  ...typescript,
  ...python,
  ...backend,
  ...sql,
  ...nosql,
  ...aiEngineering,
  ...artificialIntelligence,
  ...dsa,
];

export default questions;

export const categories = [
  { name: 'JavaScript', count: javascript.length, color: 'text-yellow-400' },
  { name: 'HTML', count: html.length, color: 'text-orange-400' },
  { name: 'CSS', count: css.length, color: 'text-blue-400' },
  { name: 'React', count: react.length, color: 'text-cyan-400' },
  { name: 'TypeScript', count: typescript.length, color: 'text-blue-500' },
  { name: 'Python', count: python.length, color: 'text-green-400' },
  { name: 'Cybersecurity', count: cybersecurity.length, color: 'text-red-400' },
  { name: 'Backend', count: backend.length, color: 'text-purple-400' },
  { name: 'SQL', count: sql.length, color: 'text-emerald-400' },
  { name: 'NoSQL', count: nosql.length, color: 'text-pink-400' },
  { name: 'AI Engineering', count: aiEngineering.length, color: 'text-violet-400' },
  { name: 'Artificial Intelligence', count: artificialIntelligence.length, color: 'text-amber-400' },
  { name: 'DSA', count: dsa.length, color: 'text-teal-400' },
];
