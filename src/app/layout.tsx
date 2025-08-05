import "./styles/globals.css";
import "./styles/layout.css";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

import { LoadingProvider } from './context/loadingContext'; // LoadingProvider 임포트
import LoadingOverlay from './components/loadingOverlay'; // LoadingOverlay 임포트
import Header from './components/header'; // Header 컴포넌트 임포트
import Footer from './components/footer'; // Footer 컴포넌트 임포트
import ClientLayout from "./components/ClientLayout";
import GlobalPopupModal from './components/PopupModal'
import PortfolioModal from './components/PortfolioModal'


export interface User {
  userID: string;
  userName: string;
  role?: 'user' | 'admin';
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('accessToken')?.value as string;
  let decoded = {
    userID:"",
    userName:""
  };
    console.log("@@@@@", accessToken);
  if(accessToken){

    decoded = jwt.verify(accessToken, process.env.NEXT_PUBLIC_JWT_SECRET!) as User;
    console.log("@@@@@", decoded);
  }
  
  return (
    <html lang="en">
      <body>
        <LoadingProvider>
          {/* <Header /> */}

          {/* Main Content */}
          <main className="min-h-[calc(100vh-160px)]">
            {/* <LoadingProvider> */}
            <ClientLayout user={decoded} children={children} />

            <GlobalPopupModal />
            <PortfolioModal />
              {/* {children} */}
              {/* <LoadingOverlay />
            </LoadingProvider> */}
          </main>
          {/* <Footer /> */}
          {/* 로딩 오버레이 컴포넌트 */}
          <LoadingOverlay />
        </LoadingProvider>
      </body>
    </html>
  );
}
