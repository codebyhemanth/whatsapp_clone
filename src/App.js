
import './App.css';
import SideBar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from "./Login"
import { useStateValue } from './StateProvider';

function App() {
 const [{user},dispatch]=useStateValue();
  return (
    <div className="App">
      {!user?(
        <Login/>
      ):<div className="app_body">
      <Router>
      <Switch>
        
     
      <Route path="/rooms/:roomId">
        <SideBar/>
        <Chat/>
      </Route>
     <Route path="/">
       <SideBar/>
       
     </Route>
      </Switch>
      </Router>
      </div>}
      
      
    </div>
  );
}

export default App;
