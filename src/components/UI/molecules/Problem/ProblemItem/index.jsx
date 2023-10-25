import React from 'react'
import ProblemAttribute from '../../../atoms/ProblemAttributes'



export default function index({problem,className}) {
  return (
    <div className={className}>
        <ProblemAttribute className='my-2  bg-[#D9D9D9] ' attribute={problem.number} />
        <ProblemAttribute className='my-2  bg-[#D9D9D9]' attribute={problem.status}/>
        <ProblemAttribute className='my-2  bg-[#D9D9D9]' attribute={problem.title}/>
        <ProblemAttribute className='my-2  bg-[#D9D9D9]' attribute={problem.acceptance}/>
        <ProblemAttribute className='my-2  bg-[#D9D9D9]' attribute={problem.difficulty}/>
    </div>
  )
}
