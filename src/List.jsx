import React, { useState } from 'react'
const List = ({items,removeItem,editItemName,editID,editItemStatus}) => {

  return (
    <div className="grocery-list">
      {items.map( (item) => {
        const {itemId,itemName,isDone} = item; //ES6 Object destructuring=> get properties of the object and assign to variables of same name
        return (
        <article key={itemId} className={`grocery-item ${editID===itemId?"item-editing":""}`}>
          <input 
            className='done-btn' 
            type="checkbox" 
            defaultChecked={isDone}
            onChange={() =>editItemStatus(itemId)}
          > 
          </input>
          <p className='title'>{itemName}</p>
          <div className="btn-container">
            <button 
              type='button' 
              className='edit-btn'
              onClick={()=>editItemName(itemId,itemName)}
            >
              <i className="fa-sharp fa-solid fa-pen-to-square"></i>
            </button>
            <button 
              type='button' 
              className='delete-btn'
              onClick={() => removeItem(itemId)}
            >
             <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </article>
        )
      })}
    </div>

  )
  
}

export default List