import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../네카라쿠배.png";
import backImage from "../../background.png";

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

  //이메일 인증
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerificationClick = () => {
    setShowVerificationInput(true);
  };

  const handleVerifyCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyClick = () => {
    // 인증 코드를 확인하는 로직 추가하기
  };

  //확인
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
    // 인증 코드 확인
    // if (verificationCode !== "1234") {  // 예시로 "1234"를 사용
    //   alert("인증번호가 틀립니다");
    //   return;
    // }
    
    // 서버 요청 예시:
    // axios.post('/signup', loginValues).then(response => {...});
    navigate("/");
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
          <div className="w-96 h-full">
            <div className="border border-gray-300 p-12 ">
              <div className="pb-10 w-full">
                <img
                  className="w-full h-16"
                  src={logoImage}
                  alt="로고 이미지"
                />
                <div className="flex mt-10 mb-2">
                  <input
                    className="flex-1 bg-gray-200 border border-gray-300 py-3 pl-2"
                    type="text"
                    name="email"
                    placeholder="이메일"
                    onChange={handleInputChange}
                  />
                  <button
                    className="flex-shrink-0 bg-white border border-blue-600 rounded-2xl hover:bg-blue-200 text-blue-600 px-4 ml-2"
                    onClick={handleVerificationClick}
                  >
                    인증
                  </button>
                </div>
                {showVerificationInput && (
                  <div className="flex mt-5 mb-2">
                    <input
                      className="flex-1 bg-gray-200 border border-gray-300 py-3 pl-2 "
                      type="text"
                      name="verificationCode"
                      placeholder="인증 코드"
                      value={verificationCode}
                      onChange={handleVerifyCodeChange}
                    />
                    <button
                      className="flex-shrink-0 bg-white border border-blue-600 rounded-2xl hover:bg-blue-200 text-blue-600 px-4 ml-2"
                      onClick={handleVerifyClick}
                    >
                      확인
                    </button>
                  </div>
                )}
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-5 mb-2 pl-2"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  onChange={handleInputChange}
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-5 mb-2 pl-2"
                  type="password"
                  name="checkpassword"
                  placeholder="비밀번호 확인"
                  onChange={handleInputChange}
                />
                <input
                  className="w-full bg-gray-200 border border-gray-300 py-3 mt-5 mb-2 pl-2"
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
