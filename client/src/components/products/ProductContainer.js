import React from 'react';
import { Link } from 'react-router-dom';

const ProductContainer = ({ products }) => (
    <ul>
        {
            products.map(product => (
                <li key={product.id}>
                    <div>
                        <span>Name: {product.name}</span>
                        <br />
                        <span>Description: {product.description}</span>
                        <br />
                        <span>Price: ${product.price}</span>
                        <br />
                        <Link to={"/products/" + product.id}>View Product</Link>
                    </div>
                </li>
            ))
        }
    </ul>
)

export default ProductContainer;