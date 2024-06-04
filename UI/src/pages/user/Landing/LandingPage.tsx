import { useNavigate } from "react-router-dom"

const LandingPage = () => {
const navigate=useNavigate();
  return (
    <div>
        <h1>Landing</h1>
        <button onClick={()=>navigate('/register')}>register</button>
    </div>
  )
}

export default LandingPage
