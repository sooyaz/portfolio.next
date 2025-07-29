"use client"
import { useEffect, useState } from "react";
import { useLoading } from '../context/loadingContext'; // useLoading 훅 임포트

export default function SignUp() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const [isIdAbled, setIsIdAbled] = useState<boolean>(false);
  const [isNameAbled, setIsNameAbled] = useState<boolean>(false);
  const [isSamepassword, setIsSamePassword] = useState<boolean>(false);
  const [isCheckedMail, setIsCheckedMail] = useState<boolean>(false);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [isCodeCompleted, setIsCodeCompleted] = useState<boolean>(false);
  
  const verifyCodeCountdown = 180; // 3분
  const [countdown, setCountdown] = useState(verifyCodeCountdown);
  const [displayCode, setDisplayCode] = useState<string>("03:00");

  const [error, setError] = useState<string | null>(null);
  // 로딩 상태를 관리하는 훅 사용
  const { startLoading, stopLoading } = useLoading(); // useLoading 훅 사용

  const regexp = /^[a-zA-Z0-9]+$/; // 아이디 정규식 (영문 대소문자, 숫자)
  const regexpkor = /^[가-힣a-zA-Z0-9]+$/; // 아이디 정규식 (한글, 영문 대소문자, 숫자)

  const onInputChange = (type:string, e:React.ChangeEvent<HTMLInputElement>) => {
    const inputValue:string = e.target.value;
    switch(type) {
      case "ID":
        setId(inputValue); break;
      case "PW":
        setPassword(inputValue); break;
      case "PW_CONFIRM":
        // 패스워드 확인 입력 시, 패스워드와 일치하는지 확인
        if(inputValue !== password) {
          setIsSamePassword(false);
          // 패스워드가 일치하지 않으면 에러 메시지 설정
          setError("패스워드가 일치하지 않습니다.");
        }
        else {
          setIsSamePassword(true);
          // 패스워드가 일치하면 에러 메시지 초기화
          setError(null);
        }
        // 패스워드 확인 상태 업데이트
        setPasswordConfirm(inputValue);
        break;
      case "NAME":
        setName(inputValue); break;
      case "EMAIL":
        // 이메일 입력 시, 이메일 형식이 올바른지 확인
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(inputValue)) {
          setIsCheckedMail(true);
          setError(null); // 이메일 형식이 올바르면 에러 메시지 초기화
        }
        else {
          setIsCheckedMail(false);
          setError("이메일 형식이 올바르지 않습니다."); // 이메일 형식이 올바르지 않으면 에러 메시지 설정
        }
        setEmail(inputValue)
        break;
      case "CODE":
        setCode(inputValue);
      break;
      default: break;
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //리로드 방지
    e.preventDefault();
    // 패스워드와 패스워드 확인이 일치하지 않는 경우
    if(!isSamepassword) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }
    // 모든 입력이 유효한 경우
    if(!id || !password || !name || !email || !code) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    // 중복 확인이 되지 않은 경우
    if(!isIdAbled || !isNameAbled) {
      alert("아이디와 닉네임 중복 확인을 먼저 해주세요.");
      return;
    }
    // 이메일 형식이 올바르지 않은 경우
    if(!isCheckedMail) {
      alert("이메일 형식이 올바르지 않습니다. 다시 확인해주세요.");
      return;
    }
    // 인증 코드가 발송되지 않은 경우
    if(!isCodeSent) {
      alert("인증 코드를 먼저 발송해주세요.");
      return;
    }
    // 인증 코드가 완료되지 않은 경우
    if(!isCodeCompleted) {
      alert("인증 코드를 먼저 확인해주세요.");
      return;
    }
    
    try {
      const requestBody = {
        userID : id,
        userPW : password,
        userName : name,
        userMail : email
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API 호출 실패');
      }

      const data = await response.json();
      console.log("🚀 ~ checkDuplicate ~ data:", data);
      // 중복 확인 결과에 따라 처리
    } catch (err: any) {
      setError(err.message);
      console.error(err.message);
    }

    // alert("로그인 시도");
    console.log("ID/PW", id, password);
  }

  const checkDuplicate = async (type: string) => {
    const message = type === "ID" ? "아이디" : "닉네임";
    const checkedValue = type === "ID" ? id : name;

    // 중복 확인 로직
    if(checkedValue.length < 2) {
      alert(`${message}는 2자 이상 입력해주세요.`);
      return;
    }
    if(checkedValue.length > 20) {
      alert(`${message}는 20자 이하로 입력해주세요.`);
      return;
    }
    if(type === "ID" ? regexp.test(checkedValue) == false : regexpkor.test(checkedValue) == false) {
      type === "ID" ? alert(`${message}는 영문 대소문자와 숫자만 입력 가능합니다.`) : alert(`${message}는 한글, 영문 대소문자, 숫자만 입력 가능합니다.`);
      return;
    }

    if(type === "ID" && isIdAbled){
      confirm("이미 사용 가능한 아이디입니다. 다시 작성하려면 확인 버튼을 눌러주세요.") ? (setId(""), setIsIdAbled(false)) : null;
      return;
    }
    if(type === "NAME" && isNameAbled){
      confirm("이미 사용 가능한 닉네임입니다. 다시 작성하려면 확인 버튼을 눌러주세요.") ? (setName(""), setIsNameAbled(false)) : null;
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/check-duplicate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: type, value: checkedValue })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.status || 'API 호출에 실패하였습니다.');
      }
      
      type === "ID" ? setIsIdAbled(true) : setIsNameAbled(true);

    } catch (err: any) {
      const errorStatus = err.message;
      if(errorStatus == "409") {
        alert(`이 ${message}는(은) 이미 사용 중입니다.`);
        return;
      } else {
        alert(`${message} 중복 확인에 실패했습니다.`);
        return;
      }
    }
  };

  const resetForm = async() => {
    confirm("정말 작성한 것을 모두 초기화 하시겠습니까?") ? (alert("초기화 되었습니다."), setId(""), setPassword(""), setPasswordConfirm(""), setName(""), setIsIdAbled(false), setIsNameAbled(false), setEmail(""), setCode(""), setIsCheckedMail(false), setIsCodeSent(false), setIsCodeCompleted(false)) : null;
  }

  const handleSendCode = async () => {
    if(!isCheckedMail) {
      alert("이메일 형식이 올바르지 않습니다. 다시 확인해주세요.");
      return;
    }
    // 이미 인증 코드가 완료된 경우 중복 실행 방지
    if(isCodeCompleted) {
      alert("이미 인증이 완료되었습니다.");
      return;
    }
    // 이미 인증 코드가 발송된 경우 중복 실행 방지
    if(isCodeSent) {
      alert("이미 인증 코드가 발송되었습니다. 새로 발송하려면 아래 시간이 지난 후 다시 시도해주세요.");
      return;
    }
    startLoading();
    try{
      const response = await fetch('/api/auth/send-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        // setMessage(data.message);
        setIsCodeSent(true);
      } else {
        // setMessage(`오류: ${data.message}`);
      }
    }catch (error) {
      console.error("인증 코드 전송 실패:", error);
      alert("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      stopLoading();
    }
  }

  const handleVerifyCode = async () => {
    // 이미 인증이 완료된 경우 중복 실행 방지
    if(isCodeCompleted) return;

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }), // code는 인증 코드 입력 필드에서 가져와야 합니다.
      });

      const data = await response.json();
      if (response.ok) {
        // 인증 성공 처리
        alert(data.message);
        setIsCodeCompleted(true);
      } else {
        // 인증 실패 처리
        alert(`오류: ${data.message}`);
      }
    } catch (error) {
      console.error("인증 코드 검증 실패:", error);
      alert("인증 코드 검증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCodeSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        setDisplayCode(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }, 1000);
    }

    if(isCodeCompleted) {
      setCountdown(0); // 인증 코드가 완료되면 카운트다운 중지
      setDisplayCode("인증 완료"); // 인증 완료 메시지 표시
    }

    if (!isCodeCompleted && countdown === 0) {
      setIsCodeSent(false);
      alert("인증 시간이 만료 되었습니다. 다시 인증을 시도해주세요.");
      setCountdown(verifyCodeCountdown); // 카운트다운 초기화
    }

    return () => clearInterval(timer);
  }, [isCodeSent, countdown]);

  return (
    <div className={`flex flex-col h-full justify-center items-center py-20 px-4`}>
      <h1 className={`font-bold mb-10 text-4xl`}>회원가입</h1>
      <form onSubmit={onSubmit} className={`flex flex-col`}>
        <div className={`flex items-center`}>
          <div className={`input-container`}>
            <label htmlFor="userID">아이디</label>
            <input type="text" value={id} onChange={(e)=>onInputChange("ID", e)} readOnly={isIdAbled ? true: false} className={`${isIdAbled ? "bg-gray-200 outline-none" : "bg-white"}`} />
          </div>
          <button type="button" onClick={()=>checkDuplicate("ID")}>{isIdAbled ? "다시 작성" : "중복 확인"}</button>
        </div>
        <p className={`text-xl invisible`}>blank</p>
        <div className={`input-container`}>
          <label htmlFor="userPW" className={``}>패스워드</label>
          <input type="password" value={password} onChange={(e)=>onInputChange("PW", e)} />
        </div>
        <p className={`text-xl invisible`}>blank</p>
        <div className={`flex items-center`}>
          <div className={`input-container`}>
            <label htmlFor="userPW" className={``}>패스워드 확인</label>
            <input type="password" value={passwordConfirm} onChange={(e)=>onInputChange("PW_CONFIRM", e)} />
          </div>
        </div>
        <p className={`pl-41 text-xl ${!isSamepassword && passwordConfirm.length > 0 ? "text-red-500" : "invisible"}`}>패스워드가 일치하지 않습니다.</p>
        <div className={`flex`}>
          <div className={`input-container`}>
            <label htmlFor="userName" className={``}>닉네임</label>
            <input type="text" value={name} onChange={(e)=>onInputChange("NAME", e)} readOnly={isNameAbled ? true: false} className={`${isNameAbled ? "bg-gray-200 outline-none" : "bg-white"}`} />
          </div>
          <button type="button" onClick={()=>checkDuplicate("NAME")}>{isNameAbled ? "다시 작성" : "중복 확인"}</button>
        </div>
        <p className={`text-xl invisible`}>blank</p>
        <div className={`flex items-center`}>
          <div className={`input-container`}>
            <label htmlFor="userMail" className={``}>이메일</label>
            <input type="text" value={email} onChange={(e)=>onInputChange("EMAIL", e)} readOnly={isCodeSent ? true: false} className={`${isCodeSent ? "bg-gray-200 outline-none" : "bg-white"}`} />
          </div>
          <button type="button" onClick={handleSendCode}>메일 인증</button>
        </div>
        <p className={`text-xl invisible`}>blank</p>
        <div className={`flex items-center`}>
          <div className={`input-container`}>
            <label htmlFor="userMail" className={``}>인증번호 확인</label>
            <input type="text" value={code} onChange={(e)=>onInputChange("CODE", e)} readOnly={isCodeCompleted ? true: false} className={`${isCodeCompleted ? "bg-gray-200 outline-none" : "bg-white"}`} />
          </div>
          <button type="button" onClick={handleVerifyCode}>확인 하기</button>
        </div>
        <p className={`pl-41 text-xl ${isCodeCompleted ? 'text-blue-500' : isCodeSent ? 'text-red-500' : 'invisible'}`}>[{displayCode}]</p>
        <div className={`flex justify-between`}>
          <button className={`bg-gray-100`} type="button" onClick={resetForm}>초기화</button>
          <button className={`bg-gray-100`} type="submit">가입하기</button>
        </div>
      </form>
    </div>
  );
}