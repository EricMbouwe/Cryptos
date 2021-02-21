import {
  Switch, Route, Redirect, NavLink,
} from 'react-router-dom';
import CryptoList from '../containers/CryptoList';
import Crypto from '../containers/Crypto';
import styles from '../styles/App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <nav>
        <NavLink to="/">Search</NavLink>
      </nav>
      <Switch>
        <Route path="/" exact component={CryptoList} />
        <Route path="/coin/:coin" component={Crypto} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
