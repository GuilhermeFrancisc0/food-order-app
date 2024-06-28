"use client"

import CategoryContainer from '@/components/Category/Container';
import { categoriesMock } from '@/mock/categories';

const Categories =  () => {
  return <CategoryContainer categories={categoriesMock} />
}

export default Categories;

