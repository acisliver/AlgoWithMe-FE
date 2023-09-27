import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../네카라쿠배.png";
import backImage from "../../background.png";

const index = () => {
  const navigate = useNavigate();

  // const [setIsCorrectLogin] = useState(true);
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const testEmail = "asd";
  const testPassword = "asd";


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const checkLogin = () => {
    if (loginValues.email === testEmail && loginValues.password === testPassword) {
      navigate("/idepage");
    } else {
      // 일치하지 않는 경우 추가하기
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent"
    style={{ backgroundImage: `url(${backImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div>
        <div className="flex flex-row bg-white">
          {/* 입력 */}
          <div className=" w-96 h-full">
            <div className="border border-gray-300 p-12 ">
              <div className="pb-10">
                <img
                  className="w-full h-16"
                  src={logoImage}
                  alt="로고 이미지"
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-10 mb-2"
                  type="text"
                  name="email"
                  placeholder="이메일"
                  onChange={handleInputChange}
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-5"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  onChange={handleInputChange}
                />
              </div>
              <div
                className="flex items-center justify-center w-full h-8 mb-4 bg-blue-400 rounded-2xl cursor-pointer hover:bg-blue-600"
                onClick={checkLogin}
              >
                <span className="text-white text-sm font-bold">로그인</span>
              </div>
              <div className="my-2 text-center">
                <span className="text-sm font-bold text-blue-600 cursor-pointer">
                  비밀번호 찾기
                </span>
              </div>
              <div className="flex justify-between items-center my-5">
                <div className="h-px w-2/5 bg-gray-400"></div>
                <span className="mx-3 text-sm font-semibold text-gray-500">
                  또는
                </span>
                <div className="h-px w-2/5 bg-gray-400"></div>
              </div>
              <div className="flex flex-row justify-center my-3">
                <span className="text-sm font-medium">
                  SNS 계정으로 로그인하기
                </span>
              </div>
              <div className="flex flex-row my-5">
                <span>카카오</span>
                <span>페이스북</span>
                <span>깃헙</span>
              </div>
              <div
                className="flex items-center justify-center w-full h-8 bg-white border border-blue-600 rounded-2xl cursor-pointer hover:bg-blue-200"
                onClick={() => navigate("signup")} // 상대 경로를 사용
              >
                <span className="text-blue-600 text-sm font-bold">
                  계정 만들기
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
