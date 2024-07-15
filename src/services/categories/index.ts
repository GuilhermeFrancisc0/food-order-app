import { getDoc, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { Category } from '@/utils/schemas/category';

import { addDocument, deleteDocument, fetchDocuments, getCollectionRef, getDocRef, updateDocument } from '../../utils/firestore';

const categoriesRef = getCollectionRef('categories');

export const getCategories = async () => {
  try {
    const categories = await fetchDocuments('categories');

    return categories;
  } catch (e: any | Error) {
    toast.error(e.message);
    throw e;
  }
}

export const createCategory = async (category: Category) => {
  try {
    if (!category.name)
      throw new Error('Campo Nome é obrigatório!');

    if (!category.imageUrl)
      throw new Error('Campo Imagem é obrigatório!');

    const nameQuery = query(categoriesRef, where('name', '==', category.name));
    const imageUrlQuery = query(categoriesRef, where('imageUrl', '==', category.imageUrl));

    const nameQuerySnapshot = await getDocs(nameQuery);
    const imageUrlQuerySnapshot = await getDocs(imageUrlQuery);

    if (!nameQuerySnapshot.empty)
      throw new Error('Já existe uma categoria com este nome!');

    if (!imageUrlQuerySnapshot.empty)
      throw new Error('Já existe uma categoria com esta imagem!');

    const created = await addDocument('categories', category);

    return created;
  } catch (e: any | Error) {
    toast.error(e.message);
    throw e;
  }
}

export const editCategory = async (category: Category) => {
  try {
    if (!category.name)
      throw new Error('Campo Nome é obrigatório!');

    if (!category.imageUrl)
      throw new Error('Campo Imagem é obrigatório!');

    const categoryDocRef = getDocRef('categories', category.id!);
    const categoryDocSnap = await getDoc(categoryDocRef);

    if (!categoryDocSnap.exists())
      throw new Error('Categoria não encontrada!');

    const currentCategory = categoryDocSnap.data();

    if (category.name !== currentCategory.name) {
      const nameQuery = query(categoriesRef, where('name', '==', category.name));
      const nameQuerySnapshot = await getDocs(nameQuery);

      if (!nameQuerySnapshot.empty)
        throw new Error('Já existe uma categoria com este nome!');
    }

    if (category.imageUrl !== currentCategory.imageUrl) {
      const imageUrlQuery = query(categoriesRef, where('imageUrl', '==', category.imageUrl));
      const imageUrlQuerySnapshot = await getDocs(imageUrlQuery);

      if (!imageUrlQuerySnapshot.empty)
        throw new Error('Já existe uma categoria com esta imagem!');
    }

    const edited = await updateDocument('categories', category);

    return edited;
  } catch (e: any | Error) {
    toast.error(e.message);
    throw e;
  }
}

export const deleteCategory = async (categoryId: string) => {
  try {
    const id = await deleteDocument('categories', categoryId);

    return id;
  } catch (e: any | Error) {
    toast.error(e.message);
    throw e;
  }
}