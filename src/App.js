import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'
import Completed from './Completed'
import Proceeding from './Proceeding'
import Important from './Important'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/completed" element={<Completed />}></Route>
        <Route path="/proceeding" element={<Proceeding />}></Route>
        <Route path="/important" element={<Important />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
