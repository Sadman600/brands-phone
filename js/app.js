const alert = displayStyle => {
    document.getElementById('alert').style.display = displayStyle;
}
const spinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const singleDisplay = displayStyle => {
    document.getElementById('display-single-phone').style.display = displayStyle;
}
// Load Search Phone Data
const loadPhoneData = () => {
    alert('none');
    document.getElementById('display-all-phone').innerHTML = ``;
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.toLowerCase();
    singleDisplay('none');
    spinner('block');

    // Load Phone Data 
    if (searchValue === 'samsung' || searchValue === 'oppo' || searchValue === 'iphone' || searchValue === 'vivo' || searchValue === 'apple' || searchValue === 'xiaomi' || searchValue === 'realme' || searchValue === 'nokia' || searchValue === 'oneplus' || searchValue === 'symphony') {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {

                if (data.data.length == 0) {
                    alert('block');
                    spinner('none');
                } else {
                    alert('none');
                    getPhoneData(data.data.slice(0, 20));
                }
            });

    } else {
        spinner('none');
        alert('block');

    }

    // Clear input search data 
    searchInput.value = '';
}
// Display Search Phone Data
const getPhoneData = phones => {
    const displayAllPhone = document.getElementById('display-all-phone');

    for (const phone of phones) {

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="card " style="width:300px">
                    <img class="card-img-top" src="${phone.image}" style="height:300px" alt="Card image">
                    <div class="card-body">
                        <h4 class="card-title">${phone.phone_name}</h4>
                        <p class="card-text">${phone.brand}</p>
                        <a href="#display-single-phone" onclick='loadSingleData("${phone.slug}")' class="btn btn-primary">Details</a>
                    </div >
                </div >
    `;
        displayAllPhone.appendChild(div);
    }
    spinner('none');
}
// Load Single Phone Data 
const loadSingleData = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getSingleData(data.data));
}
// Display Single Phone Data
const getSingleData = phoneData => {

    const sensor = phoneData.mainFeatures.sensors;
    const other = phoneData.others;
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
                        <p class="card-text">Release Date: ${phoneData.releaseDate ? phoneData.releaseDate : ' No release date '}</p>
                        <div id="demo" class="">
                            <p><strong>Chip Set:</strong> ${phoneData.mainFeatures.chipSet}</p>
                            <p><strong>Display Size:</strong> ${phoneData.mainFeatures.displaySize}</p>
                            <p><strong>Memory:</strong> ${phoneData.mainFeatures.memory}</p>
                            <p><strong>Storage:</strong> ${phoneData.mainFeatures.storage}</p>
                            <p><strong>Sensors:</strong>
                                <ul>
                                    <li>${sensor[0] ? sensor[0] : 'No available'}</li>
                                    <li>${sensor[1] ? sensor[1] : 'No available'}</li>
                                    <li>${sensor[2] ? sensor[2] : 'No available'}</li>
                                    <li>${sensor[3] ? sensor[3] : 'No available'}</li>
                                    <li>${sensor[4] ? sensor[4] : 'No available'}</li>
                                    <li>${sensor[5] ? sensor[5] : 'No available'}</li>
                                    <li>${sensor[6] ? sensor[6] : 'No available'}</li>
                                </ul>
                            </p>
                            <p><strong>Others:</strong> 
                                <ul>
                                    <li><strong>WLAN:</strong> ${other?.WLAN ? other?.WLAN : 'No available'}</li>
                                    <li><strong>Bluetooth:</strong> ${other?.Bluetooth ? other?.Bluetooth : 'No available'}</li>
                                    <li><strong>GPS:</strong> ${other?.GPS ? other?.GPS : 'No available'}</li>
                                    <li><strong>USB:</strong> ${other?.USB ? other?.USB : 'No available'}</li>
                                    <li><strong>Radio:</strong> ${other?.Radio ? other?.Radio : 'No available'}</li>
                                    <li><strong>NFC:</strong> ${other?.NFC ? other?.NFC : 'No available'}</li>
                                    
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    `;
    displaySinglePhone.appendChild(div);
    singleDisplay('block');
}