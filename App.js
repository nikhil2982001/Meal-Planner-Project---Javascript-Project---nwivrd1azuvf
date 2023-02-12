
(async function randomMeals() {
    let calorie = (() => Math.floor(Math.random() * 990) + 10)() // 10 - 1000;
    let day = (() => Math.floor(Math.random() * 6))()
    let today = ""
    switch(day){
        case 0: today = "sunday"; break;
        case 1: today = "monday"; break;
        case 2: today = "tuesday"; break;
        case 3: today = "wednesday"; break;
        case 4: today = "thursday"; break;
        case 5: today = "friday"; break;
        case 6: today = "saturday"; break;
    }
    const query = await fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=99153a1775d04de695f4432c22b293d4&timeFrame=week&targetCalories=${calorie}`)
    const data = await query.json();
    let calories = (data.week[`${today}`]['nutrients']['calories'])
    meals = data.week[`${today}`]['meals']
    console.log(meals);
    meals.forEach((meal,index) => {
        let img = `https://spoonacular.com/recipeImages/${meal.id}-556x370.${meal.imageType}`
        if(index === 0) {
            const container = document.querySelector('#breakfast-cards')
            container.querySelector('img').src = img;
            container.querySelector('.calories').textContent = calories;
            container.querySelector('button').onclick = `breakFastRecipe(${meal.id})`;
        }
        if(index === 1){
            const container = document.querySelector('#lunch-cards')
            container.querySelector('img').src = img;
            container.querySelector('.calories').textContent = calories;
            container.querySelector('button').onclick = `lunchRecipe(${meal.id})`;
        }
        if(index === 2){
            const container = document.querySelector('#dinner-cards')
            container.querySelector('img').src = img;
            container.querySelector('.calories').textContent = calories;
            // container.querySelector('button').setAttribute("onclick",`dinnerRecipe(${meal.id})`);
            // console.log("look here", container.querySelector('button'),`dinnerRecipe(${meal.id})`)
            // container.querySelector('button').onclick = dinnerRecipe(meal.id)
        }
    })

})();
document.querySelector('#generate-meal-button').addEventListener('click', (e) => {
    e.preventDefault();
     let bmr;
     let calorie;
     const height=document.getElementById("height").value;
     const weight=document.getElementById("weight").value;
     const age=document.getElementById("age").value;
     const gender=document.getElementById("gender").value;
     const activity=document.getElementById("activity").value;
     if(height!=""|| weight!=""|| age!="" ){
     
        if(gender==="male"){
            bmr=66.47 + (13.75 * weight ) + (5.003 * height ) - (6.755 * age); 
        }
        else if(gender==="female"){
            bmr=655.1 + (9.563 * weight ) + (1.850 * height ) - (4.676 * age );
        }
        else
        return;
        if(activity ==="light"){
           calorie= bmr * 1.375;
        }
        else if(activity==="moderate"){
          calorie= bmr * 1.55;
        }
        else if(activity==="active"){
         calorie= bmr * 1.725;
        }
        else
        return;

        fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=99153a1775d04de695f4432c22b293d4&timeFrame=week&targetCalories=${calorie}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
        //handle data
        console.log(data)
        const date = new Date();
        let today = ""
        switch(date.getDay()){
            case 0: today = "sunday"; break;
            case 1: today = "monday"; break;
            case 2: today = "tuesday"; break;
            case 3: today = "wenesday"; break;
            case 4: today = "thrusday"; break;
            case 5: today = "friday"; break;
            case 6: today = "saturday"; break;
        }
        console.log(today);
        let mealsEachDay = data.week[`${today}`]['meals'];
        let calories = data.week[`${today}`]['nutrients']['calories'];
        console.log(mealsEachDay, calories)

        mealsEachDay.forEach((meal,index) => {
            let img = `https://spoonacular.com/recipeImages/${meal.id}-556x370.${meal.imageType}`
            const mealCard = `
                <div data-id="${meal.id}" id="meal-${meal.id}" class="meal-card">
                    <img class="meal-image" src=${img} alt="meal image" />
                    <p class="meal-title">TITLE - ${meal.title}</p>
                    <p class="calories">Calories - ${calories}</p>
                    <button class="button btn2" id="breakfast-btn" onclick="dataFetch(${meal.id})">Get Recipe</button>
                </div>
            `
            if(index === 0) {
                const container = document.querySelector('#breakfast-cards')
                while(container.firstChild){
                    container.firstChild.remove();
                }
                container.insertAdjacentHTML('beforeend', mealCard);
            }
            if(index === 1){
                const container = document.querySelector('#lunch-cards')
                while(container.firstChild){
                    container.firstChild.remove();
                }
                container.insertAdjacentHTML('beforeend', mealCard)
            }
            if(index === 2){
                const container = document.querySelector('#dinner-cards')
                while(container.firstChild){
                    container.firstChild.remove();
                }
                container.insertAdjacentHTML('beforeend', mealCard)
            }
        })
        })
        
    }
    
    
})

function dataFetch(id) {
    let equipmentArray = [];
    fetch(
       `https://api.spoonacular.com/recipes/${id}/information?apiKey=99153a1775d04de695f4432c22b293d4&includeNutrition=false`)
        .then((response) => response.json())
        .then((data) => {

            document.getElementById("steps").innerHTML = ""
            console.log(data)

            for (item of data.analyzedInstructions) {
                for (i of item.steps) {
                    stepShow(i.step);
                }
            }

            // document.getElementById("list-of-ingredients").innerHTML = "";
            for (item of data.extendedIngredients) {
                var quantity = item.amount + " " + item.unit
                if (item.nameClean != null) {
                    var name = item.nameClean.charAt(0).toUpperCase() + item.nameClean.slice(1);
                    ingredientsShow(name, quantity)
                }


            }


            for (item of data.analyzedInstructions) {
                console.log(item)
                for (i of item.steps) {
                    for (j of i.equipment) {
                        console.log(j.name);
                        if (!equipmentArray.includes(j.name))
                        equipmentArray.push(j.name);
                    }
                }
            }
            equipment(equipmentArray);


        })
        .catch((e) => {
            console.log(e);
        });
}
function breakFastRecipe(breakfastId) {
    dataFetch(breakfastId)
    recipe.style.display = "block";
}

function lunchRecipe(lunchId) {
    dataFetch(lunchId)
    recipe.style.display = "block";
}

function dinnerRecipe(dinnerId) {
    dataFetch(dinnerId)
    recipe.style.display = "block";
}

function stepShow(step){
    document.querySelector('#steps').insertAdjacentHTML('beforeend', `<p class="recipe-steps">${step}</p>`)
}
function ingredientsShow(name,quantity){
    console.log(document.querySelector('#list-of-ingredients'));
    document.querySelector('#list-of-ingredients').insertAdjacentHTML('beforeend', `<p class="ingredient">${name} ${quantity}</p>`)
}
function equipment(equip){
    document.querySelector('#equipment').insertAdjacentHTML('beforeend', `<p class="equipment">${equip}</p>`)
}
