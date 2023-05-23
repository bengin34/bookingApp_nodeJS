import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import { useLocation } from "react-router-dom";

const List = () => {

  const location = useLocation()
  console.log(location)
  const [destination, setDestination] = useState(location.state.destination)
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
            <input type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
            <input type="text" />
            </div>
            <div className="lsItem">
              <label>Destination</label>
            <input type="text" />
            </div>
            
          </div>
          <div className="listResult"></div>
        </div>
      </div>
    </div>
  );
};

export default List;
