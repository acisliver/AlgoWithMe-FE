import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../네카라쿠배.png";

const index = () => {
  const navigate = useNavigate();

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
    checkpassword: "",
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  
  const checkSignup = () => {
    //비밀번호 일치 확인
    if (loginValues.password !== loginValues.checkpassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    //모든 필드가 채워져 있는지 확인
    if (!loginValues.email || !loginValues.password || !loginValues.name) {
      alert("입력하지 않은 사항이 있습니다.");
      return;
    }
    // 서버 요청 예시:
    // axios.post('/signup', loginValues).then(response => {...});
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div>
        <div className="flex flex-row bg-white">
          {/* 입력 */}
          <div className="w-96 h-full">
            <div className="border border-gray-300 p-12 ">
              <div className="pb-10 w-full">
                <img
                  className="w-full h-16"
                  src={logoImage}
                  alt="로고 이미지"
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-10 mb-2 "
                  type="text"
                  name="email"
                  placeholder="이메일"
                  onChange={handleInputChange}
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-5 mb-2"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  onChange={handleInputChange}
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-5 mb-2"
                  type="password"
                  name="checkpassword"
                  placeholder="비밀번호 확인"
                  onChange={handleInputChange}
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-5 mb-2"
                  type="text"
                  name="name"
                  placeholder="닉네임"
                  onChange={handleInputChange}
                />
              </div>
              <div
                className="flex items-center justify-center w-full mb-10 h-8 bg-blue-400 rounded-2xl cursor-pointer hover:bg-blue-600"
                onClick={() => checkSignup()}
              >
                <span className="text-white text-sm font-bold">가입하기</span>
              </div>
              <div className="flex justify-between items-center my-5">
                <div className="h-px w-full bg-gray-400"></div>
              </div>
              <div className="flex flex-row justify-center mt-10">
                <span className="mr-1.5 text-sm font-medium">
                  이미 계정이 있습니까?
                </span>
                <span
                  className="text-sm font-bold text-blue-800 cursor-pointer ml-3"
                  onClick={() => navigate("/")}
                >
                  로그인
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;