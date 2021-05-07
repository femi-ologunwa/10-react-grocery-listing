import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
   const [name, setName] = useState('');
   const [list, setList] = useState([]);
   const [isEditing, setIsEditing] = useState(false);
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
         //deal with edit
      }

      //add item to list of items
      else {
         //show alert
         const newItem = { id: new Date().getTime().toString(), title: name };
         setList([...list, newItem]);
         setName('');
      }
   };

   const showAlert = (show = false, type = '', msg = '') => {
      setAlert({ show, type, msg });
   };

   return (
      <section className='section-center'>
         <form className='grocery-form' onSubmit={handleSubmit}>
            {alert.show && <Alert {...alert} removeAlert={showAlert} />}
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
               <List items={list} />
               <button className='clear-btn'>clear items</button>
            </div>
         )}
      </section>
   );
}

export default App;
