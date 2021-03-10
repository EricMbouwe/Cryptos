import { Switch, Route, Redirect } from 'react-router-dom';
import CoinList from '../containers/CoinList';
import Coin from '../containers/Coin';
import '../styles/App.scss';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={CoinList} />
        <Route path="/coin/:coin" component={Coin} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
