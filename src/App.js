import React, {useState, useEffect} from "react"
import { View } from "./components/View";

//getting values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('bags');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  const [bags, setBags]= useState([getDatafromLS()]);

  //input field states
  const [bag_name, setBagName]= useState('');
  const [brand, setBrand]= useState('');
  const [color, setColor]= useState('');
  const [price, setPrice]= useState('');

  //form submit event
  const handleAddBagSubmit=(e)=>{
    e.preventDefault();

    //creating an object
    let bag={
      bag_name,
      brand,
      color,
      price
    }
    setBags([...bags, bag]);
    setBagName('');
    setBrand('');
    setColor('');
    setPrice('');
  }

  //delete from LS
  const deleteBag=(bag_name)=>{
    const filteredBags=bags.filter((element,index)=>{
      return element.bag_name !== bag_name
    })
    setBags(filteredBags);
  }

  //saving data to local storage
  useEffect(()=>{
    localStorage.setItem('bags', JSON.stringify(bags));
  },[bags])

  return(
    <div className="wrapper">
      <div className="main">
        <div className="form-container bg-primary">
          <form autoComplete="off" className="form-group"
          onSubmit={handleAddBagSubmit}>
            <label>Bag Name</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setBagName(e.target.value)} value={bag_name}></input>
            <label>Brand</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setBrand(e.target.value)} value={brand}></input>
            <label>Color</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setColor(e.target.value)} value={color}></input>
            <label>Price</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setPrice(e.target.value)} value={price}></input>
            <br></br>
            <button type="submit" className="btn btn-primary btn-md">
              Add Bag
            </button>
          </form>
        </div>

        <div className="view-container bg-secondary">
          {bags.length>0&&<>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Bag Name</th>
                  <th>Brand</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              
                <View bags={bags} deleteBag={deleteBag}/>
              </tbody>
            </table>
          </div>
          <button className="btn btn-danger btn-md" 
          onClick={()=>setBags([])}>Remove All</button>
          </>}
          {bags.length <1 && <div>No bags added.</div>}
        </div>
      </div>
    </div>
  )
}

export default App;