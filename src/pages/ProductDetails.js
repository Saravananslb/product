import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import '../styles/productDetails.css';

function ProductDetails() {
    const [productDetails, setProductDetails] = useState({});
    const [username, setUsername] = useState('User');

    const { state } = useContext(Context);
    const [productid, setProductId] = useState();

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        let productid = window.location.pathname.split('/')[2];
        setProductId(productid)
        state.products.map(product => {
            product.products.map(item => {
                if (item.productId == productid) {
                    setProductDetails(item)
                }
            })
        })
                
    }, []);

    

    const logoutFn = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('token')

        window.location.href = "/";
    }

    return (
        <div id="productDetailsPage">
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div className="header-wrapper d-flex justify-content-between">
                            <div className="logo d-inline-block">
                                <a href="/products" className="text-decoration-none">Ecommerce</a>
                            </div>
                            <div className="user-actions d-flex flex-row">
                                <a href="/account" className="text-decoration-none">Account</a>
                                <a href="/cart" className="text-decoration-none" >Cart</a>
                                <div className="user-intro">Hi {username}</div>
                                <div className="logout-btn" onClick={logoutFn}>Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="product-details-wrapper d-flex flex-row">
                        <div className="product-img d-flex">
                            <div>
                                <img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" />
                            </div>
                        </div>
                        <div className="product-details-box d-flex flex-column">
                            <div className="product-name">{productDetails.name}</div>
                            <div className="product-price fw-bold">₹ {productDetails.price}</div>
                            <div className="product-description">
                                <div className="product-description-title fw-bold">Description</div>
                                <div className="product-description-data">{productDetails.description}</div>
                            </div>
                            {
                                productDetails && productDetails.addedToCart == 1 ? (
                                    <a href="/cart"
                                        className="product-details-action btn btn-primary text-decoration-none"
                                    >
                                        Go To Cart
                                    </a>
                                ) : (
                                    <div className="product-details-action btn btn-primary text-decoration-none" >Add To Cart</div>
                                )
                            }
                            <div className="add-to-cart-error-msg text-danger"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;