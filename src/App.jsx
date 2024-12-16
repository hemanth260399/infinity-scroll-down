import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css'
import axios from 'axios';

function App() {
  let [alldata, setalldata] = useState([])
  let [perpage, setperpage] = useState(2)
  let [totalcurrentpage, settotalcurrentpage] = useState(1)
  let fetchdata = async () => {
    try {
      let rawdata = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${totalcurrentpage}&_limit=${perpage}`)
      settotalcurrentpage(totalcurrentpage + 1)
      setalldata([...alldata, ...rawdata.data])
    } catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    fetchdata()
  }, [])
  return (
    <>
      <div>
        {console.log(alldata)}
        <h1>Photo Albums</h1>
        <InfiniteScroll dataLength={alldata.length} next={fetchdata} hasMore={true} loader={<p>Loading.....</p>}>
          {
            alldata.map((item, index) => (
              <div key={index}>
                <h1>{item.id}</h1>
                <h2>{item.title}</h2>
                <img src={item.url} alt={item.title} />
              </div>
            ))
          }
        </InfiniteScroll>
      </div>
    </>
  )
}

export default App
