import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, updateDoc } from 'firebase/firestore';

import { firestore } from '@/firebase/config';
import { Category } from '@/utils/schemas/category';

type CollectionMap = {
    categories: Category;
};

type CollectionName = keyof CollectionMap;
type DocumentType<T extends CollectionName> = CollectionMap[T];

const getCollectionRef = (collectionName: CollectionName) => collection(firestore, collectionName);

const getDocRef = (collectionName: CollectionName, id: string) => doc(firestore, collectionName, id);

const fetchDocuments = async <T extends CollectionName>(collectionName: T): Promise<DocumentType<T>[]> => {
    const querySnapshot = await getDocs(getCollectionRef(collectionName));

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DocumentType<T>));
};

const addDocument = async <T extends CollectionName>(collectionName: T, newDocument: DocumentType<T>): Promise<DocumentType<T>> => {
    const { id, ...document } = newDocument;

    const docRef = await addDoc(getCollectionRef(collectionName), document);

    return { id: docRef.id, ...document } as DocumentType<T>;
};

const updateDocument = async <T extends CollectionName>(collectionName: T, updatedDocument: DocumentType<T>): Promise<DocumentType<T>> => {
    const { id, ...document } = updatedDocument;

    const docRef = getDocRef(collectionName, id!);

    await updateDoc(docRef, document as DocumentData);

    return { id, ...updatedDocument } as DocumentType<T>;
};

const deleteDocument = async <T extends CollectionName>(collectionName: T, id: string): Promise<string> => {
    const docRef = getDocRef(collectionName, id);

    await deleteDoc(docRef);

    return id;
};

export { 
    getCollectionRef,
    getDocRef,
    fetchDocuments, 
    addDocument, 
    updateDocument, 
    deleteDocument
};