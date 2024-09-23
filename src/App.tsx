import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { QuizPage } from './pages/quiz/QuizPage';
import { QuizProvider } from './contexts/QuizContext';
import { ResultPage } from './pages/quiz/ResultPage';

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/results" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;
