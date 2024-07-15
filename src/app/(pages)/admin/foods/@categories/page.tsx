"use client"

import { Plus, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import Carousel from '@/components/Carousel';
import CategoryCard from '@/components/Category/Card';
import { useDisclose } from '@/hooks/util';
import { useCategoryStore } from '@/store/category';
import { Category } from '@/utils/schemas/category';

import CategoryModal from './_components/modal';
import Loading from './_components/loading';

const Categories: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, categories, getCategories] = useCategoryStore((state) => [
    state.loading,
    state.categories,
    state.getCategories
  ]);

  const { data: session } = useSession();

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
    clearAllParams();
    setSelectCategory(category);
    categoryModal.onOpen();
  }

  const handleCreate = () => {
    setSelectCategory(undefined);
    categoryModal.onOpen();
  }

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <>
      <div className='flex items-center'>
        <h1 className="text-2xl text-primary">Categorias</h1>
        {
          session?.user?.role === 'admin' &&
          <button
            className="btn btn-ghost btn-circle btn-xs"
            onClick={handleCreate}
            disabled={loading}
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
      
      {
        loading ?
          <Loading />
          :
          (
            categories?.length ?
              <Carousel>
                {categories.map(category => (
                  <CategoryCard
                    key={category.name}
                    category={category}
                    isAdmin={session?.user?.role === 'admin'}
                    isSelected={!!categoriesSelected.includes(category.name)}
                    handleEdit={() => handleEdit(category)}
                    handleChangeCategory={() => handleChangeCategory(category.name)}
                  />
                ))}
              </Carousel>
              :
              <div className="text-primary">Nenhuma categoria cadastrada.</div>
          )
      }

      {session?.user?.role === 'admin' && <CategoryModal modal={categoryModal} category={selectCategory} />}
    </>
  )
}

export default Categories;
