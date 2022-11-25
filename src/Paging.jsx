const Paging = ({pagination,setParam}) => {

    let pageNumber =[1];
    if(pagination) {
        pageNumber =Array.from({length:pagination.totalPage},(_,i)=>i+1);
    }
    return (
        <>
          <div className="paging-container">
            <button
              className="move-page-btn"
              disabled={!pagination.hasPrevious}
              onClick={() =>
                setParam((prev) => ({
                  ...prev,
                  PageNumber: prev.PageNumber - 1,
                }))
              }
            >
              Prev
            </button>
            {pageNumber.map((el,index) => (
                <button
                  key={index}
                  style={
                    el === pagination.pageNumber
                      ? { cursor: "pointer", color: "red" }
                      : { cursor: "pointer" }
                  }
                  className="page-number-btn"
                  onClick={() =>
                    setParam((prev) => ({
                      ...prev,
                      PageNumber: el,
                    }))
                  }
                >
                  {el} 
                </button>
              ))
            }
            <button
              className="move-page-btn"
              disabled={!pagination.hasNext}
              onClick={() =>
                setParam((prev) => ({
                  ...prev,
                  PageNumber: prev.PageNumber + 1,
                }))
              }
            >
              Next
            </button>
          </div>
        </>
      );
}

export default Paging;