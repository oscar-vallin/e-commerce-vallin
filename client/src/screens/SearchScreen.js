import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { listProductsAction } from '../actions/productActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import Product from '../components/Product';
import { prices, ratings } from '../utils';
import Rating from '../components/Rating';

export const SearchScreen = (props) => {
    const { name = 'all', category = 'all', min = 0, max = 0, rating = 0, order = 'newest' } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const productCategory = useSelector(state => state.productCategory);

    const { loading, error, products } = productList;
    const { loading: loadingCategories, error: errorCategories, categories } = productCategory;
    useEffect(() => {
        dispatch(listProductsAction({
            name: name !== 'all' ? name: '', 
            category: category !== 'all' ? category: '',
            min, 
            max,
            rating,
            order
        }));
    },[dispatch, name, category, min, max,rating, order]);

    const getFilterUrl = filter => {

        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/searh/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`
    }
    return (
        <div>
            <div className="row">
                {loading ? (<LoadingBox />)
                :
                error ? (<MessageBox variant="danger">{error}</MessageBox> )
                :(
                <div>{products.length} Results</div>
                 )}     
                <div>
                    Sort by {' '}
                    <select 
                        variant={order}
                        onChange={e => props.history.push(getFilterUrl({order: e.target.value}))}
                    >
                        <option value="newest">Newest Arrivals</option>
                        <option value="lowest">Price Low to High</option>
                        <option value="highest">Price: High to Low</option>
                        <option value="toprated">Avg. Custumer Reviews</option>
                    </select>
                </div>   
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>Departament</h3>
                    <div>
                    {loadingCategories ? (<LoadingBox />)
                    :
                    errorCategories ? (<MessageBox variant="danger">{errorCategories}</MessageBox> )
                    :(
                        <ul>
                            <li>
                                <Link className={'all' === category ? 'active': ''} to={getFilterUrl({category: 'all'})}>
                                            any
                                </Link>
                            </li>
                           {categories.map(c => (
                               <li key={c._id}>
                                   <Link className={c === category ? 'active': ''} to={getFilterUrl({category: c})}>
                                        {c}
                                   </Link>
                               </li>
                           ))};
                        </ul>
                    )}; 
                    </div>
                </div>
                <div>
                    <h3>Price</h3>
                    <ul>
                        {prices.map(p => (
                            <li key={p.name}>
                                <Link 
                                    to={getFilterUrl({min: p.min, max: p.max})}
                                    className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''}
                                    >
                                    {p.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Price</h3>
                    <ul>
                        {ratings.map(r => (
                            <li key={r.name}>
                                <Link 
                                    to={getFilterUrl({rating: r.rating})}
                                    className={`${r.rating}` === `${rating}` ? 'active': ''}
                                    >
                                    <Rating caption={' & up'} rating={r.rating}/>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-3">
                    {loading ? (<LoadingBox />)
                    :
                    error ? (<MessageBox variant="danger">{error}</MessageBox> )
                    :(
                        <>
                        {products.length === 0 && <MessageBox variant="danger">Not Products Found</MessageBox>}
                        <div className="row center">
                        {products.map(product => ( 
                            <Product
                                key={product._id}
                                product={product}
                            />
                        ))};
                         </div>
                        </>
                    )} 
                </div>
            </div>
        </div>
    );
};

export default SearchScreen;
