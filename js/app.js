const alert = displayStyle => {
    document.getElementById('alert').style.display = displayStyle;
}
const singleDisplay = displayStyle => {
    document.getElementById('display-single-phone').style.display = displayStyle;
}
const loadPhoneData = () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    singleDisplay('none');
    document.getElementById('display-all-phone').innerHTML = ``;
    // Load Phone Data 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {

            if (data.data.length == 0) {
                alert('block');
            } else {
                alert('none');
                getPhoneData(data.data);
            }
        });
    // Clear input search data 
    searchInput.value = '';
}

const getPhoneData = phones => {
    const displayAllPhone = document.getElementById('display-all-phone');
    for (const phone of phones) {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="card " style="width:300px">
                    <img class="card-img-top" src="${phone.image}" style="height:300px" alt="Card image">
                    <div class="card-body">
                        <h4 class="card-title">${phone.phone_name}</h4>
                        <p class="card-text">${phone.brand}</p>
                        <button onclick='loadSingleData("${phone.slug}")' type="button" class="btn btn-primary">Details</button>
                    </div >
                </div >
    `;
        displayAllPhone.appendChild(div);
    }
}

const loadSingleData = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getSingleData(data.data));
}

const getSingleData = phoneData => {
    console.log(phoneData);
    const displaySinglePhone = document.getElementById('display-single-phone');
    displaySinglePhone.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${phoneData.image}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${phoneData.name}</h5>
                        <p class="card-text">Release Date: ${phoneData.releaseDate}</p>
                        <button onclick='' type="button" class="btn btn-primary">Others</button>
                    </div>
                </div>
            </div>
    `;
    displaySinglePhone.appendChild(div);
    singleDisplay('block');
}