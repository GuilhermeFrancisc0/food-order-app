"use client"

import { Plus, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import Carousel from '@/components/Carousel';
import { Category } from '@/types/category';

import CategoryCard from '../Card';
import CategoryModal from '../Modal';
import { useDisclose } from '@/hooks/util';

type props = {
  categories: Category[];
  isAdmin: boolean;
}

const CategoryContainer: React.FC<props> = ({ categories, isAdmin }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectCategory, setSelectCategory] = useState<Category | undefined>(undefined);

  const categoryModal = useDisclose();

  const categoriesSelected = useMemo(() => {
    return searchParams.get('category')?.split(',') || [];
  }, [searchParams]);

  const handleChangeCategory = (categoryName: string) => {
    const currentParams = new URLSearchParams(searchParams);
    const categories = currentParams.get('category')?.split(',') || [];

    const newCategories = categories.includes(categoryName)
      ? categories.filter(cat => cat !== categoryName)
      : [...categories, categoryName];

    newCategories.length
      ? currentParams.set('category', newCategories.join(','))
      : currentParams.delete('category');

    router.push(`${pathname}?${currentParams.toString()}`);
  };

  const clearAllParams = () => router.push(pathname);

  const handleEdit = (category: Category) => {
    setSelectCategory(category);
    categoryModal.onOpen();
  }

  const handleCreate = () => {
    setSelectCategory(undefined);
    categoryModal.onOpen();
  }

  return (
    <>
      <div className='flex items-center'>
        <h1 className="text-2xl text-primary">Categorias</h1>
        {
          isAdmin &&
          <button
            className="btn btn-ghost btn-circle btn-xs"
            onClick={handleCreate}
          >
            <Plus className="text-primary" />
          </button>
        }
      </div>

      <div className='h-5 text-xs text-primary flex items-center mx-3'>
        {!!categoriesSelected.length &&
          <>
            {categoriesSelected.length === 1 ? '1 categoria selecionada' : `${categoriesSelected.length} categorias selecionadas`}

            <button
              className="btn btn-ghost btn-circle btn-xs"
              onClick={clearAllParams}
            >
              <X className="text-primary" size={16} />
            </button>
          </>
        }
      </div>

      <Carousel>
        {categories.map(category => (
          <CategoryCard
            key={category.name}
            category={category}
            isAdmin={isAdmin}
            isSelected={!!categoriesSelected.includes(category.name)}
            handleEdit={() => handleEdit(category)}
            handleChangeCategory={() => handleChangeCategory(category.name)}
          />
        ))}
      </Carousel>

      {isAdmin && <CategoryModal modal={categoryModal} category={selectCategory}/>}
    </>
  )
}

export default CategoryContainer;
