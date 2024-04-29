import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import AdminLogin from './page/AdminLogin';
import UserView from './page/User/UserView';
import UserEdit from './page/User/UserEdit';

function App() {


  return (
       
    <BrowserRouter>
    <div className="App">
      
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/admin'>
  <Route path='login' element={<AdminLogin/>}/>

  <Route path='user/view' element={<UserView/>}/>
  <Route path='user/edit/:id' element={<UserEdit/>}/>


</Route>
</Routes>
    </div>
    </BrowserRouter>

    
    
  );
}

export default App;
