import Navbar from "@/components/Navbar";
import { authOptions } from "@/utils/next-auth/authOptions";
import { getServerSession } from "next-auth";

type Props = {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  // await new Promise(resolve => setTimeout(resolve, 8000))
  return (
    <>
      {session && <Navbar />}
      {children}
    </>
  )
}

export default Layout;