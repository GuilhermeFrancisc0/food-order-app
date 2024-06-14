import { getServerSession } from 'next-auth';

import CategoryContainer from '@/components/Category/Container';
import { categoriesMock } from '@/mock/categories';
import { authOptions } from '@/utils/next-auth/authOptions';

const Categories = async () => {
  // await new Promise(resolve => setTimeout(resolve, 3000))
  const session = await getServerSession(authOptions);

  return <CategoryContainer categories={categoriesMock} isAdmin={session?.user?.role === 'admin'} />
}
export default Categories;

