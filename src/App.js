import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upload from './pages/Upload/Upload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
