import { GetData, printData, deleteItemById, changeItemById, createItem} from "./service.js";
const carousel = ['https://papa-johns-aysumeherremovas-projects.vercel.app/img/slider5.png',
    'https://papa-johns-aysumeherremovas-projects.vercel.app/img/slider2.png',
    'https://papa-johns-aysumeherremovas-projects.vercel.app/img/slider7.png',
    'https://papa-johns-aysumeherremovas-projects.vercel.app/img/slider1.png',
    'https://papa-johns-aysumeherremovas-projects.vercel.app/img/slider4.png',
    'https://papa-johns-aysumeherremovas-projects.vercel.app/img/slider8.jpg',
    'https://papa-johns-aysumeherremovas-projects.vercel.app/img/slider3.png']
const ul = document.querySelector('#ul');
const cards = document.querySelector('.cards');
let data = [];
let filteredData = []
const notyf = new Notyf();
async function loadData() {
    data = await GetData();
    printCategory();
}
loadData();

function printCategory() {
    data.forEach(element => {
        if (element.category == 'kampaniyalar') {
            ul.innerHTML += `<li ><a onclick="onHomeClick()" href="./index.html" >${element.slug}</a></li>`;

        }
        else {
            ul.innerHTML += `<li ><a onclick='printCards("${element.category}")'>${element.slug}</a></li>`;
        }
    });
}
window.printCards = async function (category) {
    if (category != 'kampaniyalar') {
        // localStorage.clear()
        document.querySelector('section').innerHTML = ''
    } else {
        return
    }
    // event.preventDefault()
    filteredData = await printData(category);
    cards.innerHTML = '';
    filteredData.forEach(item => {
        cards.innerHTML += `
            <article>
                <img src="${item.img}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.composition}</p>
                <div>
                <h4>Qiymət: $${item.price}</h4>
                <button onclick="buyThis('${item.title}','${category}')" class="select-button">Bunu seç</button>
                </div>
                <div class='buttons'>
                    <button onclick="deleteThis('${category}','${item.id}')" class="select-button">Sil</button>
                    <button onclick="changeThis('${category}','${item.id}')" class="select-button">Duzelt</button>
                </div>
            </article>
        `;
    });

};
// printCards('pizza')

window.onHomeClick = function () {
    localStorage.clear()
}

window.deleteThis = async function (category, id) {
    localStorage.setItem('ctg', category);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then(async (result) => { // <--- make this async
        if (result.isConfirmed) {

            const updatedData = await deleteItemById(category, id);

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            const updatedData = data;
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
};

function renderCat() {
    const category = localStorage.getItem('ctg') || 'kampaniyalar'
    printCards(category)
}
renderCat()


const inps = document.querySelectorAll('#inps input')
let globId


window.changeThis = function (category, id) {
    showModal()
    localStorage.setItem('ctg', category)

    const edited = filteredData.find(item => item.id == id)
    console.log(edited);

    globId = id
    inps[0].value = edited.title
    inps[1].value = edited.img
    inps[2].value = edited.category
    inps[3].value = edited.composition
    inps[4].value = edited.price
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function getInpValues() {
    const valuesObj = {
        title: inps[0].value,
        img: inps[1].value,
        category: inps[2].value,
        composition: inps[3].value,
        price: inps[4].value
    }
    return valuesObj
}
window.createPost = function () {
    const updatedObj = getInpValues()
    console.log(updatedObj)
    localStorage.setItem('ctg', inps[2].value)
    createItem(inps[2].value, updatedObj)
    document.querySelector('.changeModal').style.display = 'none'
    notyf.success('Your changes have been successfully saved!');
}
window.updatePost = function () {
    const updatedObj = getInpValues()
    const category = localStorage.getItem('ctg')
    changeItemById(category, globId, updatedObj)
    document.querySelector('.changeModal').style.display = 'none'
    notyf.success('Your changes have been successfully saved!');
}

function showModal() {
    document.querySelector('.changeModal').style.display = 'block'

}
function showBasket() {
    document.querySelector('.sebet').style.display = 'block'

}

for (let item of carousel) {
    document.querySelector('.swiper-wrapper').innerHTML += ` <div class="swiper-slide"><img src='${item}'></div>`
}
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
setTimeout(() => {
    swiper.slideNext();
}, 10000);

const languages = [
    {
        short: 'Ru',
        name: "Русский",
        src: './flag_ru.png'
    },
    {
        short: 'En',
        name: "English",
        src: './flag_en.png'
    },
    {
        short: 'Az',
        name: "Azərbaycanca",
        src: './flag_az.png'
    }
];

languages.forEach(item => {
    document.querySelector('.select').innerHTML +=
        `<div class='d-flex g-5 a-c' onclick="language('${item.short}')">
            <img src='${item.src}' width='20px'>
            <h4>${item.short}</h4>
        </div>`;
});

window.selLang = function () {
    document.querySelector('.select').classList.toggle('d-flex');
    document.querySelector('.select').classList.toggle('f-col');
    document.querySelector('.select').classList.toggle('d-none');
};
window.showbasket = function () {
    document.querySelector('.sebetde').classList.toggle('d-none')
    document.querySelector('.sebetde').classList.toggle('d-flex')
}
window.onload = function () {
    document.querySelector('.choosenLang').innerHTML = `
        <div class='d-flex g-5 a-c'>
            <img src='./flag_az.png' width='20px'>
            <h4>Azərbaycanca</h4>
        </div>`;
};

window.language = function (short) {
    const element = languages.find(item => item.short === short);
    if (element) {
        document.querySelector('.choosenLang').innerHTML = `
            <div class='d-flex g-5 a-c'>
                <img src='${element.src}' width='20px'>
                <h4>${element.name}</h4>
            </div>`;
    }
};
document.addEventListener('click', function (event) {
    const select = document.querySelector('.select');
    const choosenLang = document.querySelector('.choosenLang');

    if (!select.contains(event.target) && !choosenLang.contains(event.target)) {
        select.classList.remove('d-flex', 'f-col');
        select.classList.add('d-none');
    }
});
window.buyThis = async function (title,category) {
    const newdata=await  printData(category)
    const item=newdata.filter(item=> item.title==title)
    document.querySelector('.sebet').innerHTML +=`<tr></tr>`
    document.querySelector('.sebet').innerHTML +=`
    <td>img src='${item.url}' alt='meal'></td>
    <td><h4>${item.title}</h4></td>
    <td><h4>${item.composition}</h4></td>
    <td><h5>${item.price}</h5></td>
    <td><input id='countof' type='number' data-count='1'></td>
    <td><h3 id='total-price'></h3></td>
    
    `
    notyf.success('Added basket successfully!');
}