import './pagination.css';

const Pagination = ({ totalPages, currentPage, paginate }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => paginate(index + 1)}
          className={index + 1 === currentPage ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
