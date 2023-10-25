import React from 'react';

function Input({
  type = 'text', // 기본적으로 텍스트 입력 타입
  placeholder = '', // 기본값은 없음
  value = '', // 기본값은 없음
  onChange, // 값 변경 핸들러
  className = '', // 추가적인 스타일 클래스
}) {
  // Tailwind 기본 스타일을 적용하고, 외부에서 전달된 className으로 추가 스타일을 부여
  const defaultClasses = 'border p-2 rounded';
  const combinedClasses = `${defaultClasses} ${className}`;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={combinedClasses}
    />
  );
}

export default Input;
