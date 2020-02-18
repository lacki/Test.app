import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Rating from '@prontopro/react-rating'

const Catalog = (props) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedReview, setSelectedReview] = useState([]);

    useEffect(() => {
        const load = async () => {
            const results = await getDatas();
            setProducts(results);
        }

        load();
    },[]);

    function setProduct(key) {
        setSelectedProduct(products[key]);
        const load = async () => {
            const results = await getReview(products[key].id);
            setSelectedReview(results);
        }

        load();
    }

    return (
        <>
            <h2>Каталог товаров</h2>
            <div className="row catalog-row">
                {products.map((item, key) => (
                    <div className="col-md-6" key={item.id}>
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="mb-0"><span className="product-name" onClick={(e) => setProduct(key)}>{item.title}</span></h3>
                                <p className="mb-auto" dangerouslySetInnerHTML={{ __html: item.text }} />
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img src={`http://smktesting.herokuapp.com/static/${item.img}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col-lg-4">
                        <div className="col p-4 d-flex flex-column position-static">
                            <h3 className="mb-0">{selectedProduct.title}</h3>
                            <p className="mb-auto" dangerouslySetInnerHTML={{ __html: selectedProduct.text }} />
                        </div>
                        <div className="col-auto d-none d-lg-block">
                            <img src={`http://smktesting.herokuapp.com/static/${selectedProduct.img}`} />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="col p-4 d-flex flex-column position-static">
                            <h3 className="mb-0">Отзывы:</h3>
                            <ul className="list-group">
                            {selectedReview.map((item, key) => (
                                <li className="list-group-item" key={item.id}>
                                    Rate: <Rating  initialRate={item.rate} readonly={true} /><br/>
                                    Text: {item.text}<br/>
                                    Created by: <i>{item.created_by.email}</i><br/>
                                    Date: <i>{item.created_at}</i>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const getDatas = async () => {
    const results = await axios.get(`http://smktesting.herokuapp.com/api/products/`);
    return results.data
}
const getReview = async (id) => {
    const results = await axios.get(`http://smktesting.herokuapp.com/api/reviews/${id}`);
    return results.data
}

export default Catalog;


