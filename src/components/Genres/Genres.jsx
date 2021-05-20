import { Chip, Container } from '@material-ui/core'
import axios from 'axios'
import React, {useEffect} from 'react'

const Genres = ({ selectedGenres, setSelectedGenres, genres, setGenres, setPage }) => {
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter(g => g.id !== genre.id))
        setPage(1)
    }
    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter(gs => gs.id !== genre.id))
        setGenres([...genres, genre])
        setPage(1)
    }

    useEffect(async() => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setGenres(data.genres)
    }, [])

    return (
        <div style={{padding: '6px 0 20px'}}>
            <Container>
                {selectedGenres && selectedGenres.map(selectedGenre => <Chip label={selectedGenre.name} onDelete={()=>handleRemove(selectedGenre)} style={{margin: '0 5px 10px 0'}} color='primary' key={selectedGenre.id} clickable size='small'/>)}
                {genres && genres.map(genre => <Chip label={genre.name} style={{margin: '0 5px 10px 0'}} onClick={()=>handleAdd(genre)}  key={genre.id} clickable size='small'/>)}
            </Container>
        </div>
    )
}

export default Genres
