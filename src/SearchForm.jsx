import { useState } from "react"

const SearchForm =({setParam,showAlert}) =>{
    const [searchInput,setSearchInput] = useState("");
    
    return (
        <form 
            className="search-form" 
            onSubmit={(e)=>{
                e.preventDefault();
                setParam( prev => ({...prev,keywords:searchInput,PageNumber:1}))
            }}
            >
                <div className='form-control'>
                    <input 
                        className='grocery search-input' 
                        placeholder='Looking for...'
                        value={searchInput}
                        onChange={ (e)=> setSearchInput(e.target.value)}
                    ></input>
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={()=>setSearchInput("")}
                    >X</button>
                    <button 
                        type='submit' 
                        className='submit-btn'
                    >
                        <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                    </button>
                    
                </div>
            </form>
    )
}

export default SearchForm