
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import {About, Detail, Form, Home, Landing} from '../src/views'
import axios from 'axios'
axios.defaults.baseURL='https://videogamespi-gikh.onrender.com';



function App() {

    const location = useLocation()
  return (
    <>
      <div className='App'>

        <Routes>
          <Route path='/' element = {<Landing/>} />
          <Route path='/about' element = {<About/>} />
          <Route path='/home' element = {<Home/>} />
          <Route path='/detail/:detailId' element = {<Detail/>} />
          <Route path='/create' element = {<Form/>} />
        </Routes>
      </div>
     
    </>
  )
}

export default App
