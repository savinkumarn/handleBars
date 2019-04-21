var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/pets-data.json');
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    // This is where we'll do something with the retrieved data
    var data = JSON.parse(ourRequest.responseText);
    createHTML(data);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();

function createHTML(petsData){
//var rawTemplate = document.getElementById("petsTemplate").innerHTML;
  var compiledTemplate=Handlebars.compile(petTemplate());
  var ourGeneratedHTML = compiledTemplate(petsData);
  
  var petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = ourGeneratedHTML;
  
}

Handlebars.registerHelper("calculateAge",function(birthYear){
  var age = new Date().getFullYear() - birthYear; 
  if (age > 0) {
    return age + " years old";
  } else {
    return "is less than a year old";
  }
});

  function petTemplate(){ return `       {{#each pets}}
<div class="pet">
  <div class="photo-column">
    <img src="{{photo}}"/>
  </div>
  <div class="info-column">
     <h2>{{ name }}  <span class="species">{{species}}</span></h2>

     <p>Age : {{calculateAge birthYear}}</p>

      {{#if favFoods}}
     <h4 class="headline-bar">Favorite Foods</h4>
     <ul class="favorite-foods">
       {{#each favFoods}}
       <li> {{{this}}}</li>
       {{/each}}
      </ul>
      {{/if}}
  </div>
</div>
{{/each}}`};

