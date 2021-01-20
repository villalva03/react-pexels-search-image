import React, { useState } from 'react';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import './Search.css';
import Button from '@material-ui/core/Button';
import PhotoResult from '../PhotoResults/PhotoResults';

function Search() {

    const [url] = useState('https://api.pexels.com/v1');
    const [apiKey] = useState(process.env.REACT_APP_APIPEXELS);
    const [textSearch, setTextSearch] = useState('');
    const [resultSearch, setResultSearch] = useState([]);
    const [nextPage, setNextPage] = useState('');

    const onChangeText = (e) =>{
        setTextSearch(e.target.value);
    }

    const onClickSearch = () => {
        if (textSearch !== '') {
            axios({
                method: 'GET',
                url: `${url}/search?query=${textSearch}`,
                headers: {
                    'Authorization': apiKey
                }
              })
              .then(res => {
                setResultSearch(res.data);
                setNextPage(res.data.next_page);
              })
              .catch(err => {
                  console.log(err);
              })
        }else{
            setResultSearch([]);
        }
    }

    return(
        <div className='AppBar'>
            <div className='Search'>
                <TextField 
                    className='TextField' 
                    label='Search photos'
                    variant='standard'
                    color='secondary'
                    inputProps={{ style: { color: 'white', fontSize: 20}}}
                    value={textSearch}
                    onChange={onChangeText}
                />
                <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<SearchIcon className='SearchIcon' fontSize='large' />}
                onClick={onClickSearch}
                >
                Search
                </Button>
            </div>
            {resultSearch.total_results > 0 ? 
                (<PhotoResult image={resultSearch} nextPage={nextPage} />) 
            : null}
        </div>
        
    )
}

export default Search
