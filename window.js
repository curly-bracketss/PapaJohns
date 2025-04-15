window.changeThis = async function (category, id) {
    localStorage.setItem('ctg', category)
    document.querySelector('.changeModal').display = 'flex'
    const updatedData = await changeItemById(category, id);
    const input = document.querySelectorAll('#inps input')
    console.log(updatedData)
    input[0].value = updatedData.title
    input[1].value = updatedData.composition
    input[2].value = updatedData.price
    input[3].value = updatedData.img
    input[4].value = updatedData.id
};

function getInps() {
    const input = document.querySelectorAll('#inps input')
    const newObj = {
        title: input[0].value,
        composition: input[1].value,
        price: input[2].value,
        img: input[3].value,
        id: input[4].value
    }
}
window.ChangeMeal=function(){
    getInps()
    changeThis(newObj)
    document.querySelector('.changeModal').display = 'none'
}
// function renderCards(data) {
//     const cards = document.getElementById('cards');
//     cards.innerHTML = '';
//     data.forEach(element => {
//         cards.innerHTML += `
//             <article>
//                 <img src="${element.img}" alt="${element.title}">
//                 <h3>${element.title}</h3>
//                 <p>${element.composition}</p>
//                 <div>
//                     <h4>Qiymət: $${element.price}</h4>
//                     <button onclick='BuyThis("${element.title}")' class="select-button">Bunu seç</button>
//                     <button onclick='DeleteThis(event, ${element.id})' class="select-button">Sil</button>
//                 </div>
//             </article>
//         `;
//     });
// }




