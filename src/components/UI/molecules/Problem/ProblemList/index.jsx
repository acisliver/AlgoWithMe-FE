import React, { useEffect, useState } from 'react'
import ProblemItem from '../ProblemItem'

const testData = {
  "problems": [
    {
      "id": 0,
      "number": 1,
      "status": "성공",
      "title": "문제 1",
      "acceptance": "66.6",
      "difficulty": "쉬움",
      "tags": ["DFS", "그래프"]
    },
    {
      "id": 1,
      "number": 2,
      "status": "실패",
      "title": "문제 2",
      "acceptance": "30.5",
      "difficulty": "보통",
      "tags": ["배열", "정렬"]
    },
    {
      "id": 2,
      "number": 3,
      "status": "진행중",
      "title": "문제 3",
      "acceptance": "75.0",
      "difficulty": "어려움",
      "tags": ["동적 프로그래밍", "수학"]
    },
    {
      "id": 3,
      "number": 4,
      "status": "성공",
      "title": "문제 4",
      "acceptance": "50.0",
      "difficulty": "쉬움",
      "tags": ["문자열", "해시맵"]
    }
  ]
} 

export default function index() {
    const [problems, setProblems] = useState(testData.problems);
    useEffect(() => {
  
      }, []);
  return (
    <div> 
        {problems.map((problem) => (
       <ProblemItem className='flex' key={problem.id} problem={problem}  />
       ))}
      </div>
  )
}
