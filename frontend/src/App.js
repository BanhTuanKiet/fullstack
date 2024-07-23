import Home from "./page/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./page/Login";
import NotFound from "./page/NotFound";
import NotServe from "./page/NotServe";

function App() {
  return (
    <BrowserRouter>
      <NotServe />
      <Routes>
        {/* <Route path="/" element={<Home />}> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
