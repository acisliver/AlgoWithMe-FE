import React, { useEffect, useState } from 'react'
import ProblemItem from '../Problem/ProblemItem'

export default function index() {
    const [problems, setProblems] = useState([]);
    useEffect(() => {
        // API로부터 데이터를 가져오는 코드 (fetch, axios 등을 사용)
        fetch('/api/v1/problems')
          .then((response) => response.json())
          .then((data) => {
            setProblems(data.problems);
          });
      }, []);
  return (
    <div> 
        {problems.map((problem) => (
       <ProblemItem key={problem.id} problem={problem} />
       ))}
      </div>
  )
}
