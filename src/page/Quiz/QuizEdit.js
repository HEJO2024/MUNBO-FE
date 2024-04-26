import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminButton from "../../components/AdminButton";
const QuizEdit=()=>{
    const navigate=useNavigate();
    const {id}=useParams();
   const [data,setData]=useState({
        quizId:"",
        subjectId:"",
        roundId:"",
        keywordId:"",
        quizContent:"",
        quizImg:"",
        answ:"",
         r_answ:"",
         wrgAnsw_explanation:"",
      })
    useEffect(() => {
        fetchuserData();
     }, []); //가져온 수정정보데이터 실행
    
  
       const fetchuserData = async () => {     
         try {
             const response = await axios.get(`/admin/quiz/view`);
             const userData = response.data.find(item => item.quizId ==id);
             setData({
                quizId:userData.quizId,
                subjectId:userData.subjectId,
                roundId:userData.roundId,
                keywordId:userData.keywordId,
                quizContent:userData.quizContent,
                quizImg:userData.quizImg,
                answ:JSON.parse(userData.answ),
                r_answ:userData.r_answ,
                wrgAnsw_explanation:userData.wrgAnsw_explanation,
             });

         }catch (error) {
          if(error.response.status===500){
           alert(error.response.data.message);
          }
          else if(error.response.status===401 || error.response.status===403){
            alert(error.response.data.message);
            sessionStorage.removeItem("token");
            navigate("/admin/login");
           }}
         } // api로 수정 정보 받아오는 함수

   const handleSubmit= async ()=>{
    axios.post(`/admin/quiz/update`, {
        quizId:data.quizId,
        subjectId:data.subjectId,
        roundId:data.roundId,
        keywordId:data.keywordId,
        quizContent:data.quizContent,
        quizImg:data.quizImg,
        answ:JSON.stringify(data.answ),
        r_answ:data.r_answ,
        wrgAnsw_explanation:data.wrgAnsw_explanation
       
     })
     .then(response => {        
         alert("문제가 수정되었습니다.");
     })
     .catch(error => {
        if(error.response.status===500){
         alert(error.response.data.message);
        }
        else if(error.response.status===401 || error.response.status===403){
            alert(error.response.data.message);
            sessionStorage.removeItem("token");
            navigate("/admin/login");
           }
     });
     navigate("/admin/quiz/view");
    }  // axios 이용하여 수정처리하는 함수
   const handleCancel=()=>{
   navigate(-1)
   }
         
   const handleChange = (event) => {
    const { name, value } = event.target;
    setData(prevState => ({
        ...prevState,
        [name]: value
    }));

}; //정보 수정 입력하면 바뀌는 함수
const handleAnswChange = (event, key) => {
    const { value } = event.target;
    setData(prevState => ({
        ...prevState,
        answ: {
            ...prevState.answ,
            [key]: value
        }
    }));
};
return(
    <div className="AdminEntire">
    <AdminHeader/>
    <div className="QuizButtonAll">
    <div className="QuizEditText">기출문제수정</div>
    <AdminButton text="이전" className="QuizButton1" onClick={handleCancel}/>
    <AdminButton text="완료" className="QuizButton2" onClick={handleSubmit}/></div>
    <textarea name="quizContent" value={data.quizContent} onChange={handleChange}  style={{ resize: 'none' }}  className="QuizContent"></textarea> 
    <img src={data.quizImg} />

    
    <div className="AnswAll">
            {data && Object.keys(data.answ).map(key => (
                <div key={key} className="Answ">
                    <div className="AnswKey">{key}</div>
                    <textarea className="AnswInput"
                        type="text" 
                        value={data.answ[key]} 
                        style={{ resize: 'none' }}
                        onChange={(e) => handleAnswChange(e, key)} 
                    />
                </div>
            ))}
        </div>
        <div className="R_answ"><div>정답</div>
        <input name="r_answ" value={data.r_answ} onChange={handleChange} className="R_answInput"></input> </div>
        <div className="WrgAnsw"><div className="WrgAnswText">해설</div>
        <textarea name="wrgAnsw_explanation" style={{ resize: 'none' }} value={data.wrgAnsw_explanation}onChange={handleChange} className="WrgAnswInput"></textarea> </div>
    </div>
)
};
export default QuizEdit;