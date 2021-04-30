import React from 'react'
import { useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import SearchBox from './SearchBox';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const SideBar = (props) => {

    const productCategory = useSelector(state => state.productCategory);

    const { loading: loadingCategories, error: errorCategories, categories } = productCategory;
  
    return (
        <aside className={props.sideBarIsOpen ? 'open' : ''}>
                <ul className="categories">
                    <li>
                        <strong>Categories</strong>
                        <button 
                            onClick={() => props.setSideBarIsOpen(false)}
                            className="close-sidebar"
                            type="button"
                        >
                            <i className="fa fa-close"></i>
                        </button>
                    </li>
                    {loadingCategories ? (<LoadingBox />)
                    :
                    errorCategories ? (<MessageBox variant="danger">{errorCategories}</MessageBox> )
                    :(
                        categories && categories.map(c => (
                            <li key={c}>
                                <Link 
                                    to={`/search/category/${c}`}
                                    onClick={() =>  props.setSideBarIsOpen(false)}    
                                >{c}</Link>
                            </li>
                        ))
                    )}
                    <Route render={({history}) => <SearchBox history={history}/>}/>
                </ul>
        </aside>
    );
};

export default SideBar;
