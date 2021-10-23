import {Route, Router, Switch} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
          <div>
              <Switch>
                  <Route exact path="/" component={Auth(LandingPage, null)} />
                  <Route exact path="/login" component={Auth(LoginPage, false)} />
                  <Route exact path="/register" component={Auth(RegisterPage, false) } />
              </Switch>
          </div>
  );
}

export default App;
