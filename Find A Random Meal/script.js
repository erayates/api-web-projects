const findBtn = document.querySelector('.btn')
const container = document.querySelector('.container')


findBtn.addEventListener('click',()=>{
    container.innerHTML = ''
    axios('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => placeTheMeal(res.data.meals[0]))
    }
    
)

const placeTheMeal = (data) => {
    console.log(data)
    container.innerHTML= `
    <h1 style="text-align:center; margin-bottom:2rem;">${data.strMeal}</h1>
    <div class="food-container">
    
    <div class="food-img">
        <img src="${data.strMealThumb}" width="500px" height="500px">
        <p class="food-img-title">${data.strMeal}, ${data.strArea}</p>
 
    </div>
    <div class="food-details">
            <div class="food-detail">
                <h4 class="food-detail-title">Category</h4>
                <p>${data.strCategory}</p>
            </div>
            <div class="food-detail">
                <h4 class="food-detail-title">Ingredients</h4>
                <p>${data.strMeasure1} ${data.strIngredient1}</p>
                <p>${data.strMeasure2} ${data.strIngredient2}</p>
                <p>${data.strMeasure3} ${data.strIngredient3}</p>
                <p>${data.strMeasure4} ${data.strIngredient4}</p>
                <p>${data.strMeasure5} ${data.strIngredient5}</p>
                <p>${data.strMeasure6} ${data.strIngredient6}</p>
                <p>${data.strMeasure7} ${data.strIngredient7}</p>
                <p>${data.strMeasure8} ${data.strIngredient8}</p>
                <p>${data.strMeasure9} ${data.strIngredient9}</p>
                <p>${data.strMeasure10} ${data.strIngredient10}</p>
                <p>${data.strMeasure11} ${data.strIngredient11}</p>
                <p>${data.strMeasure12} ${data.strIngredient12}</p>
                <p>${data.strMeasure13} ${data.strIngredient13}</p>
                <p>${data.strMeasure14} ${data.strIngredient14}</p>
                <p>${data.strMeasure15} ${data.strIngredient15}</p>
                <p>${data.strMeasure16} ${data.strIngredient16}</p>
                <p>${data.strMeasure17} ${data.strIngredient17}</p>
                <p>${data.strMeasure18} ${data.strIngredient18}</p>
                <p>${data.strMeasure19} ${data.strIngredient19}</p>
                <p>${data.strMeasure20} ${data.strIngredient20}</p>
            </div>
            <div class="food-detail">
                <h4 class="food-detail-title">Instructions</h4>
                <p>${data.strInstructions}</p>
                <a href="${data.strYoutube}" target="_blank"><button class="btn2">Watch the cooking video from YouTube!</button></a>
            </div>
        
     
    </div>
</div>
    
    `
}




   
