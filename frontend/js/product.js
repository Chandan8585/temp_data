





const renderTable = async ()=>{
    let product;
    try {
       const res = await fetch('http://localhost:5001/product', {
           method: 'GET'
        });
         product =await res.json();
        console.log(product);
    } catch (error) {
       console.log(error)
    }
    const tableContainer = document.querySelector(".table-responsive");

    if (tableContainer) {
        tableContainer.innerHTML = `
 
            <table id="productTable" class="table">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  ${product?.map((item)=>
                    `<tr>
                    <td><input type="checkbox" class="check-item" name="ids[]" value="${item._id}"></td>
                    <td>${item._id}</td>
                    <td>
                        <div class="cate-img-5">
                            <img src='${item?.image}' alt="Product Image">
                        </div>
                    </td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>8 hours ago</td>
                    <td><span class="badge-item badge-status">Active</span></td>
                    <td class="action-btns">
                        <a href="product_view.html" class="view-shop-btn" title="View"><i class="fas fa-eye"></i></a>
                        <a href="products.html#" class="edit-btn" title="Edit"><i class="fas fa-edit"></i></a>
                    </td>
                </tr>`
                  ).join()}
                 
                </tbody>
            </table>
        `;
    } else {
        console.error("Table container not found!");
    }
      }
 







document.addEventListener("DOMContentLoaded", renderTable())
 
 

