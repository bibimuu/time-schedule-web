// import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
// import firebase from '../config/firebase';
// import LoadingOverlay from 'react-loading-overlay';

// export const Auth = ({ children }) => {
//   const [signinCheck, setSigninCheck] = useState(false); //ログインチェックが完了してるか
//   const [signedIn, setSignedIn] = useState(false); //ログインしてるか

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (!user) {
//         //してる
//         setSigninCheck(true);
//         setSignedIn(true);
//       } else {
//         //してない
//         setSigninCheck(true);
//         setSignedIn(false);
//       }
//     });
//   }, []);

//   //チェックが終わってないなら（ローディング表示）
//   if (!signinCheck) {
//     return (
//       <LoadingOverlay active={true} spinner text="Loading...">
//         <div style={{ height: '100vh', width: '100vw' }}></div>
//       </LoadingOverlay>
//     );
//   }

//   //チェックが終わりかつ
//   if (signedIn) {
//     //サインインしてるとき（そのまま表示）
//     return children;
//   } else {
//     //してないとき（ログイン画面にリダイレクト）
//     return <Redirect to="/" />;
//   }
// };

// export default Auth;
