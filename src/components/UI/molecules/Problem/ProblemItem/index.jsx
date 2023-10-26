import React from 'react'
import Link from '../../../atoms/Text/Link'

// import ProblemAttribute from '../../../atoms/ProblemAttributes'
import Text from '../../../atoms/Text/Text'

// 'grid place-items-center'


export default function index({problem,className}) {
  return (
    <div className={className}  > 
    
        <Text className='my-2 bg-[#D9D9D9]'>{problem.number}</Text>
        <Text className='my-2 bg-[#D9D9D9]'>{problem.status}</Text>
        <Link to={`/problems?id=${problem.number}`}>
          <Text className='my-2 bg-[#D9D9D9]'>{problem.title}</Text>
        </Link>
        <Text className='my-2 bg-[#D9D9D9]'>{problem.acceptance}</Text>
        <Text className='my-2 bg-[#D9D9D9]'>{problem.difficulty}</Text>
    </div>
  )
}
