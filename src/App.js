import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import AdminLogin from './page/AdminLogin';
import UserView from './page/User/UserView';
import UserEdit from './page/User/UserEdit';
import QuizView from './page/Quiz/QuizView';
import QuizEdit from './page/Quiz/QuizEdit';
import ContentSelect from './page/ContentSelect';
import RoundView from './page/Round/RoundView';
import RoundCreate from './page/Round/RoundCreate';
import RoundEdit from './page/Round/RoundEdit';
import SubjectView from './page/Subject/SubjectView';
import SubjectCreate from './page/Subject/SubjectCreate';
import SubjectEdit from './page/Subject/SubjectEdit';
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

  <Route path='quiz/view' element={<QuizView/>}/>
  <Route path="quiz/edit/:id" element={<QuizEdit/>}/>

  <Route path='content/select' element={<ContentSelect/>}/>

  <Route path="round/view" element={<RoundView/>}/>
  <Route path='round/create'element={<RoundCreate/>}/>
  <Route path='round/edit/:id'element={<RoundEdit/>}/>

  <Route path="subject/view" element={<SubjectView/>}/>
  <Route path='subject/create'element={<SubjectCreate/>}/>
  <Route path='subject/edit/:id'element={<SubjectEdit/>}/>
</Route>
</Routes>
    </div>
    </BrowserRouter>

    
    
  );
}

export default App;
