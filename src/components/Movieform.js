import { use } from 'chai'
import { setState } from 'expect'
import React, {useState} from 'react'
import Movieslist from './Movieslist'
import Search from './Search'

function Movieform(props) {

    const [movies, setMovies] = useState([])
    const [name, setName] = useState('')
    const [ratings, setRating] = useState(null)
    const [duration, setDuration] = useState('')
    const [error, setError] = useState(false)

    const handleName = (e) => {
      console.log(e.target.value)

      setName(e.target.value)
    }
    const handleRating = (e) => {
      console.log(e.target.value)

      setRating(e.target.value)
      
    }
    const handleDuration = (e) => {
      console.log(e.target.value) 
      if(e.target.value.length > 0){
        setError(false)
      }
      setDuration(e.target.value)
      
    }

    const handleAddMovie = () => {
      if(!duration.includes('m') || duration.includes('h')){
          console.log('duration', duration)
          
          
          setError(true)
      }

      if(duration.includes('m')){
        const numDuration = parseInt(duration)
        const hrs = Math.floor(numDuration / 60)
        hrs.toString()
        return setDuration(hrs)
        
      }
      console.log('duration', duration)

        const newMovie = {
          'movieName': name,
          'Rating': ratings,
          'duration': duration
        }
        console.log(newMovie)
       setMovies([...movies, newMovie])
       console.log(movies)

    }

const Form = () => {

  return (
    <section>
      <div className='card pa-30'>
        <form onSubmit={ e => e.preventDefault() }>
          <div className='layout-column mb-15'>
            <label htmlFor='name' className='mb-3'>Movie Name</label>
            <input 
              type='text' 
              id='name'
              placeholder='Enter Movie Name'
              data-testid='nameInput'
              onChange={handleName}
              value={name}
            />
          </div>
          <div className='layout-column mb-15'>
            <label htmlFor='ratings' className='mb-3'>Ratings</label>
            <input 
              type='number' 
              id='ratings'
              placeholder='Enter Rating on a scale of 1 to 100'
              data-testid='ratingsInput'
              onChange={handleRating}
              value={ratings}
            />
          </div>
          <div className='layout-column mb-30'>
            <label htmlFor='duration' className='mb-3'>Duration</label>
            <input 
              type='text' 
              id='duration'
              placeholder='Enter duration in hours or minutes'
              data-testid='durationInput'
              onChange={handleDuration}
              value={duration}
            />
          </div>
          {/* Use this div when time format is invalid */}
         {error &&<div 
            className='alert error mb-30'
            data-testid='alert'
          >
            Please specify time in hours or minutes (e.g. 2.5h or 150m)
          </div> }
          <div className='layout-row justify-content-end'>
            <button 
              type='submit'
              className='mx-0'
              data-testid='addButton'
              onClick={handleAddMovie}
              
            >
              Add Movie
            </button>
          </div>
          </form>
      </div> 
    </section>
  )

}
const title = 'Favorite Movie Directory'
    

    return (
      <div>
      <h8k-navbar header={ title } />
      <div className='layout-row justify-content-center mt-100'>
        <div className='w-30 mr-75'>
          {Form()}
        </div>
        <div className='layout-column w-30'>
          <Search />
          <Movieslist movies={movies} /> 
          <div data-testid='noResult'>
            <h3 className='text-center'>No Results Found</h3>
          </div>
        </div>
      </div> 
    </div>
    )
  
}

export default Movieform
