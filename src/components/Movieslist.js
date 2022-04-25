import React from 'react'

function Movieslist({movies}) {


  console.log('movies', movies)
  return (
    <section>
     
   <ul 
        className='styled w-100 pl-0' 
        data-testid='moviesList'
      >
  { movies.map((movie) => {
     return(<li 
        className='flex slide-up-fade-in justify-content-between'
        style={{borderBottom: '2px solid var(--primary-color)'}}
      >
        <div className='layout-column w-40'>
          {movie.movieName}
          <h3 className='my-3'></h3>
          {movie.Rating}
          <p className='my-0'></p>
        </div>
        <div className='layout-row my-auto mr-20'>
          {movie.duration}
          <p className='justify-content-end'></p>
        </div>
      </li>)
      })  }
      </ul>
       
    </section>
  )
}

export default Movieslist;
