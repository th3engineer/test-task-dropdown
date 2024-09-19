import { useState } from 'react';

import { Dropdown } from './components/dropdown';

const mockData = [
  { type: 'symbol', name: 'EA', description: 'Electronic Arts Inc.' },
  { type: 'symbol', name: 'RA-USD', description: 'EagleCoin USD' },
  { type: 'symbol', name: 'EADSF', description: 'Airbus Se' },
  { type: 'page', name: 'EA Quant Rating' },
  { type: 'page', name: 'EA Income Statement' },
  { type: 'person', name: 'Early Retiree' },
  {
    type: 'headline',
    title: 'Electronic Arts, Inc. (EA) Q4 2023 Earnings Call Transcript'
  },
  {
    type: 'headline',
    title: 'Electronic Arts: Uncertainty Around EA ports FC Demand'
  }
];

function App() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <Dropdown
        options={mockData}
        search={search}
        onSearch={setSearch}
      />
    </div>
  );
}

export default App;
