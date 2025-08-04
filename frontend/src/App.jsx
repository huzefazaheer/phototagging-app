import './App.css'
import Canvas from './components/canvas/canvas'
import Tasks from './components/tasks/tasks'

function App() {
  return (
    <>
      <Canvas />
      <div className="buttonholder">
        <button className="exitbutton">Exit</button>
        <button className="helpbutton">View Help</button>
      </div>
      <Tasks />
    </>
  )
}

export default App
