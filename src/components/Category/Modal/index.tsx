"use client"

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import TextInput from '@/components/Form/TextInput';
import Modal from '@/components/Modal';
import { IUseDisclose } from '@/hooks/util';
import { Category, categorySchema } from '@/utils/schemas/category';
import { zodResolver } from '@hookform/resolvers/zod';

type props = {
  category?: Category
  modal: IUseDisclose;
}
const EMPTY_IMG = 'https://www.boomkwekerijwouters.be/images/Assort_nophoto.jpg';

const CategoryModal: React.FC<props> = ({ category, modal }) => {
  const [imgSrc, setImgSrc] = useState(EMPTY_IMG);
  const [imgSrcError, setImgSrcError] = useState(false);

  const defaultValues: Category = {
    id: '',
    name: '',
    imageUrl: '',
  }

  const form = useForm({
    defaultValues,
    resolver: zodResolver(categorySchema)
  });

  const formImgSrc = form.watch('imageUrl');

  const formSubmithandler = (values: Category) => {
    if (!imgSrcError) {
      if (values.id)
        console.log('edit', values)
      else
        console.log('create', values)
    } else {
      form.setError('imageUrl', { message: 'Nenhuma Imagem Encontrada' });
    }
  }

  const handleRemove = () => {
    console.log('remove', category)
  }

  useEffect(() => {
    if (!modal.isOpen || !category) {
      form.reset(defaultValues);
      setImgSrc(EMPTY_IMG);
    } else {
      form.reset({ ...category });
    }
  }, [modal.isOpen])

  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={modal.onClose}
      title={category ? 'Editar Categoria' : 'Criar Categoria'}
    >
      <FormProvider {...form}>
        <TextInput
          containerClass='mb-2'
          type='text'
          name='name'
          label='Nome'
          placeholder='Informe o nome da categoria'
        />
        <TextInput
          containerClass='mb-6'
          type='text'
          name='imageUrl'
          label='Imagem'
          placeholder='Informe o endereço da imagem da categoria'
        />
      </FormProvider>

      <div className='h-24 flex justify-center mb-6'>
        <img
          style={{ display: 'none' }}
          src={formImgSrc}
          onError={() => { if (formImgSrc) setImgSrcError(true) }}
          onLoad={() => {
            setImgSrcError(false);
            setImgSrc(formImgSrc);
          }}
        />
        <img
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          src={imgSrc && !imgSrcError ? imgSrc : EMPTY_IMG}
        />
      </div>

      <button
        className="btn btn-primary mb-2 w-full"
        onClick={form.handleSubmit(formSubmithandler)}
      >
        Salvar
      </button>
      {
        !!category &&
        <button
          className="btn btn-outline hover:text-white w-full"
          onClick={handleRemove}
        >
          remover
        </button>
      }
    </Modal>
  )
}

export default CategoryModal;
