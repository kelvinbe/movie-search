import React from "react";

function Movieslist({ movies, searchTearm, setResults }) {

  const convertToHrs = (sec) => {
    const hours   = sec / 3600
    const display = Math.round(hours * 10) / 10
    return display

  }

  const orderBy = movies.sort((a, b) => {
    
    const num1 = Number(a._duration_)
    const num2 = Number(b._duration_)

    return (num1 > num2 ? -1 : 1)


  })


  const trimmedSearch = searchTearm.trim().toLowerCase()

  const showMovie = orderBy.filter((movie) => {
    const lowerMovie = movie._name_.trim().toLowerCase()
    if(trimmedSearch.length < 2){
      return movie
    }else if(lowerMovie.startsWith(trimmedSearch)){
      return movie
    }
 }).map((movie) => {
    return (
      <li
        className="flex slide-up-fade-in justify-content-between"
        style={{ borderBottom: "2px solid var(--primary-color)" }}
      >
        {`${movie._name_}Ratings: ${movie._rating_}/100${convertToHrs(movie._duration_)} Hrs`}
      </li>
    );
  });

  setResults(showMovie.length === 0 && searchTearm.length !== 0)

  return (
    <section>
    {showMovie.length > 0 &&  <ul className="styled w-100 pl-0" data-testid="moviesList">
        {showMovie}
      </ul>}
    </section>
  );
}

export default Movieslist;
