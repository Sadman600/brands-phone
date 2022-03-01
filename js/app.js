
const loadPhoneData = () => {
    document.getElementById('display-all-phone').innerHTML = ``;
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;

    // Load Phone Data 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getPhoneData(data.data));
    // Clear input search data 
    searchInput.value = '';
}

const getPhoneData = phones => {
    const displayAllPhone = document.getElementById('display-all-phone');
    for (const phone of phones) {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="card  " style="width:300px">
                    <img class="card-img-top" src="${phone.image}" alt="Card image">
                    <div class="card-body">
                        <h4 class="card-title">${phone.phone_name}</h4>
                        <p class="card-text">${phone.brand}</p>
                        <button type="button" class="btn btn-primary">Details</button>
                    </div>
                </div>
        `;
        displayAllPhone.appendChild(div);
    }
}