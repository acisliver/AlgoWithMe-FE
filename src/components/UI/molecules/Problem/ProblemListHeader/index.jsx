import React from 'react'
import Text from '../../atoms/Text/Text'


export default function index() {
  return (
    <div className='flex '>
      <Text className='mr-4'>문제번호</Text>
      <Text className='mr-4'>상태</Text>
      <Text className='mr-[100px]'>문제제목</Text>
      <Text className='mr-[50px]'>정답률</Text>
      <Text className='mr-4'>난이도</Text>
    </div>
  )
}
