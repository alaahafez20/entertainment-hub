import React from 'react'
import { img_300, unavailable } from '../../config/config'
import './SingleContent.css'
import Badge from '@material-ui/core/Badge'
import ContentModal from '../ContentModal/ContentModal'

const SingleContent = ({ item, type, Type, id }) => {
    return (
        <ContentModal Type={Type} id={id}>
            <Badge badgeContent={item.vote_average} color={item.vote_average > 6 ? 'primary' : 'secondary'} />
            <img className='poster' src={item.poster_path ? `${img_300}/${item.poster_path}` : unavailable}></img>
            <b className='title'>{item.name || item.title}</b>
            <span className='subTitle'>
                {type}
                <span className='subTitle'>{item.release_date || item.first_air_date}</span>
            </span>
        </ContentModal>
    )
}

export default SingleContent
