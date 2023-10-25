import './App.css';
import React from 'react';
import Button from './components/UI/atoms/Button';

function App() {
  return (
    <div>
      <p className="text-red-400">Red Text</p>
      <p className="text-stone-900">Blue Text</p>
      <Button className="text-red-400 ">button</Button>
      <Button className="bg-red-600 hover:bg-red-700">button</Button>
      <Button className="text-red-300">button</Button>
    </div>
  );
}

export default App;
