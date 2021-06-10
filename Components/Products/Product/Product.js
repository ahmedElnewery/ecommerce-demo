import React from "react";
import Rating from "../../UI/Rating/Rating";
import Link from "next/link";
const Product = ({ product }) => {
  return (
   
    <div className="card my-3  rounded flex-fill">
      <Link href={`/product/${product._id}`}>
        <a>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        </a>
      </Link>
      <div className="card-body">
        <Link href={`/product/${product._id}`}>
          <a >
            {" "}
            <h5 className="card-title">
              <strong>{product.name}</strong>
            </h5>
          </a>
        </Link>
        <div className="card-text my-3">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
        <h3 className="card-text">{product.price}</h3>
      </div>
    </div>
  );
};

export default Product;
