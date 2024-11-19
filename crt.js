let myparent = document.querySelector(".display")
let constant = 0;
let mysum = document.querySelector(".sum")
let cartt=document.querySelector(".redcircle2 p")
let crds;

if (localStorage.getItem("CartItems") != null) {
    crds = JSON.parse(localStorage.getItem("CartItems"))


    if( localStorage.getItem("mycounter") != null){
        cartt.innerHTML=localStorage.getItem("mycounter")
    }

    crds.forEach(element => {
        let qtyStorage = localStorage.getItem(`increment${element.id}`);
        myparent.innerHTML += ` 
        <div class="nono">
                <div class="mimi">
                    <div>
                        <img src='${element.img}' alt="">
                        <p>${element.title}</p>
                        <P>${element.price} EG</P>
                    </div>
                    <div class="fourpieces">
                        <P>${element.pieces} PIECES ${element.isSpicy == 1 ? 'spicy' : 'regular'} SAUCE</P>
                        <div class="flexx">
                            <div class="box">
                                <p  onclick=decr(${element.price},${element.id})>-</p>
                            </div>
                            <div>
                                <p class='increment${element.id}'>
                                ${qtyStorage != null ? qtyStorage : element.quantity}
                                </p>
                            </div>
                            <div class="box">
                                <p onclick=increment(${element.price},${element.id})> +</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
                `
        constant += element.price
    });
    mysum.innerHTML = `${constant} EG`

}
function increment(price, id) {
    //get qty from array by filter
    let myActiveCard = crds.filter(f => f.id == id)[0]
    let qty = myActiveCard.quantity;
    //incremenet saved quatitiy
    qty++;
    //update qty in the main object 
    myActiveCard.quantity = qty;
    if(qty >1){
        constant = constant - price;
    }
    constant += price * qty;
    document.querySelector(`.increment${id}`).innerHTML = `${qty}`
    localStorage.setItem(`increment${id}`,qty)
    mysum.innerHTML = `${constant} EG`
    

    if( localStorage.getItem("mycounter") == null){
        localStorage.setItem("mycounter",qty)   
        cartt.innerHTML=qty;
    }else{
        let savedCnt = localStorage.getItem("mycounter")
        savedCnt++;
        localStorage.setItem("mycounter",savedCnt) 
        cartt.innerHTML=savedCnt;
    }

}
function decr(price, id) {
   
    //get qty from array by filter
    let myActiveCard = crds.filter(f => f.id == id)[0]
    let qty = myActiveCard.quantity;
  
    if(constant == 0 || qty ==0 )
        return;
    
    //incremenet saved quatitiy
    qty--;
    //update qty in the main object 
    myActiveCard.quantity = qty;
    constant = constant - price;
    // constant += price * qty;
    if (qty == 0) {
        document.querySelector(`.increment${id}`).innerHTML = `${qty}`
        localStorage.setItem(`increment${id}`,qty)
        mysum.innerHTML = `${constant} EG`
        // constant = 0
    } else if (qty > 0) {
        document.querySelector(`.increment${id}`).innerHTML = `${qty}`
        localStorage.setItem(`increment${id}`,qty)
        mysum.innerHTML = `${constant} EG`
        
        if( localStorage.getItem("mycounter") == null){
            localStorage.setItem("mycounter",qty)   
            cartt.innerHTML=qty;
        }else{
            let savedCnt = localStorage.getItem("mycounter")
            savedCnt--
            localStorage.setItem("mycounter",savedCnt) 
            cartt.innerHTML=savedCnt;
        }


    } 
    if (constant <= 0){
        document.querySelector(`.increment${id}`).innerHTML = `0`
        mysum.innerHTML = `0 EG`  
        constant= 0;

    }
}
 


