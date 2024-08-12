//enviar dados do carrinho para o servidor
function checkout() {
    // Coletar os dados do carrinho aqui
    let cartItems = document.getElementsByClassName('cart-content')[0].getElementsByClassName('cart-box');
    let items = [];
    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        let title = item.getElementsByClassName('cart-product-title')[0].innerText;
        let price = item.getElementsByClassName('cart-price')[0].innerText;
        let quantity = item.getElementsByClassName('cart-quantity')[0].value;
        items.push({
            title: title,
            price: price,
            quantity: quantity
        });
    }

    // Enviar os dados do carrinho para o servidor
    fetch('/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: items }) // Os dados do carrinho são enviados como JSON
    }).then(response => response.json())
      .then(data => {
          // Handle response data
          console.log(data);
      })
      .catch(error => console.error('Error:', error));
}
