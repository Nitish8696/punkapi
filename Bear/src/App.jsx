import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [filter, setFilter] = useState([])
  const [bear, setBears] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetch('https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6')
    const json = data.json().then((result) => {
      setBears(result),
        setFilter(result)
    });
  }

  useEffect(() => {
    if (query !== '') {
      const filteredData = filter.filter((item) =>
        item.name.toUpperCase().startsWith(query.toUpperCase())
      );
      setFilter(filteredData);
    }
    else {
      setFilter(bear)
    }
  }, [query])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <div className='home'>
        <div className='container'>
          <div className='search-container'>
            <h1>Search For Bear</h1>
            <input type="text" className='search' placeholder='Search Bear' value={query} onChange={handleChange} />
          </div>
          <div className='bear-cards'>
            {filter.map((b) => {
              return <div className='bear-card' key={b.id}>
                <img src={b.image_url} alt="" />
                <h3>{b.name}</h3>
                <p>{b.description.slice(0, 40)}...</p>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
