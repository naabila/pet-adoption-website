function getId(id){
return document.getElementById(id)
}
//fetch category
const fetchCatagory=async()=>{
try{
    let res=await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    let data=await res.json();
    displayCatagoryFilterButton(data.categories)
}catch(error){
console.log('error loading data')
}

}

//fetch data by catagory
const fetchDataByCatagory=async(catagoryText="cat")=>{
    try{
      getId('crd-container').innerHTML='';
        getId('spinner').style.display = "block";
        setTimeout(async () => {
            let res=await fetch(`https://openapi.programming-hero.com/api/peddy/category/${catagoryText}`);
        let data=await res.json();
         dataCard(data.data)
        }, 2000);
        
   }catch(error){
        console.log('error loading category data')
    }
    
}

//show pet details
const showPetDetails=async (id)=>{
  try{
    let res=await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
  let data=await res.json();
  const petData = data.petData;
  getId('pet-img').src = petData.image || './images/default-pet.png'; // Set a default image if none is provided
    getId('pet-name').textContent = petData.pet_name || 'No Name Available';
    getId('pet-breed').textContent = `Breed: ${petData.breed || 'N/A'}`;
    getId('pet-birth').textContent = `Birth: ${petData.date_of_birth || 'N/A'}`;
    getId('pet-gender').textContent = `Gender: ${petData.gender || 'N/A'}`;
    getId('pet-price').textContent = `Price: ${petData.price ? `${petData.price}$` : 'N/A'}`;
    getId('pet-vaccine').textContent = `Vaccinated: ${petData.vaccine_status || 'No Information'}`;
    getId('pet-details').textContent = petData.pet_details || 'No details available.';

  getId('my_modal_1').showModal()
  }catch(error){
    console.log('error loading data by is ',error)
  }
}

//sorting array
const handleArrayPriceSorting=async ()=>{
try{
  getId('crd-container').innerHTML='';
  getId('spinner').style.display = "block";
  setTimeout(async() => {
    const res=await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data=await res.json();
    let pets=data.pets;
    pets.sort((a, b) =>b.price - a.price);
    getId('spinner').style.display = "none"; 
    dataCard(pets)
  }, 2000);
 
}catch(error){
  console.log(error)
}

};
getId('sort-btn').addEventListener('click',()=>{
  handleArrayPriceSorting();
})

//============= Show Filter button on catagory ==============
const displayCatagoryFilterButton=(catagories)=>{
catagories.forEach(catagory => {
    let button=document.createElement('button');
    button.classList.add('filter-btn','flex','gap-3', 'items-center', 'justify-center', 'border', 'py-5');
    button.innerHTML=`
    <img class="w-[50px] h-[50px]" src=${catagory.category_icon} alt="pet-image-1"> <span class="text-[22px] font-[900] text-[#131313]">${catagory.category}</span>
    `;
 //Active class by default   
    if(catagory.category==='Cat'){
        button.classList.add('active');
        button.classList.remove('rounded-[8px]')
    }
//click event
button.addEventListener('click',()=>{
    //tab style change
    document.querySelector('.active')?.classList.remove('active');
    button.classList.add('active');
    button.classList.remove('rounded-[8px]');
    //fetch category data
    fetchDataByCatagory(catagory.category)
})    
getId('btn-container').appendChild(button)
});
}

//============= Show Data card ==============
const handleLikeBtn=(petImage)=>{
getId('pet-image-grid').classList.add('shadow-xl')
let petImageElem=document.createElement('img');
petImageElem.classList.add('w-full', 'h-full','rounded-xl')
petImageElem.src=petImage;
petImageElem.alt="pet-image-grid-item"
getId('pet-image').appendChild(petImageElem)

}

//====== Adoptation popup finctionality===========
let countdownInterval; 
function startCountdown() {
    const modal = document.getElementById('my_modal_2');
    const counterContainer = document.getElementById('counter-container');
    let countdown = 3;

    //modal opening
    modal.showModal();
    counterContainer.textContent = countdown;
     clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      countdown--;
      counterContainer.textContent = countdown;
      
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        modal.close();
      }
    }, 1000); 
  }


const dataCard=(petInfos)=>{
  getId('spinner').style.display="none";
    getId('crd-container').innerHTML="" ;
    
    if(petInfos.length===0){
        getId('no-info').classList.remove('hidden');
    }else{
        getId('no-info').classList.add('hidden');
    }
   petInfos.forEach((petInfo)=>{
    let div=document.createElement('div');
    div.classList.add('card', 'col-span-12', 'md:col-span-6','lg:col-span-4', 'bg-base-100', 'w-94' ,'shadow-xl');
    div.innerHTML=`
     <figure class="px-5 pt-10">
          <img
            src="${petInfo.image ? petInfo.image : '<div class="skeleton h-32 w-full"></div>'}"
            alt="image"
            class="rounded w-full h-full" />
        </figure>
        <div class="card-body items-start text-start">
          <h2 class="card-title font-[900] text-[20px]">${petInfo.pet_name?petInfo.pet_name:"No Data Found"}</h2>
          <div class="flex justify-between items-center gap-1">
            <img class="w-[15px] h-[15px]" src="./images/Frame.png" alt="fram">
            <p class="text-base text-[#131313]/70">Breed:${petInfo.breed?petInfo.breed:"N/A"}</p>
          </div>
          <div class="flex justify-between items-center gap-1">
            <img class="w-[15px] h-[15px]" src="./images/Frame (1).png" alt="fram">
            <p class="text-base text-[#131313]/70">Birth: ${petInfo.date_of_birth?petInfo.date_of_birth:"No info found"}</p>
          </div>
          <div class="flex justify-between items-center gap-1">
            <img class="w-[15px] h-[15px]" src="./images/Frame (2).png" alt="fram">
            <p class="text-base text-[#131313]/70">Gender: ${petInfo.gender?petInfo.gender:"No information Found"}</p>
          </div>
          <div class="flex justify-between items-center gap-1">
            <img class="w-[15px] h-[15px]" src="./images/Frame (3).png" alt="fram">
            <p class="text-base text-[#131313]/70">Price: ${petInfo.price ? `${petInfo.price}$` : "N/A"}</p>

          </div>
          <div class="card-actions">
            <button onclick="handleLikeBtn('${petInfo.image}')" class="border px-5 py-2 rounded-[8px]">
              <i class="fa-regular fa-thumbs-up"></i>
            </button>
            <button onclick="startCountdown()" class="border font-[900] text-[#0E7A81] px-5 py-2 rounded-[8px]">
              Adopt
            </button>

            <button onclick="showPetDetails(${petInfo.petId})" class="border font-[900] text-[#0E7A81] px-5 py-2 rounded-[8px]">
             Details
            </button>
           </div>
        </div>
    `
    getId('crd-container').appendChild(div)


   })
}

fetchCatagory()
fetchDataByCatagory()
