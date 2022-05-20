import './Search.css';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../components/styled/Loading';
import Error from '../components/styled/Error';
import Info from '../components/styled/Info';
import FoodItem from '../components/FoodItem';
import * as searchActionTypes from '../actionTypes/search';
import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';


function Search() 
{
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    const resultSearch = useSelector(state => state.search.result);
    const searchResults = useSelector(state => state.search.data);
    const dispatch = useDispatch();

    useEffect(() => {
        if(query && Object.keys(resultSearch).length === 0)
        {
            dispatch({
                type: searchActionTypes.SEARCH_RESULT_LOADING
            });
            dispatch({
                type: searchActionTypes.SEARCH_RESULT,
                payload: {query}
            });
        }

    }, [query, resultSearch]);


    return (<div className="search-page">
                 {resultSearch.loading && <Loading />}
                 {resultSearch.error && <Error error={resultSearch.error} />}
                 {resultSearch.success && searchResults.length === 0 && <Info info="Search is not found." />}
                <div className="search-page__results">
                    {searchResults.map((searchResult, index) => (<FoodItem key={index} foodItem={searchResult} />))}
                </div>
            </div>);
}

export default Search;