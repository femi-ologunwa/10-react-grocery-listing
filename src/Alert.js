import React, { useEffect } from 'react';

const Alert = ({ msg, type, removeAlert, list }) => {
   useEffect(() => {
      const timeout = setTimeout(() => {
         removeAlert();
      }, 3000);
      return () => {
         clearTimeout(timeout);
      };
   }, [list]);

   return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;

//Every time the list changes, we want to get the new timeout eventhough the timeout of the previous alert message might not have been exhausted

//That is once something changes on the list, we immediately clear the old timeout and set a new one.
