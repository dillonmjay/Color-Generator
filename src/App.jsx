import { useState, useEffect } from "react";
import Values from 'values.js'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  let [formData,setFormData] = useState({color:"#000000"});
  let [tints,setTints] = useState([])
  let [shades,setShades] = useState([])
  let [initialColor,setColor] = useState("#000000");
  useEffect(()=>{
    let colors = new Values(initialColor)
    let tints = colors.tints(10).map(tint =>"#"+tint.hex)
    let shades = colors.shades(10).map(shade =>"#"+shade.hex)
    setTints(prevState =>{
      tints.reverse();
      return prevState = tints;
    })
    setShades(prevState => prevState = shades)
  },[])
  function handleFormChange(e){
    let {value} = e.target;
    setFormData(prevState=>{
      return{
        ...prevState,
        color:value
      }
    })
  }
  function handleSubmit(e){
    e.preventDefault();
    if(formData.color === ""){
      toast.error("Invalid entry, enter again",{position:"top-center"})
    }
    let color = new Values(formData.color)
    let tints = color.tints(10).map(tint =>"#"+tint.hex)
    let shades = color.shades(10).map(shade =>"#"+shade.hex)
    setTints(prevState => {
      tints.reverse()
      return prevState = tints;
    })
    setShades(prevState => prevState = shades)
    setColor(prevState => prevState = formData.color)
  }
  function handleClipBoard(color){
    navigator.clipboard.writeText(color);
    toast.success("Copied to clipboard!")
  }
  return (
    <div>
      <h1 className="title">Color Generator</h1>
      <p className="title-underline" style={{backgroundColor:formData.color}}></p>
      <div className="container">
        <form className="color-form" onSubmit={handleSubmit}>
          <input type="color" name="color" value={formData.color} onChange={handleFormChange}></input>
          <input type="text" placeholder={formData.color} value={formData.color} onChange={handleFormChange}></input>
          <button type="submit" className="btn" style={{backgroundColor:formData.color}}>Submit</button>
        </form>
      </div>
      <div className="colors">
        {tints.map((tint,index)=>(
          <div key={index} className="color" style={{backgroundColor:tint}} onClick={()=>{handleClipBoard(tint)}}>
            <p>Hex : {tint}</p>
          </div>
        ))}
        <div className="color" style={{backgroundColor:initialColor}} onClick={()=>{handleClipBoard(initialColor)}}>
          <p>Hex : {initialColor}</p>
        </div>
        {shades.map((shade,index)=>(
          <div key={index} className="color" style={{backgroundColor:shade,color:"white"}} onClick={()=>{handleClipBoard(shade)}}>
            <p>Hex : {shade}</p>
          </div>
        ))}
      </div>
      <ToastContainer autoClose={2000}/>
    </div>
  );
};
export default App;
