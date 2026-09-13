const products=[
{id:1,name:'Strawberry Dream',cat:'fruit',price:3500,emoji:'🍓',desc:'Creamy strawberry with real fruit.'},
{id:2,name:'Classic Vanilla',cat:'classic',price:3000,emoji:'🍦',desc:'Smooth, rich and timeless.'},
{id:3,name:'Choco Cookie',cat:'special',price:4000,emoji:'🍪',desc:'Chocolate ice cream with cookie crunch.'},
{id:4,name:'Mango Bliss',cat:'fruit',price:3500,emoji:'🥭',desc:'Sunny mango flavor in every bite.'},
{id:5,name:'Mint Choco',cat:'special',price:4000,emoji:'🍫',desc:'Cool mint and chocolate pieces.'},
{id:6,name:'Caramel Swirl',cat:'special',price:3800,emoji:'🍯',desc:'Buttery caramel ribbons throughout.'},
{id:7,name:'Berry Blast',cat:'fruit',price:4200,emoji:'🫐',desc:'A bright mix of berry flavors.'},
{id:8,name:'Chocolate Fudge',cat:'classic',price:3500,emoji:'🍫',desc:'Deep chocolate for true chocoholics.'}
];
let cart=JSON.parse(localStorage.getItem('frostyCart')||'[]');let filter='all';
const money=n=>'₦'+n.toLocaleString('en-NG');
function renderProducts(){const q=document.querySelector('#search').value.toLowerCase();const list=products.filter(p=>(filter==='all'||p.cat===filter)&&p.name.toLowerCase().includes(q));document.querySelector('#products').innerHTML=list.length?list.map(p=>`<article class="product"><div class="product-art">${p.emoji}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add" onclick="addToCart(${p.id})">Add +</button></div></article>`).join(''):'<p>No flavors found. Try another search.</p>';}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});save();openCart();}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);save();}
function save(){localStorage.setItem('frostyCart',JSON.stringify(cart));renderCart();}
function renderCart(){const box=document.querySelector('#cartItems');let count=cart.reduce((s,x)=>s+x.qty,0);document.querySelector('#cartCount').textContent=count;let total=0;if(!cart.length){box.innerHTML='<p class="empty">Your cart is empty 🍦</p>';}else{box.innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);total+=p.price*x.qty;return `<div class="cart-row"><div class="cart-emoji">${p.emoji}</div><div><strong>${p.name}</strong><small>${money(p.price)} each</small><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${x.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><b>${money(p.price*x.qty)}</b></div>`}).join('');}document.querySelector('#cartTotal').textContent=money(total);}
function openCart(){document.querySelector('#cart').classList.add('open');document.querySelector('#overlay').classList.add('show');}
function closeCart(){document.querySelector('#cart').classList.remove('open');document.querySelector('#overlay').classList.remove('show');}
document.querySelector('#cartBtn').onclick=openCart;document.querySelector('#closeCart').onclick=closeCart;document.querySelector('#overlay').onclick=closeCart;
document.querySelector('#search').addEventListener('input',renderProducts);
document.querySelector('#filters').addEventListener('click',e=>{if(!e.target.dataset.filter)return;filter=e.target.dataset.filter;document.querySelectorAll('#filters button').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');renderProducts();});
document.querySelector('#themeBtn').onclick=()=>{document.body.classList.toggle('dark');document.querySelector('#themeBtn').textContent=document.body.classList.contains('dark')?'☀':'☾';localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light');};
if(localStorage.getItem('theme')==='dark'){document.body.classList.add('dark');document.querySelector('#themeBtn').textContent='☀';}
document.querySelector('#menuBtn').onclick=()=>document.querySelector('#nav').classList.toggle('show');document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>document.querySelector('#nav').classList.remove('show'));
document.querySelector('#checkout').onclick=()=>{if(!cart.length)return alert('Your cart is empty. Add a flavor first!');alert('Thanks for your order! 🍦 This demo checkout is ready to connect to a payment system.');};
document.querySelector('#newsletter').onsubmit=e=>{e.preventDefault();alert('You are on the scoop list! 🍨');e.target.reset();};
renderProducts();renderCart();