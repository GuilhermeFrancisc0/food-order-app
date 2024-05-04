const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="card bg-white p-10 shadow-xl w-96">
      {children}
    </div>
  </div>
)

export default Layout;