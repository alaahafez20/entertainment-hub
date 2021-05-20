import { Button, Container, createMuiTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import SearchIcon from "@material-ui/icons/Search"
import './Search.css'
import axios from 'axios'
import CustomPagination from '../CustomPagination/CustomPagination'
import SingleContent from '../SingleContent/SingleContent'

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#fff",
        },
    },
});

const Search = () => {
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [numOfPages, setNumOfPages] = useState()

    const handleChange = (event, newValue) => {
        setType(newValue)
        setPage(1)
    }

    const fetchSearch = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
        setContent(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(() => {
        window.scroll(0, 0)
        fetchSearch()
        if (!searchText) {
            setContent([])
        }
    }, [type, page, searchText])

    return (
        <div>
            <Container>
                <ThemeProvider theme={darkTheme}>
                    <div className='search'>
                        <TextField onChange={e => setSearchText(e.target.value)} style={{ flex: 1 }} className='searchBox' label="Search" variant="filled" />
                        <Button onClick={fetchSearch} variant="contained" style={{ marginLeft: 10 }}>
                            <SearchIcon fontSize="large" />
                        </Button>
                    </div>
                    <Tabs value={type} onChange={handleChange} centered indicatorColor="primary" textColor="primary" style={{ paddingBottom: 5 }} aria-label="disabled tabs example">
                        <Tab style={{ width: "50%" }} label="Search Movies" />
                        <Tab style={{ width: "50%" }} label="Search TV Series" />
                    </Tabs>
                </ThemeProvider>
                <div>
                    <div className='trending'>
                        {content && content.map(item => <SingleContent key={item.id} id={item.id} Type={type ? 'tv' : 'movie'} item={item} type={type ? 'TV Series' : 'Movie'} />)}
                        {searchText && content.length<1 && 
                        (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
                    </div>
                    {numOfPages > 1 && searchText && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}
                </div>
            </Container>
        </div>
    )
}

export default Search
