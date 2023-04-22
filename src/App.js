import React from 'react';
import List from './Component/List';

const items = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
];

const App = () => {
  return (
    <div>
      <h1>List Example</h1>
      <List items={items} />
    </div>
  );
};

export default App;
