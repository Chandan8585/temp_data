import React, { useState } from 'react';

const Sidebar = () => {
  // States for collapsing sections
  const [collapsePosts, setCollapsePosts] = useState(false);
  const [collapseLocations, setCollapseLocations] = useState(false);
  const [collapseAreas, setCollapseAreas] = useState(false);
  const [collapseCategories, setCollapseCategories] = useState(false);
  const [collapseShops, setCollapseShops] = useState(false);
  const [collapseProducts, setCollapseProducts] = useState(true);
  const [collapseSettings, setCollapseSettings] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to toggle the sidebar visibility
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = (section) => {
    switch (section) {
      case 'posts':
        setCollapsePosts(!collapsePosts);
        break;
      case 'locations':
        setCollapseLocations(!collapseLocations);
        break;
      case 'areas':
        setCollapseAreas(!collapseAreas);
        break;
      case 'categories':
        setCollapseCategories(!collapseCategories);
        break;
      case 'shops':
        setCollapseShops(!collapseShops);
        break;
      case 'products':
        setCollapseProducts(!collapseProducts);
        break;
      case 'settings':
        setCollapseSettings(!collapseSettings);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Button to toggle the sidebar on mobile */}
      <button
        className="sidebar-mobile-toggle"
        onClick={toggleSidebar}
        style={{ display: 'block' }} // You can adjust this based on your screen size with media queries
      >
        <i className="fas fa-bars"></i>
      </button>

      <div
        id="layoutSidenav_nav"
        className={`sb-sidenav accordion sb-sidenav-dark ${isOpen ? 'open' : ''}`}
      >
        <nav className="sb-sidenav-menu">
          <div className="nav">
            <a className="nav-link" href="index.html">
              <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
              Dashboard
            </a>

            {/* Posts Section */}
            <a
              className="nav-link collapsed"
              href="#"
              onClick={() => toggleCollapse('posts')}
              data-bs-toggle="collapse"
              data-bs-target="#collapsePosts"
              aria-expanded={collapsePosts ? 'true' : 'false'}
              aria-controls="collapsePosts"
            >
              <div className="sb-nav-link-icon"><i className="fas fa-newspaper"></i></div>
              Posts
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </a>
            <div className={`collapse ${collapsePosts ? 'show' : ''}`} id="collapsePosts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link sub_nav_link" href="posts.html">All Posts</a>
                <a className="nav-link sub_nav_link" href="add_post.html">Add New</a>
                <a className="nav-link sub_nav_link" href="post_categories.html">Categories</a>
                <a className="nav-link sub_nav_link" href="post_tags.html">Tags</a>
              </nav>
            </div>

            {/* Locations Section */}
            <a
              className="nav-link collapsed"
              href="#"
              onClick={() => toggleCollapse('locations')}
              data-bs-toggle="collapse"
              data-bs-target="#collapseLocations"
              aria-expanded={collapseLocations ? 'true' : 'false'}
              aria-controls="collapseLocations"
            >
              <div className="sb-nav-link-icon"><i className="fas fa-map-marker-alt"></i></div>
              Locations
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </a>
            <div className={`collapse ${collapseLocations ? 'show' : ''}`} id="collapseLocations" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link sub_nav_link" href="locations.html">All Locations</a>
                <a className="nav-link sub_nav_link" href="add_location.html">Add Location</a>
              </nav>
            </div>

            {/* Areas Section */}
            <a
              className="nav-link collapsed"
              href="#"
              onClick={() => toggleCollapse('areas')}
              data-bs-toggle="collapse"
              data-bs-target="#collapseAreas"
              aria-expanded={collapseAreas ? 'true' : 'false'}
              aria-controls="collapseAreas"
            >
              <div className="sb-nav-link-icon"><i className="fas fa-map-marked-alt"></i></div>
              Areas
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </a>
            <div className={`collapse ${collapseAreas ? 'show' : ''}`} id="collapseAreas" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link sub_nav_link" href="areas.html">All Areas</a>
                <a className="nav-link sub_nav_link" href="add_area.html">Add Area</a>
              </nav>
            </div>

            {/* Categories Section */}
            <a
              className="nav-link collapsed"
              href="#"
              onClick={() => toggleCollapse('categories')}
              data-bs-toggle="collapse"
              data-bs-target="#collapseCategories"
              aria-expanded={collapseCategories ? 'true' : 'false'}
              aria-controls="collapseCategories"
            >
              <div className="sb-nav-link-icon"><i className="fas fa-list"></i></div>
              Categories
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </a>
            <div className={`collapse ${collapseCategories ? 'show' : ''}`} id="collapseCategories" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link sub_nav_link" href="category.html">All Categories</a>
                <a className="nav-link sub_nav_link" href="add_category.html">Add Category</a>
              </nav>
            </div>

            {/* Shops Section */}
            <a
              className="nav-link collapsed"
              href="#"
              onClick={() => toggleCollapse('shops')}
              data-bs-toggle="collapse"
              data-bs-target="#collapseShops"
              aria-expanded={collapseShops ? 'true' : 'false'}
              aria-controls="collapseShops"
            >
              <div className="sb-nav-link-icon"><i className="fas fa-store"></i></div>
              Shops
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </a>
            <div className={`collapse ${collapseShops ? 'show' : ''}`} id="collapseShops" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link sub_nav_link" href="shops.html">All Shops</a>
                <a className="nav-link sub_nav_link" href="add_shop.html">Add Shop</a>
              </nav>
            </div>

            {/* Products Section */}
            <a
              className="nav-link collapsed"
              href="#"
              onClick={() => toggleCollapse('products')}
              data-bs-toggle="collapse"
              data-bs-target="#collapseProducts"
              aria-expanded={collapseProducts ? 'true' : 'false'}
              aria-controls="collapseProducts"
            >
              <div className="sb-nav-link-icon"><i className="fas fa-box"></i></div>
              Products
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </a>
            <div className={`collapse ${collapseProducts ? 'show' : ''}`} id="collapseProducts" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link sub_nav_link" href="products.html">All Products</a>
                <a className="nav-link sub_nav_link" href="add_product.html">Add Product</a>
              </nav>
            </div>

            {/* Settings Section */}
            <a
              className="nav-link collapsed"
              href="#"
              onClick={() => toggleCollapse('settings')}
              data-bs-toggle="collapse"
              data-bs-target="#collapseSettings"
              aria-expanded={collapseSettings ? 'true' : 'false'}
              aria-controls="collapseSettings"
            >
              <div className="sb-nav-link-icon"><i className="fas fa-cog"></i></div>
              Settings
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </a>
            <div className={`collapse ${collapseSettings ? 'show' : ''}`} id="collapseSettings" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link sub_nav_link" href="general_setting.html">General Settings</a>
                <a className="nav-link sub_nav_link" href="payment_setting.html">Payment Settings</a>
                <a className="nav-link sub_nav_link" href="email_setting.html">Email Settings</a>
              </nav>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
