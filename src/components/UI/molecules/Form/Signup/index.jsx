import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../../atoms/Input/Button';
import Heading from '../../../atoms/Text/Heading';
import Text from '../../../atoms/Text/Text';
import Input from '../../../atoms/Input/Input';
import Alert from "../../Feedback/Alert";

function Signup() {
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
    checkpassword: '',
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('info');

  // 이메일 인증
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  // 타이머
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const handleVerificationClick = async () => {
    try {
      // 이메일 인증번호 발송 API 호출
      const response = await axios.post(
        'http://50.19.246.89:8080/api/v1/auth/email',
        { email: loginValues.email },
      );
      if (response.data && response.data.message) {
        // 인증번호가 성공적으로 발송된 경우
        alert(response.data.message);
        setIsEmailVerified(true); // 이메일이 인증되었음을 상태로 설정
        setSuccessEmail(true); // 이메일 인증 성공
        setIsTimeOut(false); // 다시 인증버튼 누를 시 리셋
        setMinutes(5); // 제한 시간 리셋
        setSeconds(0); // 초 리셋
      } else {
        // API 호출은 성공했지만 인증번호 발송에 실패한 경우
        setAlertType('error');
        setAlertMessage(
          '인증번호를 전송하는 데 실패했습니다. 다시 시도해주세요.',
        );
      }
    } catch (error) {
      // API 호출 자체가 실패한 경우
      console.error('Email verification error!', error);
      setAlertType('error');
      setAlertMessage('이메일 인증 중 오류가 발생하였습니다.');
    }
  };

  const handleVerifyClick = async () => {
    try {
      // 인증 코드 확인 API 호출
      const response = await axios.post(
        'http://50.19.246.89:8080/api/v1/auth/email/check',
        {
          email: loginValues.email,
          authNumber: verificationCode,
        },
      );
      if (response.data.code === '200') {
        alert(response.data.message);
        setIsEmailVerified(false); // 인증에 성공하면 UI 숨김
        setSuccessCode(true); // 코드 인증 성공
        // 추가적인 로직 (예: 인증 성공 시 처리 등)
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Code verification error!', error);
      setAlertType('error');
      setAlertMessage('인증 코드 확인 중 오류가 발생하였습니다.');
    }
  };

  // 인증 여부 확인
  const [successEmail, setSuccessEmail] = useState(false);
  const [successCode, setSuccessCode] = useState(false);

  // 전체 필드 확인
  const checkSignup = async () => {
    // 비밀번호 일치 확인
    if (loginValues.password !== loginValues.checkpassword) {
      setAlertType('error');
      setAlertMessage('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    // 모든 필드가 채워져 있는지 확인
    if (!loginValues.email || !loginValues.password || !loginValues.name) {
      setAlertType('error');
      setAlertMessage('입력하지 않은 사항이 있습니다.');
      return;
    }
    // 이메일, 인증번호 확인
    if (!successEmail || !successCode) {
      setAlertType('error');
      setAlertMessage('이메일 및 코드를 인증해주세요');
      return;
    }
    try {
      const response = await axios.post(
        'http://50.19.246.89:8080/api/v1/auth/signup',
        {
          email: loginValues.email,
          password: loginValues.password,
          name: loginValues.name,
        },
      );
      if (response.data && response.data.message) {
        alert(response.data.message);
        navigate('/signin');
      } else {
        setAlertType('error');
        setAlertMessage('회원가입에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Signup error!', error);
      setAlertType('error');
      setAlertMessage('회원가입 중 오류가 발생하였습니다.');
    }
    // 서버 요청 추가 할 사항 있으면 할 것
  };

  // 타이머 로직
  useEffect(() => {
    let timer;
    if (isEmailVerified) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(timer);
              setIsEmailVerified(false); // 인증 시간 초과
              setIsTimeOut(true); // 타임아웃 상태를 true로 설정
              return 0;
            }
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;

            // eslint-disable-next-line no-else-return
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isEmailVerified, seconds, minutes]);

  return (
    <div className="p-8 w-96 h-full">
      {alertMessage && <Alert type={alertType} message={alertMessage} />}
      <Heading
        level={1}
        className="p-8 bg-white shadow-md rounded
       text-5xl font-bold text-center mb-10"
      >
        Algo 있니?
      </Heading>
      <div className="flex mb-2">
        <Input
          type="email"
          name="email"
          placeholder="이메일"
          value={loginValues.email}
          onChange={handleInputChange}
          className="mb-2 flex-grow"
        />
        <Button
          onClick={handleVerificationClick}
          className="w-auto bg-white border border-blue-600 rounded-2xl hover:bg-blue-200 text-blue-600 flex-shrink-0 px-4 ml-2 h-auto my-2"
        >
          인증
        </Button>
      </div>
      {isEmailVerified && (
        <>
          <div className="flex mb-2">
            <Input
              type="text"
              name="verificationCode"
              placeholder="인증 코드"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button
              onClick={handleVerifyClick}
              className="w-auto bg-white border border-blue-600 rounded-2xl hover:bg-blue-200 text-blue-600 flex-shrink-0 px-4 ml-2 h-auto my-2"
            >
              확인
            </Button>
          </div>
          <Text color="blue-600" className="mt-4">
            남은 인증 시간: {minutes}:{seconds}
          </Text>
        </>
      )}

      {isTimeOut && (
        <Text color="red-600" className="mt-4">
          인증 시간이 초과했습니다.
        </Text>
      )}

      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={loginValues.password}
        onChange={handleInputChange}
        className="mb-4"
      />

      <Input
        type="password"
        name="checkpassword"
        placeholder="비밀번호 확인"
        value={loginValues.checkpassword}
        onChange={handleInputChange}
        className="mb-4"
      />

      <Input
        type="text"
        name="name"
        placeholder="닉네임"
        value={loginValues.name}
        onChange={handleInputChange}
        className="mb-12"
      />

      <Button onClick={checkSignup}>가입하기</Button>

      <div className="flex justify-between items-center my-5">
        <div className="mt-12 h-px w-full bg-gray-400" />
      </div>
      <div className="mt-8 text-center">
        이미 계정이 있습니까?{' '}
        <Link to="/signin" className="text-blue-500 hover:underline">
          로그인
        </Link>
      </div>
    </div>
  );
}

export default Signup;
