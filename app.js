// i have to load the data here to avoid cors problems
const dinoData = {
    "Dinos": [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh",
            "imgUrl": "./images/triceratops.png"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long.",
            "imgUrl": "./images/tyrannosaurus-rex.png"
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years.",
            "imgUrl": "./images/anklyosaurus.png"
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": 372,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991.",
            "imgUrl": "./images/brachiosaurus.png"
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
            "imgUrl": "./images/stegosaurus.png"
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas.",
            "imgUrl": "./images/elasmosaurus.png"
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur.",
            "imgUrl": "./images/pteranodon.png"
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs.",
            "imgUrl": "./images/pigeon.png"
        }
    ]
}

        // Create Dino Constructor
        function Dino (info) {
            this.info = info;
            this.facts = [this.info.fact];
        };

        // Create Dino Compare Method 1, Height
        Dino.prototype.compareHeight = function (human) {

            if (this.info.height > human.height) {
                this.facts.push(`${this.info.species} is ${this.info.height - human.height} feet taller than ${human.name}`);
            } else {
                this.facts.push(`${human.name} is ${human.height - this.info.height} feet taller than ${this.info.species}`);
            }
        };
        
        // Create Dino Compare Method 2, Weight
        Dino.prototype.compareWeight = function (human) {

            if (this.info.weight > human.weight) {
                this.facts.push(`${this.info.species} is heavier than ${human.name}`);
                this.facts.push(`${this.info.species} is a fat-ass dino`);
            } else {
                this.facts.push(`${human.name} is heavier than ${this.info.species}`);
                this.facts.push(`${this.info.species} is a lightweight dino`);
            }
        };
        
        // Create Dino Compare Method 3, Diet
        Dino.prototype.compareDiet = function (human) {

            if (this.info.diet === human.diet.toLowerCase()) {
                this.facts.push(`${this.info.species} and ${human.name} have the same diet`);
            } else if (this.info.diet !== human.diet) {
                this.facts.push(`${this.info.species} and ${human.name} haven't the same diet`);
            }

            if (this.info.diet === 'herbavor') {
                this.facts.push(`${this.info.species} and ${human.name} can be best friends`);
            } else {
                this.facts.push(`${this.info.species} can be dangerous for ${human.name}`);
            }
        }

        // Create Human Object, factory function
        function human (user) {
            return {
                name : user.name,
                height : user.height,
                weight : user.weight,
                diet : user.diet
            };
        };

        // Use IIFE to get human data from form
        let userInput = (function() {
            let name, height, weight, diet

            return {
                getData : function () {
                name = document.querySelector('#name').value;
                height = parseFloat(document.querySelector('#feet').value + '.' + document.querySelector('#inches').value);
                weight = document.querySelector('#weight').value;
                diet = document.querySelector('#diet').value;

                return { name, height, weight, diet };
            }
        }
        })();

        // Create Dino Objects, new keyword on line 161
        function createDinoObjects () {
            let dinoObjects = dinoData.Dinos.map((each) => {
                // NEW KEYWORD 
                let dino = new Dino(each);
                let humanData = human(userInput.getData());

                dino.compareHeight(humanData);
                dino.compareWeight(humanData);
                dino.compareDiet(humanData);
                
                return  dino;
            });

            return dinoObjects;
        }
        
        // Generate Tiles for each Dino in Array, add Human tile
        function generateTiles (dinos) {
            let humanTile = /*html*/ `
            <div class="grid-item">
            <h3>${userInput.getData().name}</h3>
            <img src="./images/human.png" alt>
            </div>
            `;
            let arrayOfTiles = dinos.map((each) => {
                let randomNumber = Math.floor(Math.random() * 6);
                let html  = /*html*/ `
                    <div class="grid-item">
                        <h3>${each.info.species}</h3>
                        <img src=${each.info.imgUrl} alt>
                        <p>${each.facts[each.info.species === 'Pigeon' ? 0 : randomNumber]}</p>
                    </div>
                `;
                return html;
            })
            // add human in the middle
            arrayOfTiles.splice(4, 0, humanTile);
            return arrayOfTiles;
        }
        
        // Add tiles to DOM
        function addTilesToDom (content) {
            document.querySelector('#grid').innerHTML = '';
            content.forEach(each => {
                document.querySelector('#grid').innerHTML += each;
            });
        };
        
        // Remove form from screen
        function removeForm () {
            document.querySelector('#dino-compare').style.display = 'none';
        };

        // On button click, prepare and display infographic
        document.querySelector('#btn').addEventListener('click', function() {
            let dinoObjectsInArray = createDinoObjects();
            let dinoTiles = generateTiles(dinoObjectsInArray);

            // form validation and display infographic
            if (userInput.getData().name == '' || isNaN(userInput.getData().height) || userInput.getData().weight == '') {
                document.querySelector('.validationMessage').innerText = '! You should add your NAME, your HEIGHT and your WEIGHT !';
                return
            } else {
                document.querySelector('.validationMessage').innerText = '';
                removeForm();
                addTilesToDom(dinoTiles);
            }
        });