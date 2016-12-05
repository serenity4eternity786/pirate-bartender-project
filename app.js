//List of ingrediants in the pantry (ONCLICK???)
//dropdown menu values (yes/no will yield random values)
var pantry = {
    strong: ["glug of rum", "slug of whisky", "splash of gin"],
    salty: ["olive on a stick", "salt-dusted rim", "rasher of bacon"],
    bitter: ["shake of bitters", "splash of tonic", "twist of lemon peel"],
    sweet: ["sugar cube", "spoonful of honey", "splash of cola"],
    fruity: ["slice of orange", "dash of cassis", "cherry on top"]
};
//get the set of ingredients that the user has chosen
var Order = function (orderValues) {
    this.strong = orderValues[0];
    this.salty = orderValues[1];
    this.bitter = orderValues[2];
    this.sweet = orderValues[3];
    this.fruity = orderValues[4];
};

//define the drink object based on the pantry one and the drink order defined bellow
var Drink = function (pantry, drinkOrder) {
    var ingredientNumber = [];
    var ingredientsArray = [];

    for (var userPreference in drinkOrder) {
        //generate a random number in order to pick up on ingredient in each ingredients category  (for example choose "slug of whisky" for a dring where the client selected the "strong" category of ingredients)
        ingredientNumber = generateRandomNumber(0, 2);
        if (drinkOrder[userPreference]) {
            //for each one of the ingredient categories chose one random ingredient and populate the ingredientsArray with it
            ingredientsArray.push(pantry[userPreference][ingredientNumber]);
        }
    }
    return ingredientsArray;
};

/* Step 2 - define the functions which are going to use the main objects of the app */

//changes the ingredient names from whichever case the are to "Title Case"
var toTitleCase = function (str) {
    // "/\w\S*/g" is a regular expression (http://www.regular-expressions.info/) which searches for all words in a phrase ignoring the spaces
    return str.replace(/\w\S*/g, function (txt) {
        //only the first letter in the word make Upper case and all the other letters apart from the first one ("substr(1)") to lower case
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Function to generate the random number
var generateRandomNumber = function (min, max) {
    //Returns a random integer between min (included) and max (included); Math.floor() will give you a non-uniform distribution!
    //random number generator details can be found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

// use if statements to piece together name conditionally based on the ingredients that comprise it
var drinkNamer = function (concoction) {
    //if there is at least one ingredient in the concoction
    if (concoction.length > 0) {
        //split the concoction by space to be able to use the words
        var drinkNamerOutput = concoction[0].split(" ");
        //chose the last word of the first ingredient
        var lastWord = drinkNamerOutput[drinkNamerOutput.length - 1];
        //change the title case of the last word
        return toTitleCase(lastWord);
    } else {
        return false;
    }
};
//Pushing the button (results in an output) which will be a random output
//select all of your dropdowns
var strongDropDown = document.getElementById('strongDropDown');
var tangDropDown = document.getElementById('tangDropDown');
var sweetDropDown = document.getElementById('sweetDropDown');
var bitterDropDown = document.getElementById('bitterDropDown');
var fruitDropDown = document.getElementById('fruitDropDown');



function checkDropDowns(pantrySelection, dropdownvalue) {
    console.log(dropdownvalue);
    if (dropdownvalue === 'yes') {
        switch (pantrySelection) {
        case '#strongDropDown':
            var question = pantry.strong[Math.floor(Math.random * pantry.strong.length)];
            break;
        case '#tangDropDown':
            var question = pantry.tang[Math.floor(Math.random * pantry.tang.length)];
            break;
        case '#bitterDropDown':
            var question = pantry.bitter[Math.floor(Math.random * pantry.bitter.length)];
            break;
        case '#sweetDropDown':
            var question = pantry.sweet[Math.floor(Math.random * pantry.sweet.length)];
            break;
        case '#fruitDropDown':
            var question = pantry.fruit[Math.floor(Math.random * pantry.fruit.length)];
            break;
        }

    }

}

$(document).ready(function () {

    //by default the output container is empty
    $('.output').hide();

    $('.orderBtn').on('click', function () {

        //set the empty orderValues array
        var orderValues = [];

        //check if the each one of the ingredient types have been chosen and that to the orderValues array;
        $('select').each(function () {
            if ($(this).val() === 'yes') {
                orderValues.push(true);
            } else {
                orderValues.push(false);
            }
        });
        console.log(orderValues);

        drinkOrder = new Order(orderValues);
        concoction = new Drink(pantry, drinkOrder); // mix drink with Drink constructor


        //if there is at least one ingredient selected then show the concoction
        if (concoction.length > 0) {

            //build the chosen ingredients from the ingredients array
            var buildTheHtmlOutput = "";
            $.each(concoction, function (key, value) {
                buildTheHtmlOutput += "<li>" + value + "</li>";
            });

            //show the output container
            $('.output').show();

            // name the customer's beverage with drinkNamer();
            $(".output h3").html("Here be yer Sparkly " + drinkNamer(concoction) + " Grog, ye scurvy dog!");

            //populate it with the ingredients
            $(".output ul").html(buildTheHtmlOutput);
        }
        //if there are no ingredients selected then show alert
        else {
            alert('Pick something for your poison!');
        }
        checkDropDowns(pantrySelection, dropdownvalue);
    });
})
