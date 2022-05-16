import './SearchForm.styles.css'

function SearchForm({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(Object.fromEntries(new FormData(e.target)))
  }

  return (
    <form className="flex flex-col pt-6 bg-white rounded" onSubmit={handleSubmit}>
      <div className="md:grid md:grid-cols-2">
        <div className="input-container md:mr-4">
          <label className="label" htmlFor="topic">Topic</label>
          <input className="input" type="text" id="topic" name="topic" placeholder="Topic to search" />
        </div>
        <div className="md:grid md:grid-cols-2">
          <div className="input-container">
            <label className="label" htmlFor="from">Start date</label>
            <input className="input" type="date" id="from" name="from" />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="to">End date</label>
            <input className="input" type="date" id="to" name="to" />
          </div>
        </div>
      </div>
      <button className="button self-start" type="submit">Search</button>
    </form>
  )
}

export default SearchForm
