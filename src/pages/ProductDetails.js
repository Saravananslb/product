import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import '../styles/productDetails.css';

function ProductDetails() {
    const [productDetails, setProductDetails] = useState({});
    const [username, setUsername] = useState('User');

    const { state } = useContext(Context);
    const { productid } = useParams();

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        state.products.map(product => {
            product.products.map(item => {
                if (item.productId == productid) {
                    setProductDetails(item)
                }
            })
        })
        // setProductDetails(state.products);
                
    }, []);

    const addToCart = () => {
        const productId = window.location.pathname.split('/')[2];
        const data = {
            productId,
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token")
        };

        setProductDetails(state.products)
           
    }

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
                                <Link className="text-decoration-none" to={"/products"}>Ecommerce</Link>
                            </div>
                            <div className="user-actions d-flex flex-row">
                                <Link className="text-decoration-none" to={"/account"}>Account</Link>
                                <Link className="text-decoration-none" to={"/cart"}>Cart</Link>
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
                                    <Link
                                        className="product-details-action btn btn-primary text-decoration-none"
                                        to={"/cart"}
                                    >
                                        Go To Cart
                                    </Link>
                                ) : (
                                    <div className="product-details-action btn btn-primary text-decoration-none" onClick={addToCart}>Add To Cart</div>
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