import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../네카라쿠배.png";
import backImage from "../../background.png";
import kakaoImage from "../../kakao.png";
import facebookImage from "../../facebook.png";
import githubImage from "../../github.png";

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
    if (
      loginValues.email === testEmail &&
      loginValues.password === testPassword
    ) {
      navigate("/idepage");
    } else {
      // 일치하지 않는 경우 추가하기
    }
  };

  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 추가하기
    console.log("Kakao login clicked");
  };

  const handleFacebookLogin = () => {
    // 페이스북 로그인 로직 추가하기
    console.log("Facebook login clicked");
  };

  const handleGithubLogin = () => {
    // 깃허브 로그인 로직 추가하기
    console.log("Github login clicked");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-transparent"
      style={{
        backgroundImage: `url(${backImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <div className="flex flex-row bg-white">
          {/* 입력 */}
          <div className=" w-96 h-full">
            <div className="border border-gray-300 p-12 ">
              <div className="pb-10">
                <img
                  className="w-full h-16 "
                  src={logoImage}
                  alt="로고 이미지"
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-10 mb-2 pl-2 shadow-lg hover:shadow-xl"
                  type="text"
                  name="email"
                  placeholder="이메일"
                  onChange={handleInputChange}
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-5 pl-2 shadow-lg hover:shadow-xl"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  onChange={handleInputChange}
                />
              </div>
              <div
                className="flex items-center justify-center w-full h-8 mb-4 bg-blue-400 rounded-2xl cursor-pointer hover:bg-blue-600 shadow-lg hover:shadow-xl"
                onClick={checkLogin}
              >
                <span className="text-white text-sm font-bold">로그인</span>
              </div>
              <div className="my-2 text-center">
                <span className="text-sm font-bold text-blue-600 cursor-pointer ">
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
              <div className="flex flex-row my-5 justify-center items-center">
                <button
                  className="w-14 h-14 mx-5 p-0 border-none rounded-full overflow-hidden shadow-lg hover:shadow-xl"
                  onClick={handleKakaoLogin}
                >
                  <img
                    className="w-14 h-14"
                    src={kakaoImage}
                    alt="카카오 로그인"
                  />
                </button>
                <button
                  className="w-14 h-14 mx-5 p-0 border-none rounded-full overflow-hidden shadow-lg hover:shadow-xl"
                  onClick={handleFacebookLogin}
                >
                  <img
                    className="w-14 h-14"
                    src={facebookImage}
                    alt="페이스북 로그인"
                  />
                </button>
                <button
                  className="w-14 h-14 mx-5 p-0 border-none rounded-full overflow-hidden shadow-lg hover:shadow-xl"
                  onClick={handleGithubLogin}
                >
                  <img
                    className="w-14 h-14"
                    src={githubImage}
                    alt="깃헙 로그인"
                  />
                </button>
              </div>
              <div
                className="flex items-center justify-center w-full h-8 bg-white border border-blue-600 rounded-2xl cursor-pointer hover:bg-blue-200 mt-9 shadow-lg hover:shadow-xl"
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
