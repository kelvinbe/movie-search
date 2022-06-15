import { use } from 'chai'
import { setState } from 'expect'
import React, {useState} from 'react'
import Movieslist from './Movieslist'
import Search from './Search'

function Movieform(props) {

  const initialData = {_name_: '', _rating_: '', _duration_: ''}
  const [formData, setFormData] = useState(initialData)
  const [movie, setMovies] = useState([])
  const [error, setError] = useState(false)
  const [searchTearm, setTearm] = useState('')
  const [results, setResults] = useState(false)

  const handleChange = (e) => {

    const {name, value} = e.target
    console.log('name', name)
    console.log('valueee', typeof value)


    if(name === '_duration_' && value.length > 0){
      setError(false)
    }

    setFormData({...formData, [name]: value})


  }


  const onSubmit = () => {
    if(formData._duration_ === '' || formData._name_ === '' || formData._rating_ === '') return 
    if(!(formData._duration_.includes('h') || formData._duration_.includes('m'))){
      setError(true)
    }else if(formData._duration_.includes('m')){
          const sec = parseInt(formData._duration_) * 60
          const newMovie = {
            _name_: formData._name_,
            _rating_: formData._rating_,
            _duration_: sec
          }
          setMovies([...movie, newMovie])
                 
    }else{
      const reg = /h+/g
      const hours = formData._duration_.replace(reg, '')
      const sec = Number(hours) * 3600
      if(isNaN(sec)){return setError(true)}
      const newMovie = {
          _name_: formData._name_,
          _rating_: formData._rating_,
          _duration_: sec
        }  
      setMovies([...movie, newMovie])
    }
  }

  console.log('data', formData)
  console.log('movie', movie)
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
              name='_name_'
              onChange={handleChange}
            />
          </div>
          <div className='layout-column mb-15'>
            <label htmlFor='ratings' className='mb-3'>Ratings</label>
            <input 
              type='number' 
              id='ratings'
              placeholder='Enter Rating on a scale of 1 to 100'
              data-testid='ratingsInput'
              name='_rating_'
              onChange={handleChange}
            />  
          </div>
          <div className='layout-column mb-30'>
            <label htmlFor='duration' className='mb-3'>Duration</label>
            <input 
              type='text' 
              id='duration'
              placeholder='Enter duration in hours or minutes'
              data-testid='durationInput'
              name='_duration_'
              onChange={handleChange}
            />
          </div>
          {/* Use this div when time format is invalid */}
        {error && <div 
            className='alert error mb-30'
            data-testid='alert'
          >
            Please specify time in hours or minutes (e.g. 2.5h or 150m)
          </div>}
          <div className='layout-row justify-content-end'>
            <button 
              type='submit'
              className='mx-0'
              data-testid='addButton'
              onClick={onSubmit}
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
          <Search searchTearm={searchTearm} setTearm={setTearm} />
          <Movieslist movies={movie} searchTearm={searchTearm} setResults={setResults}/> 
          {results && <div data-testid='noResult'>
            <h3 className='text-center'>No Results Found</h3>
          </div>}
        </div>
      </div> 
    </div>
    )
  
}

export default Movieform
