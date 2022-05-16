import { usePagination } from '../../context/Pagination.context'
import './Pagination.styles.css'

function Pagination() {
  const { state, dispatch } = usePagination()

  const isFirst = state.page === 1
  const isLast = state.page === state.totalPages

  const handlePrevious = () => {
    dispatch({ type: 'PREVIOUS' })
  }

  const handleNext = () => {
    dispatch({ type: 'NEXT' })
  }

  const handleFirst = () => {
    dispatch({ type: 'FIRST' })
  }

  const handleLast = () => {
    dispatch({ type: 'LAST' })
  }

  return (
    <div className="container">
      <button disabled={isFirst} className="button-text" onClick={handleFirst}>First</button>
      <button disabled={isFirst} className="button-text" onClick={handlePrevious}>Previous</button>
      <button disabled={isLast} className="button-text" onClick={handleNext}>Next</button>
      <button disabled={isLast} className="button-text" onClick={handleLast}>Last</button>
    </div>
  )
}

export default Pagination
