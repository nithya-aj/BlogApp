import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Auth from "./components/Auth";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
