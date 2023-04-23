import { useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomLocation from './utils/getRandomLocation'
import MainContent from './components/MainContent'
import Loading from './components/Loading'

function App() {

  const [inputValue, setInputValue] = useState(getRandomLocation())

  const url = `https://rickandmortyapi.com/api/location/${inputValue}`
  const [location, hasError] = useFetch(url)

  const inputLocation = useRef()

  const handleSubmit = e => {
    // event.targt.firsCgild.value
    e.preventDefault()
    setInputValue(inputLocation.current.value)
  }

  return (
    <div className='app'>
    {
      inputValue
        ?<>
          <img src="image.svg" alt="Imagen ilustracion de Rick and Morty pasando por un portal" />
          <h1 className='app__title'>Rick and Morty</h1>
          <form className='app__form' onSubmit={handleSubmit}>
            <input className='app__input' ref={inputLocation} type="text" placeholder='Shearch by ID'/>
            <button className='app__btn'>Search</button>
          </form>
          {
            hasError
              ? <h2 className='app__error'>❌ Hey! you must provide an id from 1 to 126 😟</h2>
              : <MainContent 
                location={location}
              />
          }
        </>
        :
        <Loading />
      }
    </div>
  )
}

export default App
