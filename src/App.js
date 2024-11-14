import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'
import Completed from './Completed'
import Proceeding from './Proceeding'
import Important from './Important'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

console.log('test');

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

      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
    </div>
  );
}

export default App;
