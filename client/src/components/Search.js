import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GoSearch } from "react-icons/go";


Search.defaultProps = {
  searchRoute: "/search/",
  defaultRoute: ("/" + "store"), 
  placeholder: 'Search Products...'
}

function Search({ searchRoute, defaultRoute, margin, placeholder }) {

  const [term, setTerm] = useState("")
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {  
    setTerm(searchTerm ?? "")
  }, [searchTerm ])


  const search = async () => {
    term ? navigate(searchRoute + term) : navigate(defaultRoute);               
  }

  return (
    <>
      <form onSubmit = {(e) => e.preventDefault()} style = {{margin}} className='searchForm'>
        <input
          type = "search"
          name = 'text'
          placeholder = { placeholder }
          onChange = {(e) => setTerm(e.target.value)} 
          onKeyUp = {e => e.key === "Enter" && search()}
          value = {term}
          autoComplete = "off"
        />
        <button onClick={search}><GoSearch /></button>
      </form>
    </>
  )
}

export default Search