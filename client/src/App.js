//import logo from './logo.svg';
import './App.css';
import Fullstack from './components/Fullstack/Fullstack';

const app = {    
  padding: '0px',
  color: 'gray',
};

function App() {  
  return (
    <div className="App" style={app}>          
      <div>
        {<Fullstack />}
      </div>
    </div>
  );
}

export default App;
