// PoE-like crafting App 12/2022
// @ts-check 
const mods = 4; // keep at least this amount for ALL basic mod arrays

const item_mod_limit = 6; 
const mod_max_value = 50; 

const implicits = ["Projectile damage", "Global defenses", "Mana regeneration", "Armour"]; 

//ITEM STRUCTURE
const categories = ["Boots", "Gloves", "Armour", "Helmet", "One handed weapon", "Two handed weapon", "Offhand"]; 

// NEW MOD STRUCTURE
const mod_types = ["attribute", "elemental_damage", "special"]; 

const elements = ["Fire", "Cold", "Lightning"]; 
const attributes = ["Strength", "Dexterity", "Intelligence"]; 
const specials = ["Burning footsteps", "Onslaught", "Hits can't be evaded", 
"Critical chance is lucky", "Point blank", "Blind on hit"]; 

//---------------------------CLASSES----------------------------------------------------

class Mod{
    constructor(){
        this.text = "mod creation"; 
        this.prefix_suffix = getRandomInt(2)+1; //prefix (1) or suffix (2)
        this.value = getRandomInt(mod_max_value)+1;
        this.value2 = this.value + getRandomInt(10)+1;
        this.tier = getRandomInt(7)+1;
        let temp = getRandomInt(3); 
        this.type = elements[temp]; // this helps to create string chain for each mod 
        this.tags = []; 
    }

    //Transforms a mod and its properties into a readable string for HTML 
    modToString(){
        if(this.type == "Fire" || this.type == "Cold" || this.type == "Lightning"){
            // Example: +45% to cold resistance 
           this.text =  "+" + this.value + "% to " + this.type + " resistance"; 
        }
        else this.text = "modtostring error "; 
    }
}

class Item{
    rarity; // 1(normal), 2(magic), 3(rare)
    quality; //0 to 30%; usually up to 20%
    name; // Just "crafting project", Not useful for crafting app 
    ilvl; // item level 
    lvl_required; // level required to wear the item 
    /* defenses (evasion, armour, energy shield)
     given by the item (slink boots give evasion, for example) */
    defenses; 
    attributes_required;// strength, dexterity, intelligence
    implicit; // a special mod on top of the others 
    category; // boots, gloves ... 
    subcategory; // type of boots ? example : dragonscale boots

    modList; // List of Mod class, useful for easy mod manipulation 

    constructor(){
        //get a name 
        this.name = "Crafting project"
        this.category = "Boots"; 
        this.subcategory = "Slink"; 
        this.rarity = 1; 
        this.quality = 20; 
        this.ilvl = 100; 
        this.lvl_required = 1; 
        this.modList = []; 
        let temp = getRandomInt(mods); 
        this.implicit = implicits[temp]; 
        this.update(); 
    }

    update(){
        // @ts-ignore
        document.getElementById("item_quality").innerHTML = "Quality: +" + this.quality + "%"; 
        // @ts-ignore
        document.getElementById("item_name").innerHTML = this.name; 
        // @ts-ignore
        document.getElementById("item_category").innerHTML = this.subcategory + " " + this.category; 
        // @ts-ignore
        document.getElementById("item_level").innerHTML = "Item level: " + this.ilvl;
        // @ts-ignore
        document.getElementById("lvl_required").innerHTML = "Requires level: " + this.lvl_required; 
        // @ts-ignore
        document.getElementById("implicit").innerHTML = this.implicit; 
    
        let list = document.getElementById("mod_list");
        // @ts-ignore
        list.innerHTML = "";
 
        // Create a HTML line for each mod 
        this.modList.forEach((item)=>{
            let li = document.createElement("li");
            li.innerText = item.text;
            // @ts-ignore
            list.appendChild(li);
        })
    }

    update_rarity_css(){
        let res = ""; 
        if(this.rarity==1) res = "normal"; 
        if(this.rarity==2) res = "magic"; 
        if(this.rarity==3) res = "rare"; 
        // @ts-ignore
        document.getElementById("item").className = res;
    }


    //-----------------------CRAFTING ----------------------------------------------------------

    craft_transmutation(){ //from normal to magic, with 1 or 2 mods
        if(this.rarity==1){
            this.rarity = 2; 
            this.lvl_required = getRandomInt(69)+1; 

            //mods
            this.craft_alteration(); 
        } else alert("Item should be normal!");
    }

    craft_alchemy(){ //from normal to rare, with 3 mods 
        if(this.rarity==1){
            this.rarity = 3; 
            this.craft_chaos(); 
            this.update_rarity_css(); 
        } else alert("Item should be normal!");
    }

    craft_alteration(){ //rerolls magic, with 1 or 2 mods 
        if(this.rarity==2){
            this.modList = []; 
            let temp = getRandomInt(2); 
            for (let i = 0; i <= temp; i++) {
                this.modList.push(roll_numeric_mod()); 
            }
            this.update(); 
            this.update_rarity_css(); 
        } else alert("Item should be magic!");
    }

    craft_regal(){ // From magic to rare, adding a mod. 
        if(this.rarity == 2){
            this.rarity = 3; 
            this.update_rarity_css(); 
            this.modList.push(roll_numeric_mod()); 
            this.update(); 
        } else alert("Item should be magic"); 
    }

    craft_chaos(){ // rerolls a rare item with new rare modifiers.
        if(this.rarity==3){
            this.lvl_required = getRandomInt(69)+1; 
        
            //At least 4 mods, but chances to get 5 or 6
            this.modList = []; 
            let temp = getRandomInt(100);
            let max_rolls = 4; 
            if (temp <= 23) max_rolls = 5; 
            if (temp <= 12) max_rolls = 6; 
            for (let index = 0; index < max_rolls; index++) {
                this.modList.push(roll_numeric_mod());
            }

            this.update(); 
        } else alert("Item should be rare!");
    }

    craft_exalt(){ // Adds a mod to a rare item, with up to 6 mods. 
        if(this.rarity==3){
            if(this.modList.length < 6){
                this.modList.push(roll_numeric_mod()); 
                this.update(); 
            } else alert("No space for more mods."); 
        } else alert("Item should be rare!");
    }

    craft_divine(){ // Rerolls numeric values of mods 
        if(this.rarity != 1){ 
            this.modList.forEach((elm) => {
                let temp = getRandomInt(mod_max_value)+1; 
                elm.value = temp; 
                temp = getRandomInt(10)+1; 
                elm.value2 = elm.value + temp; 
                elm.modToString(); 
            });
            this.update(); 
            console.log("divine used"); 
        } else alert("Item should be magic or rare!");
    }

    craft_scouring(){ // From rare to normal, removing mods. 
        if(this.rarity != 1){
            this.rarity = 1; 
            this.update_rarity_css(); 
            this.modList = []; 
            this.update(); 
        } else alert("Item should be magic or rare"); 
    }
}

//-------------------------------GENERIC FUNCTIONS-------------------------------------------------------- 

import { getRandomInt } from "./basic_functions";

function roll_numeric_mod(){
    let mod = new Mod(); 
    let temp = getRandomInt(3); 
    mod.type = elements[temp]; // should choose a category first. temporary 
    mod.modToString(); 
    return mod; 
}

function use_flavour(data){
    let flavour_array = Object.values(data); 
    //console.log(flavour_array); 
    let temp = getRandomInt(flavour_array.length); 
    // @ts-ignore
    document.getElementById("flavour").innerHTML = flavour_array[temp].split('\n').join('<br/>'); 
}


//------------------------------------MAIN FUNCTION--------------------------------------------------
let item = new Item(); 

//JSON test 
fetch('data/flavour.json')
  .then((response) => response.json())
  .then((data) => {
    use_flavour(data); 
});






