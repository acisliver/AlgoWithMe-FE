import React from 'react';
import Text from '../../../atoms/Text/Text';
import Link from '../../../atoms/Text/Link';

export default function index() {
  const token = localStorage.getItem('token');

  return (
    <div className="bg-[#D9D9D9]  top-0 left-0 right-0 flex items-center">
      <Text className="text-[30px] font-bold my-2">Algo 있니?</Text>
      {token ? <Link to="/"> 로그아웃</Link> : <Link to="/auth">로그인</Link>}
    </div>
  );
}
