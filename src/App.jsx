import { useEffect, useState } from 'react'
import './App.css'
import FoodComponent from './component/FoodComponent'
import MenuData from './data/MenuData'

function App() {

  const [foodData,setFoodData] = useState(MenuData)
  const [dataInpage,setDataInpage] = useState([])
  const [page,setPage] = useState(0)

  const pagination =()=>{
    const foodPerPage = 2;// แสดงรายการอาหาร 3 ราการต่อ 1 หน้า
    const pages = Math.ceil(MenuData.length / foodPerPage)

    const newFood = Array.from({length:pages},(data,index)=>{
      const start = index * foodPerPage
      return MenuData.slice(start,start+foodPerPage)
    })
    return newFood
  }

  const handlePage = (index)=>{
    setPage(index)
  }
  useEffect (()=>{
    const paginate = pagination()
    setDataInpage(paginate)
    setFoodData(paginate[page])
  },[page])

  return (
    <div className="App">
      <h1>FoodCard | Pagination</h1>
      <div className='container'>
        {foodData.map((data,index)=>{
        return <FoodComponent key={index} {...data}/>
      })}
      </div>
      <div className="pagination-container">
        {dataInpage.map((data,index)=>{
          return (
            <button key={index} 
            onClick={()=>handlePage(index)}
            className={`page-btn ${index === page ? "active-btn":null}`}>{index+1}</button>
          )
        })}
      </div>
    </div>
  )
}

export default App
