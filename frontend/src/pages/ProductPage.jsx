import React, { useState } from "react";
import { useFetchData } from "@/lib/api";
import { Navbar, Nav, NavDropdown, Button, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import LeftSidebar from "@/components/LeftSidebar";
import Menu from "@/components/Menu";
const ProductPage = () => {
  const { isLoading, data, error } = useFetchData("/product");




  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
 <div className="sb-nav-fixed">
   <Menu/>

    <div  id="layoutSidenav">
     <LeftSidebar/>
<div id="layoutSidenav_content">
      <main>
        <div className="container-fluid">
          <h2 className="mt-30 page-title">Products</h2>
          <ol className="breadcrumb mb-30">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Products</li>
          </ol>
          <div className="row justify-content-between">
            <div className="col-lg-12">
              <a href="add_product.html" className="add-btn hover-btn">
                Add New
              </a>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="bulk-section mt-30">
                <div className="input-group">
                  <select id="action" name="action" className="form-control">
                    <option selected>Bulk Actions</option>
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                    <option value="3">Delete</option>
                  </select>
                  <div className="input-group-append">
                    <button className="status-btn hover-btn" type="submit">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="bulk-section mt-30">
                <div className="search-by-name-input">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <div className="input-group">
                  <select id="categeory" name="categeory" className="form-control">
                    <option selected>Active</option>
                    <option value="1">Inactive</option>
                  </select>
                  <div className="input-group-append">
                    <button className="status-btn hover-btn" type="submit">
                      Search Area
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="card card-static-2 mt-30 mb-30">
                <div className="card-title-2 pb-3">
                  <h4>All Areas</h4>
                </div>
                <div className="card-body-table">
                  <div className="table-responsive">
                    <table className="table ucp-table table-hover">
                      <thead>
                        <tr>
                          <th style={{ width: "60px" }}>
                            <input type="checkbox" className="check-all" />
                          </th>
                          <th style={{ width: "60px" }}>ID</th>
                          <th style={{ width: "100px" }}>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Available Quantity</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="checkbox"
                                className="check-item"
                                name="ids[]"
                                value={10 - index}
                              />
                            </td>
                            <td>{index}</td>
                            <td>
                              <div className="cate-img-5">
                                <img
                                  src={`images/product/img-${10 - index}.jpg`}
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.category.name}</td>
                            <td>{item.stock.available}</td>
                            <td>
                              <span className="badge-item badge-status">{item.stock.available > 0 ? "Available" : "Empty"}</span>
                            </td>
                            <td className="action-btns">
                              <a
                                href="product_view.html"
                                className="view-shop-btn"
                                title="View"
                              >
                                <i className="fas fa-eye"></i>
                              </a>
                              <a
                                href="products.html#"
                                className="edit-btn"
                                title="Edit"
                              >
                                <i className="fas fa-edit"></i>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
            <div className="text-muted-1">
              © 2020 <b>Gambo Supermarket</b>. by{" "}
              <a href="https://themeforest.net/user/gambolthemes">Gambolthemes</a>
            </div>
            <div className="footer-links">
              <a href="http://gambolthemes.net/html-items/gambo_supermarket_demo/privacy_policy.html">
                Privacy Policy
              </a>
              <a href="http://gambolthemes.net/html-items/gambo_supermarket_demo/term_and_conditions.html">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </div>
    </div>
  );
};

export default ProductPage;
