// variable declaration 宣告變數
const menu = document.querySelector("#menu");
const cart = document.querySelector("#cart");
const totalAmount = document.querySelector("#total-amount");
const submitBtn = document.querySelector("#submit-btn");
const foot = document.querySelector("#foot");

let total = 0;
let productData = [];
let cartItem = [];

// GET API: display menu data
axios
  .get("https://ac-w3-dom-pos.firebaseio.com/products.json")
  .then((res) => {
    productData = res.data;
    displayProducts(productData);
  })
  .catch((err) => console.log(err));

//function: display products information in menu 將產品資料加入菜單區塊
function displayProducts(products) {
  menu.innerHTML = products
    .map(
      (product) => `
    <div class="col product">
    <img class='product-img'src="${product.imgUrl}" alt="">
    <div class="product-body">
    <span>產品名稱：${product.name}</span>
    <span>產品內容</span>
    <span>產品金額：${product.price} 元</span>
    <button type="button" class="add-to-card-btn" id=${product.id}> 加入購物車</button>
    </div>
    </div>
  `
    )
    .join("");
}
 