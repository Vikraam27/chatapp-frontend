import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './pages/App';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact><App /></Route>
      <Route path="/signup"><SignUpPage /></Route>
      <Route path="/signin"><SignInPage /></Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
