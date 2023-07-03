



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

  // // chỉnh sửa tên sản phẩm 
  // function enableEditProductName() {
  //   var productNameInput = document.getElementById("product-name");
  //   productNameInput.contentEditable = true;
  //   productNameInput.focus();
  // }

  // // chỉnh sửa mô tả sp 
  // function enableEditProductDescription() {
  //   var productDescriptionInput = document.getElementById("product-description");
  //   productDescriptionInput.contentEditable = true;
  //   productDescriptionInput.focus();
  // }
  // // chỉnh sửa số lượng sp 
  // function enableEditProductQuantity() {
  //   var productDescriptionInput = document.getElementById("product-quantity");
  //   productDescriptionInput.contentEditable = true;
  //   productDescriptionInput.focus();
  // }
  //  // chỉnh sửa giá thuê
  //  function enableEditProductCost() {
  //   var productDescriptionInput = document.getElementById("product-cost");
  //   productDescriptionInput.contentEditable = true;
  //   productDescriptionInput.focus();
  // }
  
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

// tạo thẻ input mới chứa nội dung cũ và cho phép sửa đổi
function createInputField(elementId) {
  var element = document.getElementById(elementId);
  var content = element.innerHTML.trim();
  element.innerHTML = '';
  var input = document.createElement("input");
  input.type = "text";
  input.value = content;
  element.appendChild(input);
  input.focus();
}

// chỉnh sửa số lượng sp 
function enableEditProductQuantity() {
  createInputField("product-quantity");
}

// chỉnh sửa giá thuê
function enableEditProductCost() {
  createInputField("product-cost");
}

// chỉnh sửa tuổi
function enableEditAges() {
  createInputField("ages");
}

// chỉnh sửa người chơi tối đa
function enableEditPlayerMax() {
  createInputField("playerMax");
}

// chỉnh sửa người chơi tối thiểu
function enableEditPlayerMin() {
  createInputField("playerMin");
}

// chỉnh sửa thời gian chơi
function enableEditLength() {
  createInputField("length");
}

// lưu các thay đổi sau khi nhấn nút "Cập nhật"
function saveChanges() {
  var productNameInput = document.getElementById("product-name");
  productNameInput.contentEditable = false;
  var productDescriptionInput = document.getElementById("product-description");
  productDescriptionInput.contentEditable = false;
  var productQuantityInput = document.getElementById("product-quantity");
  productQuantityInput.parentNode.innerHTML = productQuantityInput.value;
  var productCostInput = document.getElementById("product-cost");
  productCostInput.parentNode.innerHTML = productCostInput.value;
  var agesInput = document.getElementById("ages");
  agesInput.parentNode.innerHTML = agesInput.value;
  var playerMaxInput = document.getElementById("playerMax");
  playerMaxInput.parentNode.innerHTML = playerMaxInput.value;
  var playerMinInput = document.getElementById("playerMin");
  playerMinInput.parentNode.innerHTML = playerMinInput.value;
  var lengthInput = document.getElementById("length");
  lengthInput.parentNode.innerHTML = lengthInput.value;
}

// gắn sự kiện click cho nút "Cập nhật"
var saveButton = document.querySelector(".basic-infor__btn-save");
saveButton.addEventListener("click", saveChanges);
