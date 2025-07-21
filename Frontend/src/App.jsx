import Welcome from './components/Welcome'
import './App.css'
import { NavBar } from './components/NavBar/NavBar'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { Products } from './components/Products/Products'
function App() {
  return (
    <div className="App">
          <BrowserRouter>
     <NavBar/>
<Routes>
 <Route path= "/products" element={ <Products/>}/>
</Routes>
   
   
    </BrowserRouter>
    </div>
  )
}

export default App
