import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JsonBuilder from './components/JsonBuilder'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' w-[100%]  flex justify-center items-center p-4'>
      <div className='w-[80%] flex flex-col justify-center items-center p-4 gap-4'>
        <h1 className='text-4xl'>Build Your JSON Schema</h1>
        <p className='text-xl w-[80%] flex flex-col  justify-center items-center text-center'> Create custom JSON schemas by adding fields, defining their types (String, Number, Nested), and previewing the schema in real-time. Start building your schemas
          now!</p>
        <JsonBuilder className={"w-[100%]"} />
      </div>

    </div>
  )
}

export default App
