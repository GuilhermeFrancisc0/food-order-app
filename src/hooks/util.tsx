import { useState } from 'react';

export type IUseDisclose = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}

export const useDisclose = (open = false): IUseDisclose => {
    const [isOpen, setIsOpen] = useState(open);

    const onOpen = () => setIsOpen(true);

    const onClose = () => setIsOpen(false);

    const onToggle = () => setIsOpen(value => !value);

    return { isOpen, onOpen, onClose, onToggle }
}