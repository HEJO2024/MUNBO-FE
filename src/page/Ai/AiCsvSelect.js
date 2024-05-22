import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import axios from "axios";
import AdminButton from "../../components/AdminButton";
import { Link, useNavigate, useParams } from "react-router-dom";
const AiCsvSelect=()=>{
    const [quiz,setQuiz]=useState([]);
    const navigate=useNavigate();
    const {id}=useParams();
    const token=sessionStorage.getItem("token");
    const [select,setSelect]=useState([]);
    const [selectAll, setSelectAll] = useState(false);
    useEffect(() => {
        fetchquizData();
     }, []); //가져온 문제데이터 실행
  useEffect(()=>{
console.log(select)
  },[select])
       const fetchquizData = async () => {     
         try {
             const response = await axios.get(`/admin/quiz/listView?subjectId=${id}`, { 
              headers:{
               'Authorization':token
             }
            
           })
           if(response)
             setQuiz(response.data.quiz);

         }catch (error) {
          if(error.response.status===500){
          alert(error.response.data.message);
          }
          else if(error.response.status===401 || error.response.status===403){
            alert(error.response.data.message);
            sessionStorage.removeItem("token");
            navigate("/admin/login");
           }}
         }  // api로 문제 정보 받아오는 함수
         const handleCheckboxChange = (quizId) => {
            setSelect((prevSelect) => {
                if (prevSelect.includes(quizId)) {
                    return prevSelect.filter((id) => id !== quizId);
                } else {
                    return [...prevSelect, quizId];
                }
            });
        };
        const handleSelectAllChange = () => {
            setSelectAll((prevSelectAll) => {
                const newSelectAll = !prevSelectAll;
                if (newSelectAll) {
                    const allQuizIds = quiz.map((it) => it.quizId);
                    setSelect(allQuizIds);
                } else {
                    setSelect([]);
                }
                return newSelectAll;
            });
        };
        const handleSubmit= async ()=>{
            axios.post(`/admin/csv_manager`, {
               quizzes:select
            }, {
                headers: {
                    'Authorization': token
                }
            })
            .then(response => {        
                alert(" csv로 변환 되었습니다.");
                navigate(`/admin/ai/csv/subject`);
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
return(
<div className="AdminEntire">
    <AdminHeader/>
    <div className="UserText">기출문제 csv변환 </div>
    <AdminButton text="제출" className="CsvButton" onClick={handleSubmit}/>
    <div className="CsvAll">
    <div className="CsvMenuList">
        <div className="CsvMenuItem1">ID</div> <div className="CsvMenuItem2">문제</div>  
        <div className="CsvMenuItem3">전체
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                        />
                       
                    </div>
    </div>
    <div>
    {quiz&&quiz.map((it)=>{
       return(
        <div className="CsvList">         
        <div className="CsvItem1">{it.quizId}</div>
        <div className="CsvItem2">{it.quizContent}</div>
        <div className="CsvItem3"> <input
          type="checkbox"
          checked={select.includes(it.quizId)}
          onChange={() => handleCheckboxChange(it.quizId)}
        /></div> 
        </div>
       )
    })}
    </div>
    </div>
</div>
)
};
export default AiCsvSelect;