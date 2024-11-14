import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { navMenus } from '../utils/data'
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';
import { RiLoginBoxFill, RiLogoutBoxFil, RiLogoutBoxFill } from "react-icons/ri";

// 구글 로그인 절차
// 1. 구글 클라이언트 ID 발급
// 2. @react-oauth/google 라이브러리 설치 및 임포트
// 3. GoogleOAuthProvider 컴포넌트로 로그인 버튼 감싸기
// 4. clienId props로 구글 클라이언트 ID 전달
// 5. GoogleLogin 컴포넌트로 요청 및 응답 로직 처리
// 6. onSuccess, onError 콜백 함수로 로그인 성공 및 실패 처리


const Navbar = ({menuIdx}) => {
  const dispatch = useDispatch()
  const googleClientId = process.env.REACT_APP_AUTH_CLIENT_ID
  const user = useSelector((state)=>state.auth.authData)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { given_name } = user || {}


  const handleLoginSuccess = useCallback((response)=>{
    try {
      const decoded = jwtDecode(response.credential)
      dispatch(login({authData: decoded}))
      setIsAuthenticated(true)
    }
    catch (error) {
      console.error('Login Handling Error : ', error)
    }
  }, [dispatch])


  useEffect(()=>{
    const storeData = JSON.parse(localStorage.getItem('authData'))
    if(storeData){
      dispatch(login({authData: storeData}))
      setIsAuthenticated(true)
    }
  }, [dispatch])

  
  const handleLoginError = (error) => {
    console.log('error : ', error);
  }

  const handleLogoutClick = () => {
    dispatch(logout())
    setIsAuthenticated(false)
  }

  return (
    <nav className='navi bg-[#1a1a1a] w-[80px] lg:w-1/5 h-full rounded-md border border-neutral-500 py-10 px-4 flex flex-col justify-between items-center'>
      <div className="logo-wrapper flex w-full items-center justify-center gap-8">
        <div className="logo scale-75 lg:scale-100 mr-4 lg:mr-0"></div>
        <h2 className='font-medium text-xl hidden lg:block'>
          <Link to='/'>HYEON</Link>
        </h2>
      </div>
      
      <ul className="menus">
        {
          navMenus.map((menu, idx)=>(
            <li key={idx} className={`rounded-sm mb-1 border border-neutral-400 hover:bg-neutral-700 transition-all duration-200 ${menu.idx === menuIdx ? 'bg-neutral-700' : ''}`}>
              <Link to={menu.to} className='flex gap-2 items-center py-2 px-4 lg:px-8'>
                {menu.icon}
                <span className='hidden lg:inline'>{menu.label}</span>
              </Link>
            </li>
          ))
        }
      </ul>

      {
        isAuthenticated ? (
        <div className='w-4/5 flex justify-center'>
          <button className='flex justify-center items-center gap-2 bg-neutral-300 text-neutral-900 py-3 px-4 rounded-md lg:w-full w-fit'
          onClick={handleLogoutClick}>
            {/* <FcGoogle className='w-5 h-5 hidden lg:inline' /> */}
            <RiLogoutBoxFill className='w-6 h-6'/>
            <span className='text-sm font-medium hidden lg:inline'>
              <span className='hidden lg:inline'>{given_name}님</span> Logout
            </span>
          </button>
        </div>
      ) : (
        <div className='w-4/5 flex justify-center login-btn'>
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
            <button className='flex justify-center items-center gap-2 bg-neutral-300 text-neutral-900 py-3 px-4 rounded-md lg:w-full w-fit'>
              {/* <FcGoogle className='w-5 h-5' /> */}
              <RiLoginBoxFill className='w-6 h-6'/>
              <span className='text-sm font-medium hidden lg:inline'>Google Login</span>
            </button>
          </GoogleOAuthProvider>
        </div>
        )
      }
    </nav>
  )
}

export default Navbar