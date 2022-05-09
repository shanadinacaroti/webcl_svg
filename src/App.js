import logo from './logo.svg';
import './App.css';
import eyeSvg from './resources/RoundEye.svg';
import SvgComponent from './components/svgComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <div>
            <SvgComponent/>
            <SvgComponent/>
        </div>
    </div>
  );
}

export default App;
