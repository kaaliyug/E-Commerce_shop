import React from 'react'
import ReactPaginate from 'react-paginate';

const Pagination = ({productPerPage, setPageNumber, products}) => {
    const pageCount = Math.ceil(products.length/productPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

  return (
    <div>
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginateBtn"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
        />
    </div>
  )
}

export default Pagination