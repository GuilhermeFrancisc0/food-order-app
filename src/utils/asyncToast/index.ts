import { toast } from 'react-toastify';

import { getToastUpdateOptions } from '@/providers/ToastProvider';

export const asyncToast = async (asyncFn: () => Promise<any>, loadingMsg: string, successMsg: string) => {
  const id = loadingMsg ? toast.loading(loadingMsg) : '';

  try {
    await asyncFn();

    successMsg && toast.update(id, getToastUpdateOptions(successMsg, 'success'));
  } catch (e: any | Error) {
    toast.update(id, getToastUpdateOptions(e.message, 'error'));
    throw e;
  }
}