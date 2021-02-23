import {
  Switch, Route, Redirect, NavLink,
} from 'react-router-dom';
import CoinList from '../containers/CoinList';
import Coin from '../containers/Coin';
import styles from '../styles/App.module.scss';
import Header from './Header';

function App() {
  return (
    <div className={styles.App}>
      <nav>
        <NavLink to="/">Home</NavLink>
      </nav>
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
