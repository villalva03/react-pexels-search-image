import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
import '../PhotoResults.css';
  
function PhotoResults({image, nextPage, ...props}) {

    const [apiKey, setApiKey] = useState('GET AN API KEY AT https://pixabay.com/');
    const [imagePage, setImagePage] = useState([]);
    const [next, setNext] = useState('');
    const [prevPage, setPrevPage] = useState('');
    const [numberPage, setNumberPage] = useState(1);

    useEffect(()=>{
        setNext(nextPage);
    },[nextPage])

    useEffect(()=>{
        setImagePage(image);
    },[image])

    const onClickNextPage = () => {
            axios({
                method: 'GET',
                url: next,
                headers: {
                    'Authorization': apiKey
                }
            })
            .then(res => {
                setImagePage(res.data);
                setNext(res.data.next_page);
                setPrevPage(res.data.prev_page);
                setNumberPage(res.data.page);
            })
            .catch(err => {
                console.log(err);
            })     
    }

    const onClickPrevPage = () => {
        axios({
            method: 'GET',
            url: prevPage,
            headers: {
                'Authorization': apiKey
            }
        })
        .then(res => {
            setImagePage(res.data);
            setNext(res.data.next_page);
            setPrevPage(res.data.prev_page);
            setNumberPage(res.data.page);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <div>
            <div className='imgContainer'>
            {imagePage.length !== 0 ? 
                imagePage.photos.map(image=>(
                    <div className='imgItem' key={image.id}> 
                        <img className='img' src={image.src.large} alt="" />
                        <div className='imgAutor'>
                            <Avatar  alt="" src={image.photographer_url} />
                            <h4 className='nameAutor'>{image.photographer}</h4>
                        </div>
                    </div>
                )) 
            : null}  
            </div>
            <div className='containerPage'>
                <div className='prevPage'>
                    {numberPage > 1 ?
                        <Fab color="secondary" aria-label="arrowBack" onClick={onClickPrevPage} >
                            <ArrowBackIosIcon /> 
                        </Fab>  
                    :null}
                </div>

                <div className='pageNumber'>
                    <Fab color="secondary" aria-label="pageNumber">
                        <h3>{numberPage}</h3>
                    </Fab>  
                </div>

                <div className='nextPage'>
                    <Fab color="secondary" aria-label="arrowNext" onClick={onClickNextPage} >
                        <ArrowForwardIosIcon /> 
                    </Fab>
                </div>  
            </div>
        </div>   
    )
}

export default PhotoResults



