"use client";
import "./globals.css";
import Navbar from "./components/navbar";

export default function RootLayout({ children }) {
  if (typeof window !== 'undefined') {
     // On page load or when changing themes, best to add inline in `head` to avoid FOUC
     if (localStorage.getItem('color-theme') == 'dark' ) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark')
    }
    
  }
  const NewMano = ()=>{
    const confirmation = confirm("Clear all and start a New Game?");

     confirmation ? location.reload() : false
   }
  return (
    <html lang="en" suppressHydrationWarning={true} className="dark">
      <body className="bg-slate-200 dark:bg-slate-900" >
        <>
          <div className=" flex  bg-slate-800   justify-end px-4">
            {/* <span className="text-2xl font-semibold  text-white ">Ponme 30&apos;</span> */}
            <div className="me-16">
              <img
                src="/logo4.png"
                alt="xx"
                width={100}
                height={100}
                className=""
              />
            </div>
            <div className="my-auto ">
              <button
                className="bg-blue-800 p-2 rounded my-auto font-bold px-4 text-slate-100 text-lg border-2 border-gray-400"
                onClick={NewMano}
              >
                NEW
              </button>
            </div>{" "}
          </div>
        </>
        {children}
        {/* <Navbar/> */}
      </body>
    </html>
  );
}
