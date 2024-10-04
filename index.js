const loadAllPhones = async (isAllPhones,searchText="")=>{
    console.log('Load after 3 second');
    document.getElementById('spinner').style.display = "none";

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : "iphone"}`);
    const data = await response.json();
    if(isAllPhones){
        displayAllPhones(data.data);
    }else{
        displayAllPhones(data.data.slice(0,6));
    }

}

const displayAllPhones = (phones) =>{
    // console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    // phonesContainer.innerHTML = "";
    if(phones.length == 0){
        phonesContainer.classList.remove('grid');
        phonesContainer.innerHTML = `
            <h2 class="text-3xl my-14 text-center font-bold">OPPS Sorry, No Phones Are Available for You!</h2>
        `
    }else{
        phonesContainer.classList.add('grid');
    }
    phones.forEach(phone => {
        const {brand,phoneName,slug,image} = phone;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-base-100  shadow-xl">
            <figure class="px-10 pt-10">
                <img
                src="${image}"
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${brand}</h2>
                <p>${slug}</p>
                <div class="card-actions">
                <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Details</button>
                </div>
            </div>
            </div>
        `;
        // apend the div 
        phonesContainer.appendChild(div);
    });
}

const handleSearch = () =>{
    document.getElementById('spinner').style.display = "block";
    const searchText = document.getElementById('search-box').value;
    document.getElementById('phones-container').innerHTML = "";
    setTimeout(() => {
        loadAllPhones(false,searchText);
    }, 3000);
}

const handleShowAll = ()=>{

    loadAllPhones(true);
}

const phoneDetails = async (slug)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phone${slug}`);
    const data = await response.json();
    console.log(data);
}






loadAllPhones(false)