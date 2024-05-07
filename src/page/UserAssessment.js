import AdminHeader from "../components/AdminHeader";
import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const UserAssessment = () => {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [assess, setAssess] = useState([
        {
            aiQuizId: 1,
            countSolveTimes: 135,
            countNotRecommendTimes: 117
        },
        {
            aiQuizId: 2,
            countSolveTimes: 85,
            countNotRecommendTimes: 11
        },
        {
            aiQuizId: 3,
            countSolveTimes: 35,
            countNotRecommendTimes: 7
        }
    ]);

    const sortAssessment = (option) => {
        let sortedAssess = [...assess];
        if (option === 'id') {
            sortedAssess.sort((a, b) => a.aiQuizId - b.aiQuizId);
        } else if (option === 'ratio') {
            sortedAssess.sort((a, b) => {
                const ratioA = (a.countNotRecommendTimes / a.countSolveTimes);
                const ratioB = (b.countNotRecommendTimes / b.countSolveTimes);
                return ratioB - ratioA;
            });
        }
        setAssess(sortedAssess);
    };

    // react-select에서 사용할 옵션 객체 배열 생성
    const options = [
        { value: 'id', label: 'ID 순서로 정렬' },
        { value: 'ratio', label: '비율이 높은 순으로 정렬' }
    ];

    return (
        <div className="AdminEntire">
            <AdminHeader />
            <div className="UserText">사용자 평가 조회</div>
            {/* react-select 컴포넌트 추가 */}
            <Select
                options={options}
                onChange={(selectedOption) => sortAssessment(selectedOption.value)}
                className="AssessSelect"
                placeholder="정렬 옵션 선택"
            />
            <div className="AssessAll">
                <div className="AssessMenuAll">
                    <div className="AssessMenuItem1">생성 문제 ID</div><div className="AssessMenuItem2">풀이횟수</div>
                    <div className="AssessMenuItem3">비추천 개수</div><div className="AssessMenuItem4">비추천 비율</div>
                </div>
                {assess && assess.map((it) => {
                    const ratio = (it.countNotRecommendTimes / it.countSolveTimes) * 100;
                    const formattedRatio = ratio.toFixed(2);
                    return (
                        <div className="AssessItemAll" key={it.aiQuizId}>
                            <div className="AssessItem1">{it.aiQuizId}</div><div className="AssessItem2">{it.countSolveTimes}</div>
                            <div className="AssessItem3">{it.countNotRecommendTimes}</div>
                            <div className="AssessItem4">{formattedRatio}%</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default UserAssessment;
