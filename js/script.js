//slides
function autoSlideShow() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slides input[type="radio"]');

    setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].checked = true;
    }, 2000); // Muda o slide a cada 5 segundos
}

// Inicia o slideshow automático quando a página é carregada
window.addEventListener('load', autoSlideShow);


//fim slides

//menu hamburguer
// Função para alternar o menu
function toggleMenu() {
    var navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Anexa a função de alternância ao ícone do menu
document.querySelector('.menu').addEventListener('click', function(event) {
    toggleMenu();
    event.stopPropagation(); // Impede que o evento de clique feche o menu imediatamente
});

// Fecha o menu ao clicar fora
window.addEventListener('click', function(event) {
    var navMenu = document.querySelector('.nav-menu');
    if (!navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

function closeHamburgerMenu() {
    var navMenu = document.querySelector('.nav-menu');
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}
//fim menu hamburguer

//menu hamburguer 2
document.getElementById('linkProdutos').addEventListener('click', function(e) {
    e.preventDefault(); // Impede que o link te leve para outra página
    var menu = document.getElementById('menuHamburguer');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});


//menu dropdwon
//principal
document.getElementById('linkProdutos2').addEventListener('click', function(e) {
    e.preventDefault(); // Impede que o link te leve para outra página
    var menu = document.getElementById('menu-dropdown');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

//secundarios
document.getElementById('down-1').addEventListener('click', function(e) {
    e.preventDefault(); // Impede que o link te leve para outra página
    var menu = document.getElementById('links-1');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

document.getElementById('down-2').addEventListener('click', function(e) {
    e.preventDefault(); // Impede que o link te leve para outra página
    var menu = document.getElementById('links-2');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

document.getElementById('down-3').addEventListener('click', function(e) {
    e.preventDefault(); // Impede que o link te leve para outra página
    var menu = document.getElementById('links-3');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});




//fim menu dropdwon


//link selecionado
document.addEventListener('DOMContentLoaded', (event) => {
    const links = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname; // Pega o caminho da URL atual

    links.forEach(link => {
        // Cria um objeto URL com base no href do link para comparar os caminhos corretamente
        const linkPath = new URL(link.href).pathname;

        // Verifica se o caminho do link é igual ao caminho atual
        if (linkPath === currentPath) {
            // Adiciona a classe 'active-link' ao link correspondente
            link.classList.add('active-link');
        } else {
            // Remove a classe 'active-link' se não for o link correspondente
            link.classList.remove('active-link');
        }
    });
});


//fim link selecionado


//carrinho funcionalidade
let carticon2 = document.querySelector("#cart-icon2");
let carticon = document.querySelector("#cart-icon");
let closeCart = document.querySelector("#close-cart");

//abrir carrinho lateral
carticon2.onclick = () => {
    cart.classList.add("active");
    closeHamburgerMenu()
    updatetotal()
}

carticon.onclick = () => {
    cart.classList.add("active");
    updatetotal()
}

//fechar carrinho lateral
closeCart.onclick = () => {
    cart.classList.remove("active");
}

function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("€", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity)  ;
  
    }
    total = Math.round(total* 100)/ 100;
    document.getElementsByClassName("total-price")[0].innerText = total +  "€";
}


let cart = document.querySelector('.cart');

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    //add to cart 
    var addCart = document.getElementsByClassName('cart-icon')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)

    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// add to cart 
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var shopProducts = button.closest('.produto-layout');
    var title = shopProducts.getElementsByClassName("titulo-produto")[0].innerText; 
    var price = shopProducts.getElementsByClassName('preco')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('imagem-produto')[0].src; 
    addProductToCart(title, price, productImg);
    updatetotal();
   

}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-product-title');

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Já tens este produto no carrinho');
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="${title}" class="cart-img"> <!-- Use o title no alt -->
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bi bi-trash cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
    updatetotal();
   
    
}

//snipcart
window.SnipcartSettings = {
    publicApiKey: "Njc3YjllMGYtNjFmYS00ZjNlLTlkYjktNzA3YTZjZmI4YjVlNjM4NDI5Mjk3OTg1NjQwMTE3",
    loadStrategy: "on-user-interaction",
    version: "3.7.1"
  };











