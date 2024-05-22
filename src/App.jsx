import "./App.css";
import { AppView } from "./default";
 //import ButtonAppBar from './default/bottombar';
 import Payload from "./default/Payload";
 import { HashRouter as Router, Route,Routes} from 'react-router-dom';
function App() {
  return (
    <Router>
   {/* style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} */}
    <div>
       <Routes>
       <Route exact path="/" Component={AppView}/>
       <Route path="/payload" Component={Payload}/>
       </Routes>
    </div> 
  
   </Router>
  );
}

export default App;
