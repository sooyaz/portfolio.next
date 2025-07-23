
import "./styles/globals.css";
import "./styles/layout.css";
import Link from 'next/link';

import { LoadingProvider } from './context/loadingContext'; // LoadingProvider 임포트
import LoadingOverlay from './components/loadingOverlay'; // LoadingOverlay 임포트
import Header from './components/header'; // Header 컴포넌트 임포트
import Footer from './components/footer'; // Footer 컴포넌트 임포트

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LoadingProvider>
          <Header />

          {/* Main Content */}
          <main className="min-h-[calc(100vh-160px)]">
            {/* <LoadingProvider> */}
              {children}
              {/* <LoadingOverlay />
            </LoadingProvider> */}
          </main>
          <Footer />
          {/* 로딩 오버레이 컴포넌트 */}
          <LoadingOverlay />
        </LoadingProvider>
      </body>
    </html>
  );
}
