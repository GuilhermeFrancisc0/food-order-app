import { UserData } from "@/context/Auth";
import { firestore } from "@/firebase/config"
import { User } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore"

const COLLECTION = 'users';

export const createUser = async (user: User) => {
    try {
        const usersRef = collection(firestore, COLLECTION);

        const newUser = {
            role: 'client',
            displayName: user.displayName,
            email: user.email,
            id: user.uid,
            photoUrl: user.photoURL,
        } as UserData;

        await setDoc(doc(usersRef, user.uid), newUser);

        return newUser;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getUserByid = async (uid: string) => {
    try {
        const docRef = doc(firestore, COLLECTION, uid);

        const docSnap = await getDoc(docRef);

        return docSnap.data() as UserData | undefined;
    } catch (e) {
        console.error(e);
        throw e;
    }
}