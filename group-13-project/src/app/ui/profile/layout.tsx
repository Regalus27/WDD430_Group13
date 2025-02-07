// import Nav 
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <header className="w-full bg-white shadow-md p-4 text-center font-semibold text-lg">
          Artist Portfolio
        </header>
        <main className="flex flex-col items-center w-full max-w-3xl p-4">
          {children}
        </main>
        <footer className="w-full text-center text-gray-600 p-4 mt-8 border-t">
          © 2025 Artist Portfolio. All Rights Reserved.
        </footer>
      </div>

    // <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    //   <div className="w-full flex-none md:w-64">
    //     {/* <SideNav /> */}
    //   </div>
    //   <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    // </div>
    
  );
}
