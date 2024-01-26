import { useEffect } from 'react';
import './App.css';
import AppNavBar from './components/pages/AppNavBar';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import { useDispatch,useSelector } from 'react-redux';
import { getAuthUser } from './redux/actions';
import News from './components/pages/news';
import PreviousEvents from './components/pages/previousEvents';
import CosplayCompetitionRules from './components/pages/cosplayCompetitionRules';
import Articles from './components/pages/articles';
import Navbar2 from './components/pages/Navbar2';

function App() {
  const dispatch=useDispatch()
  const getAuth=()=>{
  dispatch(getAuthUser())
  }
  useEffect(getAuth,[])
  const isAuth=useSelector((state)=>state.isAuth)
  return (
    <div className="App">
      <header>
      <AppNavBar />
      <Navbar2 />
      </header>
    
    {isAuth &&
    <Routes>
      <Route path="/Dashboard" element={<Dashboard/>} />
      </Routes>
        }
      <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/news" element={<News />} />
  <Route path="/previousEvents" element={<PreviousEvents />} />
  <Route path="/cosplayCompetitionRules" element={<CosplayCompetitionRules />} />
  <Route path="/articles" element={<Articles />} />
</Routes>
  


    </div>
  );
}

export default App;
