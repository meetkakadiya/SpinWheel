import './App.css';
import  Form  from './Page/Form';
import SpinWheel from './Page/SpinWheel';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpinWheel/>}/>
        <Route path="/form" element={<Form/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
