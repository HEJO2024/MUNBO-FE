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
import KeywordView from './page/Keyword/KeywordView';
import KeywordCreate from './page/Keyword/KeywordCreate';
import KeywordEdit from './page/Keyword/KeywordEdit';
import QuizSubjectList from './page/Quiz/QuizSubjectList';
import AnalyticsSelect from './page/AnalyticsSelect';
import ViewRate from './page/ViewRate';
import UserAssessment from './page/UserAssessment';
import AiSelect from './page/AiSelect';
import AiPromptEdit from './page/Ai/AiPromptEdit';
import AiPrompt from './page/Ai/AiPrompt';
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
   
  <Route path='quiz/subject/view' element={<QuizSubjectList/>}/>
  <Route path='quiz/view/:id' element={<QuizView/>}/>
  <Route path="quiz/edit/:id/:subjectId" element={<QuizEdit/>}/>

  <Route path='content/select' element={<ContentSelect/>}/>

  <Route path="round/view" element={<RoundView/>}/>
  <Route path='round/create'element={<RoundCreate/>}/>
  <Route path='round/edit/:id'element={<RoundEdit/>}/>

  <Route path="subject/view" element={<SubjectView/>}/>
  <Route path='subject/create'element={<SubjectCreate/>}/>
  <Route path='subject/edit/:id'element={<SubjectEdit/>}/>

  <Route path="keyword/view" element={<KeywordView/>}/>
  <Route path='keyword/create'element={<KeywordCreate/>}/>
  <Route path='keyword/edit/:id'element={<KeywordEdit/>}/>

  <Route path="analytics/select" element={<AnalyticsSelect/>}/>
  <Route path="viewrate" element={<ViewRate/>}/>
  <Route path="userassessment" element={<UserAssessment/>}/>

  <Route path="ai/select" element={<AiSelect/>}/>
  <Route path="ai/aiprompt" element={<AiPrompt/>}/>
  <Route path="ai/aiprompt/edit" element={<AiPromptEdit/>}/>
</Route>
</Routes>
    </div>
    </BrowserRouter>

    
    
  );
}

export default App;
