



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



  // Hàm kiểm tra và ngăn người dùng gửi form nếu trường nhập liệu không phải là số
  function validateForm() {
    const priceInput = document.getElementById('boardgame-price');
    const agesInput = document.getElementById('boardgame-ages');
    const playerMinInput = document.getElementById('boardgame-playerMin');
    // Thêm các trường khác tương tự ở đây

    if (isNaN(priceInput.value)) {
      alert('Vui lòng chỉ nhập số vào trường Giá');
      return false;
    }

    if (isNaN(agesInput.value)) {
      alert('Vui lòng chỉ nhập số vào trường Độ tuổi');
      return false;
    }

    if (isNaN(playerMinInput.value)) {
      alert('Vui lòng chỉ nhập số vào trường Số người chơi tối thiểu');
      return false;
    }
    // Thêm các điều kiện kiểm tra cho các trường khác ở đây

    // Nếu các trường nhập liệu đều là số, cho phép gửi form
    return true;
  }

  // Lắng nghe sự kiện submit của form và gọi hàm kiểm tra trước khi submit
  const form = document.querySelector('form');
  form.addEventListener('submit', validateForm);



//   //js chỉnh sửa thông tin sản phẩm 

//   // chỉnh sửa tên sản phẩm 
//   function enableEditProductName() {
//     var productNameInput = document.getElementById("product-name");
//     productNameInput.contentEditable = true;
//     productNameInput.focus();
//   }

//   // chỉnh sửa mô tả sp 
//   function enableEditProductDescription() {
//     var productDescriptionInput = document.getElementById("product-description");
//     productDescriptionInput.contentEditable = true;
//     productDescriptionInput.focus();
//   }
//   // chỉnh sửa số lượng sp 
//   function enableEditProductQuantity() {
//     var productDescriptionInput = document.getElementById("product-quantity");
//     productDescriptionInput.contentEditable = true;
//     productDescriptionInput.focus();
//   }
//    // chỉnh sửa giá thuê
//    function enableEditProductCost() {
//     var productDescriptionInput = document.getElementById("product-cost");
//     productDescriptionInput.contentEditable = true;
//     productDescriptionInput.focus();
//   }
//  // chỉnh sửa tuổi
//    function enableEditAges() {
//     var productDescriptionInput = document.getElementById("ages");
//     productDescriptionInput.contentEditable = true;
//     productDescriptionInput.focus();
//   }
//   // chỉnh sửa người chơi tối đa
//   function enableEditPlayerMax() {
//     var productDescriptionInput = document.getElementById("playerMax");
//     productDescriptionInput.contentEditable = true;
//     productDescriptionInput.focus();
//   }
//    // chỉnh sửa người chơi tối thiểu
//    function enableEditPlayerMin() {
//     var productDescriptionInput = document.getElementById("playerMin");
//     productDescriptionInput.contentEditable = true;
//     productDescriptionInput.focus();
//   }
//   // chỉnh sửa thời gian chơi
//   function enableEditLength() {
//     var productDescriptionInput = document.getElementById("length");
//     productDescriptionInput.contentEditable = true;
//     productDescriptionInput.focus();
//   }

// // Tạo thẻ input mới chứa nội dung cũ và cho phép sửa đổi
// function createInputField(elementId) {
//   var element = document.getElementById(elementId);
//   var content = element.innerHTML.trim();
//   element.innerHTML = '';
//   var input = document.createElement("input");
//   input.type = "text";
//   input.value = content;
//   element.appendChild(input);
//   input.focus();
// }

// // Lưu các thay đổi sau khi nhấn nút "Cập nhật"
// // main.js

// var saveButton = document.getElementById("save-button");
// saveButton.addEventListener("click", updateProduct);

// function updateProduct() {
//   var productId = "<%= boardgame._id %>";
//   var productNameInput = document.getElementById("product-name");
//   var productDescriptionInput = document.getElementById("product-description");
//   var productQuantityInput = document.getElementById("product-quantity");
//   var productCostInput = document.getElementById("product-cost");
//   var agesInput = document.getElementById("ages");
//   var playerMaxInput = document.getElementById("playerMax");
//   var playerMinInput = document.getElementById("playerMin");
//   var lengthInput = document.getElementById("length");

//   var updatedProduct = {
//     _id: productId,
//     name: productNameInput.value,
//     description: productDescriptionInput.innerHTML,
//     quantity: productQuantityInput.innerHTML,
//     price: productCostInput.innerHTML,
//     ages: agesInput.innerHTML,
//     playerMax: playerMaxInput.innerHTML,
//     playerMin: playerMinInput.innerHTML,
//     length: lengthInput.innerHTML
//   };

//   // Gửi yêu cầu cập nhật thông tin sản phẩm đến máy chủ
//   fetch("/admin/editboardgame", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(updatedProduct)
//   })
//   .then(response => response.json())
//   .then(data => {
//     // Kiểm tra kết quả trả về từ máy chủ
//     if (data.success) {
//       // Cập nhật thông tin sản phẩm thành công
//       alert("Cập nhật thông tin sản phẩm thành công!");
//       // Có thể thực hiện các hành động khác sau khi cập nhật thành công
//     } else {
//       // Cập nhật thông tin sản phẩm không thành công
//       alert("Cập nhật thông tin sản phẩm không thành công!");
//       // Có thể thực hiện các hành động khác khi cập nhật không thành công
//     }
//   })
//   .catch(error => {
//     console.error("Lỗi khi gửi yêu cầu cập nhật sản phẩm:", error);
//     // Xử lý lỗi khi gửi yêu cầu cập nhật
//   });
// }







//js chỉnh sửa thông tin sản phẩm

// Tạo thẻ input mới chứa nội dung cũ và cho phép sửa đổi
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

// Lưu các thay đổi sau khi nhấn nút "Cập nhật"
// main.js

var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", updateProduct);

function updateProduct() {
  var productId = document.getElementById("product-id").value;
  var productNameInput = document.getElementById("product-name");
  var productDescriptionInput = document.getElementById("product-description");
  var productQuantityInput = document.getElementById("product-quantity");
  var productCostInput = document.getElementById("product-cost");
  var agesInput = document.getElementById("ages");
  var playerMaxInput = document.getElementById("playerMax");
  var playerMinInput = document.getElementById("playerMin");
  var lengthInput = document.getElementById("length");

  var updatedProduct = {
    _id: productId,
    name: productNameInput.value,
    description: productDescriptionInput.innerHTML,
    quantity: productQuantityInput.innerHTML,
    price: productCostInput.innerHTML,
    ages: agesInput.innerHTML,
    playerMax: playerMaxInput.innerHTML,
    playerMin: playerMinInput.innerHTML,
    length: lengthInput.innerHTML
  };

  // Gửi yêu cầu cập nhật thông tin sản phẩm đến máy chủ
  fetch("/admin/editboardgame", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedProduct)
  })
    .then(response => response.json())
    .then(data => {
      // Kiểm tra kết quả trả về từ máy chủ
      if (data.message) {
        // Cập nhật thông tin sản phẩm thành công
        alert(data.message);
        // Có thể thực hiện các hành động khác sau khi cập nhật thành công
      } else {
        // Cập nhật thông tin sản phẩm không thành công
        alert("Cập nhật thông tin sản phẩm không thành công!");
        // Có thể thực hiện các hành động khác khi cập nhật không thành công
      }
    })
    .catch(error => {
      console.error("Lỗi khi gửi yêu cầu cập nhật sản phẩm:", error);
      // Xử lý lỗi khi gửi yêu cầu cập nhật
    });
}
