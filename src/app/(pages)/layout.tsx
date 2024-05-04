import Navbar from "@/components/Navbar";
import { authOptions } from "@/utils/next-auth/authOptions";
import { getServerSession } from "next-auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session && <Navbar />}
      {children}
    </>
  )
}

export default Layout;