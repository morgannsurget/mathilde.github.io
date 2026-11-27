const products=[
{id:1,name:"Pelle à planter renforcée",category:"Outils",price:38,icon:"🧹"},
{id:2,name:"Sécateur professionnel",category:"Outils",price:54,icon:"✂️"},
{id:3,name:"Dévidoir mural 25 m",category:"Arrosage",price:89,icon:"🪢"},
{id:4,name:"Gants de manutention",category:"Protection",price:16,icon:"🧤"},
{id:5,name:"Pulvérisateur 5 litres",category:"Arrosage",price:42,icon:"🫗"},
{id:6,name:"Râteau polycarbonate",category:"Outils",price:29,icon:"🪶"},
{id:7,name:"Lunettes de protection",category:"Protection",price:12,icon:"🥽"},
{id:8,name:"Arrosoir de jardin 10 L",category:"Arrosage",price:34,icon:"🚿"}
];
let cart=[];
const grid=document.querySelector('#productGrid');
const cartDrawer=document.querySelector('#cartDrawer');
const overlay=document.querySelector('#overlay');

function euro(value){return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(value)}
function renderProducts(category='Tous'){
  const shown=category==='Tous'?products:products.filter(p=>p.category===category);
  grid.innerHTML=shown.map(p=>`<article class="product"><div class="product-image" aria-hidden="true">${p.icon}</div><div class="product-body"><span class="product-category">${p.category}</span><h3>${p.name}</h3><div class="product-footer"><strong class="price">${euro(p.price)}</strong><button class="add" type="button" data-id="${p.id}" aria-label="Ajouter ${p.name}">+</button></div></div></article>`).join('');
}
function renderCart(){
  document.querySelector('#cartCount').textContent=cart.reduce((n,p)=>n+p.quantity,0);
  document.querySelector('#cartItems').innerHTML=cart.length?cart.map(p=>`<div class="cart-item"><div><strong>${p.name}</strong><br><small>${p.quantity} × ${euro(p.price)}</small></div><button type="button" data-remove="${p.id}" aria-label="Retirer ${p.name}">−</button></div>`).join(''):'<p>Votre panier est vide.</p>';
  document.querySelector('#cartTotal').textContent=euro(cart.reduce((n,p)=>n+p.price*p.quantity,0));
}
function toggleCart(open){cartDrawer.classList.toggle('open',open);overlay.classList.toggle('open',open);cartDrawer.setAttribute('aria-hidden',String(!open));}

document.querySelector('#filters').addEventListener('click',e=>{if(!e.target.matches('button'))return;document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');renderProducts(e.target.dataset.category)});
grid.addEventListener('click',e=>{const button=e.target.closest('[data-id]');if(!button)return;const product=products.find(p=>p.id===Number(button.dataset.id));const existing=cart.find(p=>p.id===product.id);existing?existing.quantity++:cart.push({...product,quantity:1});renderCart();toggleCart(true)});
document.querySelector('#cartItems').addEventListener('click',e=>{const button=e.target.closest('[data-remove]');if(!button)return;const id=Number(button.dataset.remove);cart=cart.filter(p=>p.id!==id);renderCart()});
document.querySelector('#cartButton').addEventListener('click',()=>toggleCart(true));document.querySelector('#closeCart').addEventListener('click',()=>toggleCart(false));overlay.addEventListener('click',()=>toggleCart(false));
document.querySelector('#checkoutButton').addEventListener('click',()=>{if(!cart.length){alert('Votre panier est vide.');return}alert('Votre demande de devis est prête. Ajoutez ensuite votre adresse professionnelle pour finaliser le contact.')});
renderProducts();renderCart();
