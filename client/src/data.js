
const Data = () => {
    return(
        <div class="card">
        <a href="product.html">
             {/* image size: 680px by 830px */}
            <img class="medium" src="./images/p1.jpg" alt="product"></img>
        </a>
        <div class="card-body">
            <a href="product.html">
                <h2>Nike Slim Shirt</h2>
            </a>
            <div class="rating">
                <span> <i class="fa fa-star"></i></span>
                <span> <i class="fa fa-star"></i></span>
                <span> <i class="fa fa-star"></i></span>
                <span> <i class="fa fa-star"></i></span>
                <span> <i class="fa fa-star"></i></span>
            </div>
            <div class="price">
                $120
            </div>
        </div>
    </div>
    );
};

export default Data;