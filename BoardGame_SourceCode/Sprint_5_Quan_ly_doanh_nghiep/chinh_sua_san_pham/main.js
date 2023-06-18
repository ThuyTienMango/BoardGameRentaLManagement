



function handleImageUpload(event) {
    var files = event.target.files;
    var productImgContainer = document.querySelector(".product-img__box-container");
    var uploadMessage = document.getElementById("upload-message");
    
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var reader = new FileReader();
      reader.onload = function(e) {
        var imageSrc = e.target.result;
    
        // Kiểm tra xem ảnh đã tồn tại trong "product-img__box-container" hay chưa
        var existingItems = productImgContainer.querySelectorAll(".container-img__item");
        var imageExists = false;
        existingItems.forEach(function(item) {
          var img = item.querySelector("img");
          if (img && img.src === imageSrc) {
            imageExists = true;
            return;
          }
        });
    
        if (imageExists) {
          // Hiển thị thông báo ảnh đã được tải lên
          uploadMessage.innerText = "Ảnh này đã được tải lên.";
          return;
        }
    
        // Nếu ảnh chưa tồn tại, thêm vào "product-img__box-container"
        var container = document.createElement("div");
        container.className = "container-img__item";
        var img = document.createElement("img");
        img.src = imageSrc;
        img.alt = "";
        img.className = "container-img__item__fill";
    
        container.appendChild(img);
        productImgContainer.appendChild(container);
    
        // Xóa thông báo
        uploadMessage.innerText = "";
      };
      reader.readAsDataURL(file);
    }
  }
  
  var fileInput = document.getElementById("file-input");
  fileInput.addEventListener("change", handleImageUpload);


  // js chỉnh sửa thông tin sản phẩm 

  // chỉnh sửa tên sản phẩm 
  function enableEditProductName() {
    var productNameInput = document.getElementById("product-name");
    productNameInput.contentEditable = true;
    productNameInput.focus();
  }

  // chỉnh sửa mô tả sp 
  function enableEditProductDescription() {
    var productDescriptionInput = document.getElementById("product-description");
    productDescriptionInput.contentEditable = true;
    productDescriptionInput.focus();
  }
  // chỉnh sửa số lượng sp 
  function enableEditProductQuantity() {
    var productDescriptionInput = document.getElementById("product-quantity");
    productDescriptionInput.contentEditable = true;
    productDescriptionInput.focus();
  }
   // chỉnh sửa giá thuê
   function enableEditProductCost() {
    var productDescriptionInput = document.getElementById("product-cost");
    productDescriptionInput.contentEditable = true;
    productDescriptionInput.focus();
  }
  
  
  