import React, { useEffect, useState } from 'react';
import firebase from './config/firebase';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(); //ログインチェックが完了してるか
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuthUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { authUser, loading };
};
