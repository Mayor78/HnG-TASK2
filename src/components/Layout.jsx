
// import Header from './Header'

import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import FirstHeader from './FirstHeader'
import Nav from './Nav'




const Layout = () => {
  return (
    <div>



        <FirstHeader/>
        <Nav/>
       
        
      
         <Outlet/>












         
          
          <Footer/>
    </div>
  )
}

export default Layout