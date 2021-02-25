import { Switch, Route, Redirect } from 'react-router-dom';
import CoinList from '../containers/CoinList';
import Coin from '../containers/Coin';
import '../styles/App.scss';
import Header from './Header';

function App() {
  return (
    <div className="">
      <Header />
      <Switch>
        <Route path="/" exact component={CoinList} />
        <Route path="/coin/:coin" component={Coin} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
