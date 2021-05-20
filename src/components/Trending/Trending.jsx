import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../CustomPagination/CustomPagination'
import SingleContent from '../SingleContent/SingleContent'
import './Trending.css'

const Trending = () => {
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)

    useEffect(async() => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
        setContent(data.results)
        console.log(data.results);
    }, [page])

    return (
        <div>
            <span className='pageTitle'>Trending</span> 
            <div className='trending'>
                {content && content.map(item => <SingleContent id={item.id} Type={item.media_type==='tv'? 'tv': 'movie'} key={item.id} item={item} type={item.media_type==='tv'? 'TV Series': 'Movie'} />)}
            </div>
            <CustomPagination setPage={setPage}/>
        </div>
    )
}

export default Trending
