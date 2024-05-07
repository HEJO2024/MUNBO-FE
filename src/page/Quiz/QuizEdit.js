import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminButton from "../../components/AdminButton";
const QuizEdit=()=>{
    const navigate=useNavigate();
    const {id,subjectId}=useParams();
    const [keyword,setKeyword]=useState("");
    const token=sessionStorage.getItem("token")
   const [data,setData]=useState({
        quizId:"",
        quizContent:"",
        answ_1:"",
        answ_2:"",
        answ_3:"",
        answ_4:"",
         r_answ:"",
         wrgAnsw_explanation:"",
      })
      const [round,setRound]=useState("")
      useEffect(() =>{ 
        fetchData()
    },[]);

    const fetchData = async () => {
        try {
            const quizResponse = await axios.get(`/admin/quiz/view?quizId=${id}`, {
                headers:{
                 'Authorization':token
               }
             })
            const quizData = quizResponse.data.quiz;
            const quizRound=quizResponse.data.roundName;
            const keywordName=quizResponse.data.keywordName;
            
            if(quizData&&quizRound){
            setData({
                quizId: quizData.quizId,
                quizContent: quizData.quizContent,
                answ_1: quizData.answ_1,
                answ_2: quizData.answ_2,
                answ_3: quizData.answ_3,
                answ_4: quizData.answ_4,
                r_answ: quizData.r_answ,
                wrgAnsw_explanation: quizData.wrgAnsw_explanation,
            });
            setRound(quizRound);
            setKeyword(keywordName);
        }}catch (error) {
            if(error.response.status===500){
            alert(error.response.data.message);
            }
            else if(error.response.status===401 || error.response.status===403){
              alert(error.response.data.message);
              sessionStorage.removeItem("token");
              navigate("/admin/login");
             }}
           }  // api로 문제 정보 받아오는 함수 


           const handleSubmit = async () => {
            axios.put(`/admin/quiz/update`, {
                quizId: data.quizId,
                quizContent: data.quizContent,
                answ_1: data.answ_1,
                answ_2: data.answ_2,
                answ_3: data.answ_3,
                answ_4: data.answ_4,
                r_answ: data.r_answ,
                wrgAnsw_explanation: data.wrgAnsw_explanation
            }, {
                headers: {
                    'Authorization': token
                }
            })
            .then(response => {        
                alert("문제가 수정되었습니다.");
                navigate(`/admin/quiz/view/${subjectId}`);
                window.location.reload();
            })
            .catch(error => {
                if (error.response.status === 500) {
                    alert(error.response.data.message);
                } else if (error.response.status === 401 || error.response.status === 403) {
                    alert(error.response.data.message);
                    sessionStorage.removeItem("token");
                    navigate("/admin/login");
                }
            });
        }
          // axios 이용하여 수정처리하는 함수
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




return(
    <div className="AdminEntire">
    <AdminHeader/>
    <div className="QuizButtonAll">
    <div className="QuizEditText">기출문제수정</div>
    <AdminButton text="이전" className="QuizButton1" onClick={handleCancel}/>
    <AdminButton text="완료" className="QuizButton2" onClick={handleSubmit}/></div>
    <div className="QuizRound">{round && round.roundName}</div>
    <textarea name="quizContent" value={data.quizContent} onChange={handleChange}  style={{ resize: 'none' }}  className="QuizContent"></textarea> 

    
    <div className="AnswAll">
                <div className="Answ">
                    <div className="AnswKey">1:</div>
                    <textarea className="AnswInput"  name="answ_1" type="text" value={data.answ_1} 
                     style={{ resize: 'none' }} onChange={handleChange} />
                </div>
                <div className="Answ">
                    <div className="AnswKey">2:</div>
                    <textarea className="AnswInput"  name="answ_2" type="text" value={data.answ_2} 
                     style={{ resize: 'none' }} onChange={handleChange} />
                </div>
                <div className="Answ">
                    <div className="AnswKey">3:</div>
                    <textarea className="AnswInput"  name="answ_3" type="text" value={data.answ_3} 
                     style={{ resize: 'none' }} onChange={handleChange} />
                </div>
                <div className="Answ">
                    <div className="AnswKey">4:</div>
                    <textarea className="AnswInput"  name="answ_4" type="text" value={data.answ_4} 
                     style={{ resize: 'none' }} onChange={handleChange} />
                </div>
        </div>
        <div className="R_answ"><div>정답</div>
        <input name="r_answ" value={data.r_answ} onChange={handleChange} className="R_answInput"></input> </div>
        <div className="WrgAnsw"><div className="WrgAnswText">해설</div>
        <textarea name="wrgAnsw_explanation" style={{ resize: 'none' }} value={data.wrgAnsw_explanation}onChange={handleChange} className="WrgAnswInput"></textarea> </div>
        <div className="SelectKeywordAll"><div className="KeywordText">키워드</div>
        <div>{keyword}</div>
      </div>
    </div>
)
};
export default QuizEdit;