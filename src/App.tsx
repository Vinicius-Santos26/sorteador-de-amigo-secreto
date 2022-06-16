import Configuracao from 'paginas/Configuracao';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Configuracao />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
