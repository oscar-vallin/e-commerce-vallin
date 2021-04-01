
// import Data from './data';
import {data} from './data2';

function App() {

  return(
    <div className="grid-container">
            <header className="row">
                <div>
                    <a className="brand" href="index.html">fifas</a>
                </div>
                <div>
                    <a href="cart.html">Cart</a>
                    <a href="sigin.html">Sign in</a>
                </div>
            </header>
            <main>
                <div className="row center">
                  {data.products.map(product => ( 
                     <div key={product._id} className="card">
                     <a href={`/product/${product._id}`}>
                          {/* image size: 680px by 830px */}
                         <img className="medium" src={product.image} alt="product"></img>
                     </a>
                     <div className="card-body">
                         <a href={`/product/${product._id}`}>
                             <h2>{product.name}</h2>
                         </a>
                         <div className="rating">
                             <span> <i className="fa fa-star"></i></span>
                             <span> <i className="fa fa-star"></i></span>
                             <span> <i className="fa fa-star"></i></span>
                             <span> <i className="fa fa-star"></i></span>
                             <span> <i className="fa fa-star"></i></span>
                         </div>
                         <div className="price">
                             {product.price}
                         </div>
                     </div>
                 </div>
                  ))};
                </div>
            </main>
            <footer className="row center">
                All right reserved
            </footer>
        </div>
  );
}

export default App;
