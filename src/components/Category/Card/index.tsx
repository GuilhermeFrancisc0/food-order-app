"use client"

import { Pencil } from 'lucide-react';
import Image from 'next/image';

import { Category } from '@/types/category';

type props = {
  category: Category;
  isAdmin?: boolean;
  isSelected: boolean;
  handleEdit?: () => void;
  handleChangeCategory: () => void;
}

const CategoryCard: React.FC<props> = ({
  category,
  isAdmin,
  isSelected,
  handleEdit,
  handleChangeCategory
}) => {

  const tryEdit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    handleEdit && handleEdit();
  }

  return (
    <div
      className={
        `card w-32 h-30 my-2 mx-1 flex flex-shrink-0 flex-col cursor-pointer bg-base-100 rounded-xl transition ease-linear relative 
        ${isSelected ? 'box-border shadow-md scale-105 border-[1px] border-primary' : 'shadow-sm hover:shadow-md hover:scale-105'}`
      }
      onClick={handleChangeCategory}
    >
      {isAdmin && handleEdit && (
        <button
          className="btn btn-ghost btn-circle btn-xs absolute top-1 right-1 z-10"
          onClick={tryEdit}
        >
          <Pencil className="text-primary" size={16} />
        </button>
      )}

      <div className="h-24 w-full relative">
        <Image
          className='object-cover rounded-t-xl'
          alt={category.name}
          src={category.imageUrl}
          sizes="(max-width: 100%)"
          fill
        />
      </div>
      <span className="text-center text-sm line-clamp-1">{category.name}</span>
    </div>
  )
}

export default CategoryCard;
