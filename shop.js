async function getcategories() {
    const resp = await fetch("http://localhost:3000/categories")
    const result = await resp.json();
    displaycategories(result);
}

getcategories();
let btx=document.querySelector(".redcircle2 p")
let y=(localStorage.getItem("mycounter"))
if (localStorage.getItem("mycounter") != null){
    btx.innerHTML=y

}

const myparent = document.querySelector(".catphotos")
let activeSlug = '';
function displaycategories(x) {
    x.forEach((ele) => {
        if (ele.isActive == 1) {
            activeSlug = ele.slug;
        }
        let isActive = `${ele.isActive == 0 ? '' : 'class="activeSlug" '}`
        let myImageId = Math.floor(Math.random() * 10000)
        myparent.innerHTML += ` 
            <div class="redbor" onclick="myClickFun('${ele.slug}','${myImageId}')">
                <div> <img   id='${myImageId}' ${isActive} src='${ele.image}' alt=""></div>
                <div>
                    <p>${ele.name}</p>
                </div>
            </div>
        `
    })

}
const bigparent = document.querySelector(".drow");
async function getCards() { 
    // if (localStorage.getItem("cards") == null) {
    let cards = await fetch("http://localhost:3000/cards")
    const mycards = await cards.json();
    // }
    localStorage.setItem("cards", JSON.stringify(mycards))
    bigparent.innerHTML = '';
    mycards.forEach((crd) => {
        if (activeSlug == crd.slug) {
            bigparent.innerHTML += `    
            <div class="card">
                <img src='${crd.img}' alt="">
                <div class="sppp">
                    <div>
                        <p>${crd.price}</p>
                    </div>
                    <div class="starr">
                        <div class="thisi"><i class="fa-regular fa-star"></i></div>
                        <p> ${crd.rate}</p>
                    </div>
                </div>
                <div class="line"></div>

                <p>${crd.title}</p>
                <div class="check">
                    <i class="fa-regular fa-circle-check"></i>
                    <P> ${crd.pieces} pieces</P>
                </div>
                <div class="check">
                    <i class="fa-regular fa-circle-check"></i>
                    <p>${crd.isSpicy == 0 ? 'Regular Sauce' : 'SpicySauce'} </p>
                </div>
                <button  onclick=addtocart(${crd.id}) class="why">ADD TO CART</button>
            </div>

        `
        }
    }
    )

}
getCards();
let countdiv=document.querySelector(".redcircle2 p")

let counter=0;
let CartItems = [];
function addtocart(id) {
    let myAllCards = JSON.parse(localStorage.getItem("cards"))
   
    let clickedItem = myAllCards[id - 1];

    if (CartItems.filter((ele) => ele.id == id).length == 0) {
        CartItems.push(clickedItem)
        counter++
        countdiv.innerHTML=counter
        if( localStorage.getItem("mycounter") == null){
            localStorage.setItem("mycounter",counter)   
        }else{
            let savedCnt = localStorage.getItem("mycounter")
            savedCnt++;
            localStorage.setItem("mycounter",savedCnt) 
        }

        localStorage.setItem("CartItems", JSON.stringify(CartItems))
    }
     
}
function myClickFun(slug, myImageId) {
    // alert("Mu active slug is "+item)
    activeSlug = slug;
    getCards();

    document.querySelectorAll(".redbor img").forEach((ele) => {
        ele.removeAttribute("class")
    })
    document.getElementById(myImageId).classList.add("activeSlug")
}












