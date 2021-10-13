import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import History from './Pages/History/History';
import Header from './Pages/Header/Header';
import Welcome from './Pages/Welcome/Welcome';
import ErrMsg from './Pages/ErrMsg/ErrMsg';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import FindMatchId from './Pages/FindMatchId.tsx/FindMatchId';
import FindMatchIdResult from './Pages/FindMatchId.tsx/FindMatchIdResult';

function App() {
  return (
    <Router>
    <div id={styles.full}>
      <header>
        <Header />
      </header>
      <div id={styles.contents}>
        <Switch>
          <Route path="/analyze/:gameId" exact component={History} />
          <Route path="/error/:errMsg" exact component={ErrMsg} />
          <Route path="/findmatchid/:nickname" exact component={FindMatchIdResult} />
          <Route path="/findmatchid" exact component={FindMatchId} />
          <Route path="/" component={Welcome} exact/>
          <Route component={ErrMsg} />
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
