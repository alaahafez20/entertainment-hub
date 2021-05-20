import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Trending from './components/Trending/Trending'
import Movies from './components/Movies/Movies'
import Series from './components/Series/Series'
import Search from './components/Search/Search'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="app">
        <Container>
          <Switch>
            <Route path='/' component={Trending} exact></Route>
            <Route path='/movies' component={Movies}></Route>
            <Route path='/series' component={Series}></Route>
            <Route path='/search' component={Search}></Route>
          </Switch>
        </Container>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
