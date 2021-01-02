import './App.css';
import Page from './containers/Page';
import {Route} from 'react-router-dom'
import About from './components/About/About'
import Offer from './components/Offer/Offer'


function App() {
  return (
    <div className="App">
      <Route path="/about" exact component={About}/>
      <Route path="/offer" exact component={Offer}/>
      <Route path="/" exact component={Page}/>

    </div>
  );
}

export default App;
