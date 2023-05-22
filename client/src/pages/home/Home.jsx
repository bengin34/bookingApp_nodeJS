import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import Featured from "../../components/featured/Featured"
import "./home.css"

const Home = () => {
  return (
    <div>
    <Navbar/>
     <Header/>
     <div className="homecontainer">
      <Featured />
      <Featured />
     </div>
    </div>
  )
}

export default Home


// 44.12