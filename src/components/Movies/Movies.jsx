import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../CustomPagination/CustomPagination'
import Genres from '../Genres/Genres'
import SingleContent from '../SingleContent/SingleContent'
import './Movies.css'

const useGenre = (selectedGenres) => {
    if(selectedGenres.length < 1) return ''
    return selectedGenres.map(sg => sg.id).join()
}

const Movies = () => {
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)
    const [numOfPages, setNumOfPages] = useState()
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const genreforURL = useGenre(selectedGenres)

    useEffect(async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
        setContent(data.results)
        setNumOfPages(data.total_pages)
        console.log(data.results)
    }, [page, genreforURL])

    return (
        <div>
            <span className='pageTitle'>Movies</span>
            <Genres
                type="movie"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className='movies'>
                {content && content.map(item => <SingleContent key={item.id} Type='movie' id={item.id} item={item} type='Movie' />)}
            </div>
            {numOfPages>1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}
        </div>
    )
}

export default Movies

