import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
   let list = localStorage.getItem('list');
   if (list) {
      return JSON.parse(localStorage.getItem('list'));
   } else {
      return [];
   }
};

function App() {
   const [name, setName] = useState('');
   const [list, setList] = useState(getLocalStorage());
   const [isEditing, setIsEditing] = useState(false);
   const [editID, setEditID] = useState('');
   const [alert, setAlert] = useState({
      show: false,
      msg: '',
      type: '',
   });

   const handleSubmit = (e) => {
      e.preventDefault();

      //is form empty on submit
      if (!name) {
         showAlert(true, 'danger', 'please enter value');
      }

      //is an item being edited
      else if (name && isEditing) {
         setList(
            list.map((item) => {
               if (item.id === editID) {
                  //edit only the title of the item; leave other properties as they are
                  return { ...item, title: name };
               }
               return item;
            })
         );
         setName('');
         setEditID(null);
         setIsEditing(false);
         showAlert(true, 'success', 'value changed');
      }

      //add item to list of items
      else {
         showAlert(true, 'success', 'item added to the list');
         const newItem = { id: new Date().getTime().toString(), title: name };
         setList([...list, newItem]);
         setName('');
      }
   };

   const showAlert = (show = false, type = '', msg = '') => {
      setAlert({ show, type, msg });
   };

   const clearList = () => {
      showAlert(true, 'danger', 'empty list');
      setList([]);
   };

   const removeItem = (id) => {
      showAlert(true, 'danger', 'item removed');
      setList(list.filter((item) => item.id !== id));
   };

   const editItem = (id) => {
      const specificItem = list.find((item) => item.id === id);
      setIsEditing(true);
      setEditID(id);
      setName(specificItem.title);
   };

   //store in the local storage the latest changes to the list
   useEffect(() => {
      localStorage.setItem('list', JSON.stringify(list));
   }, [list]);

   return (
      <section className='section-center'>
         <form className='grocery-form' onSubmit={handleSubmit}>
            {alert.show && (
               <Alert {...alert} removeAlert={showAlert} list={list} />
            )}
            <h3>grocery list</h3>
            <div className='form-control'>
               <input
                  type='text'
                  className='grocery'
                  placeholder='e.g. eggs'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <button type='submit' className='submit-btn'>
                  {isEditing ? 'edit' : 'submit'}
               </button>
            </div>
         </form>

         {list.length > 0 && (
            <div className='grocery-container'>
               <List items={list} removeItem={removeItem} editItem={editItem} />
               <button className='clear-btn' onClick={clearList}>
                  clear items
               </button>
            </div>
         )}
      </section>
   );
}

export default App;
