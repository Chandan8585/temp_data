import LeftSidebar from '@/components/LeftSidebar';
import Menu from '@/components/Menu';
import { useFetchData } from '@/lib/api';
import React, { useEffect, useState } from 'react';
import './product.css'
import { useNavigate, useParams } from 'react-router-dom';
const AddProduct = () => {
    const {isLoading : isCategoryLoading, data : categories, error: categoryError} = useFetchData("/category");
    const {isLoading: isCounterLoading, data: counter, error: counterError} = useFetchData("/counter");
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [counterData , setCounterData] = useState([]);
    const [selectedCounterId, setSelectedCounterId] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    const [product ,setProduct] = useState({
        name: '',
        category: '',
        subCategory: '',
        counter: '',
        unit: '',
        saleRate: '',
        hsn: '',
        gstType: 'Including Gst',
        gstRate: '18%'
    }) 
    useEffect(()=>{

    }, [id])
    const handleCounterChange = (e) => {
        setSelectedCounterId(e.target.value);
    };
    useEffect(() => {   
        if (counter) {
          setCounterData(counter.counter);
        }
      }, [counter]);
      console.log("counterData",counterData)
    console.log("counter", counter)
    if (isCategoryLoading || isCounterLoading) {
        return <div>Loading...</div>;
      }
    
      if (categoryError || counterError) {
        return <div>Error occurred while fetching data.</div>;
      }

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategoryId(categoryId);
    
        const selectedCategory = data.find(item => item._id === categoryId);
        if (selectedCategory) {
            setSubCategories(selectedCategory.subCategory || []);
        } else {
            setSubCategories([]);
        }
    
        setSelectedSubCategory(''); 
    };
    
    const handleSubCategoryChange = (e) => {
        setSelectedSubCategory(e.target.value);
    };
   
    return (
        <div>
          <Menu/>
            <div id="layoutSidenav">
                <LeftSidebar/>
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid respo_form">
                            <h2 className="mt-30 page-title">Products</h2>
                            <ol className="breadcrumb mb-30">
                                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                <li className="breadcrumb-item"><a href="products.html">Products</a></li>
                                <li className="breadcrumb-item active">Add Product</li>
                            </ol>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-title-2">
                                            <h4>Add New Product</h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="news-content-right pd-20">
                                                <div className="form-group">
                                                    <label className="form-label">Name*</label>
                                                    <input type="text" className="form-control" placeholder="Product Name" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Category*</label>
                                                    <select
                                                        id="category"
                                                        name="category"
                                                        className="form-control"
                                                        value={selectedCategoryId}
                                                        onChange={handleCategoryChange}
                                                    >
                                                        <option value="">Select Category</option>
                                                        {categories && categories.map((item) => (
                                                        <option value={item._id} key={item._id}>
                                                            {item.key}
                                                        </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Sub Category*</label>
                                                    <select
                                                        id="subCategory"
                                                        name="subCategory"
                                                        className="form-control"
                                                        value={selectedSubCategory}
                                                        onChange={handleSubCategoryChange}
                                                        disabled={subCategories.length === 0}
                                                    >
                                                        <option value="">Select Sub Category</option>
                                                        {subCategories.map((sub, index) => (
                                                        <option value={sub} key={index}>
                                                            {sub}
                                                        </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Counter</label>
                                                    <select
                                                        id="counter"
                                                        name="counter"
                                                        className="form-control"
                                                        value={selectedCounterId}
                                                        onChange={handleCounterChange}
                                                    >
                                                        <option value="">Select Counter</option>
                                                        {counterData?.map((item) => (
                                                            <option value={item._id} key={item._id}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Unit</label>
                                                    <select
                                                        id="subCategory"
                                                        name="subCategory"
                                                        className="form-control"
                                                        // value={unit} 
                                                        // onChange={handleInputChange}
                                                      
                                                    >
                                                        <option value="">Select Unit</option>
                                                        <option value="">kilogram (kg)</option>
                                                        <option value="">grams (g)</option>
                                                        <option value="">Litre</option>
                                                        <option value="">millilitre</option>
                                                    
                                                      
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Sale Rate</label>
                                                    <input type="text" className="form-control" placeholder="Rs 0" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">HSN</label>
                                                    <input type="text" className="form-control" placeholder="0" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">GST Type:</label>
                                                    <select
                                                        id="category"
                                                        name="category"
                                                        className="form-control"
                                                  
                                                    >
                                                        <option value="">Including Gst</option>
                                                        <option value="">Excluding Gst</option>
                                                     
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">GST Rate:</label>
                                                    <select
                                                        id="category"
                                                        name="category"
                                                        className="form-control"
                                                  
                                                    >
                                                        <option value="">25 %</option>
                                                        <option value="">18 %</option>
                                                        <option value="">12 %</option>
                                                        <option value="">5 %</option>
                                                    </select>
                                                </div>
                                           
                                                <button className="save-btn hover-btn" type=" ">Add New Product</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer className="py-4 bg-footer mt-auto">
                        <div className="container-fluid">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted-1">© 2024 <b>Gambo Supermarket</b>. by <a href="https://themeforest.net/user/gambolthemes">Gambolthemes</a></div>
                                <div className="footer-links">
                                    <a href="http://gambolthemes.net/html-items/gambo_supermarket_demo/privacy_policy.html">Privacy Policy</a>
                                    <a href="http://gambolthemes.net/html-items/gambo_supermarket_demo/term_and_conditions.html">Terms & Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
     
        </div>
    );
};

export default AddProduct;
