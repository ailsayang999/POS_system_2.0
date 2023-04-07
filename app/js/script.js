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

//function: add to cart 
//function: 加入購物車
function addToCart(event) {
  // 找到觸發event的node元素，並得到其產品id
  const id = event.target.id;
  // 在productData的資料裡，找到點擊的產品(addedProduct)的資訊： name, price
  const addedProduct = productData.find((item) => item.id === id);
  // 如果按馬卡龍的話 addedProduct 會等於：{"id": "product-1","imgUrl": "https://images.unsplash.com/photo-1558024920-b41e1887dc32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",name": "馬卡龍","price": 90}
  const addedProductName = addedProduct.name;
  const addedProductPrice = addedProduct.price;

  // 加入購物車變數cartItems 分：有按過、沒按過
  const targetCartItem = cartItem.find((item) => item.id === id);
  if (targetCartItem) {
    //有按過的話(targetCartItem為true) quantity+=1
    targetCartItem.quantity += 1;
  } else {
    // 沒按過 cartItem加入新資料  在新版本後，如果key和value的命名一樣的話，可以簡寫
    cartItem.push({
      id: id,
      name: addedProductName,
      price: addedProductPrice,
      quantity: 1,
    });
  }

  // 畫面顯示購物車清單 map會建立一個新的陣列，.join('')可以把陣列變成字串
  cart.innerHTML = cartItem
    .map(
      (item) =>
        `<span class="item">${item.name} X ${item.quantity} 小計：${
          item.price * item.quantity
        } 元</span>`
    )
    .join("");

  // console.log(cartItem);

  // 計算總金額
  let price = 0;
  cartItem.forEach((item) => (price += item.price * item.quantity));
  calculateTotal(price);
}

// Calculate total price: 計算總金額   
function calculateTotal(amount) {
  total = amount;
  totalAmount.textContent = total;
}

//function: send order 送出訂單
function submit(event) {
  let target = event.target;
  if (target.matches(".submit-btn")) {
    const alertItem = cartItem
      .map(
        (item) =>
          `${item.name} X ${item.quantity} 小計：${item.price * item.quantity}`
      )
      .join("\n");
    alert(`感謝您的消費~\n${alertItem}\n共${totalAmount.textContent}元`);
    let time = new Date();
    localStorage.setItem(`${time.toLocaleString()}`, JSON.stringify(cartItem));
    reset();
  } else if (target.matches(".do-btn")) {
    console.log("晚點再用");
  }
}

// reset data in cart 
function reset() {
  totalAmount.textContent = 0;
  cart.innerHTML = "";
  cartItem = [];
}