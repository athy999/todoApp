import { useState } from "react"

const SearchForm =({setParam}) =>{
    const [searchInput,setSearchInput] = useState("");
    
    return (
        <form 
            className="search-form" 
            onSubmit={(e)=>{
                e.preventDefault();
                setParam( prev => ({...prev,keywords:searchInput,PageNumber:1}))
                setSearchInput("")
            }}>
                <div className='form-control'>
                    <input 
                        className='grocery search-input' 
                        placeholder='Looking for...'
                        value={searchInput}
                        onChange={ (e)=> setSearchInput(e.target.value)}
                    ></input>
                    
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