// PoE-like crafting App 12/2022
// @ts-check 
const mods = 4; // keep at least this amount for ALL basic arrays

const item_mod_limit = 6; 
const mod_max_value = 50; 

const name_prefixes = ["Spiked", "Rusted", "Shiny", "Scuffed"]; 
const name_suffixes = ["Gloves", "Mitts", "Boots", "Greaves"]; 

const implicits = ["Projectile damage", "Global defenses", "Mana regeneration", "Armour"]; 

const prefixes_numeric = ["Fire damage", "Cold damage",
 "Lightning damage", "Chaos damage"]; // Currently used, careful 

 //ITEM STRUCTURE
 categories = ["Boots", "Gloves", "Armour", "Helmet", "One handed weapon", "Two handed weapon", "Offhand"]; 

// NEW MOD STRUCTURE
const elements = ["Fire", "Cold", "Lightning"]; 
const attributes = ["Strength", "Dexterity", "Intelligence"]; 
const specials = ["Burning footsteps", "Onslaught", "Hits can't be evaded", 
"Critical chance is lucky", "Point blank", "Blind on hit"]; 

// CLASSES

class Mod{
    constructor(){
        this.text = ""; 
        this.prefix_suffix = getRandomInt(2)+1; //prefix (1) or suffix (2)
        this.value = getRandomInt(mod_max_value)+1;
        this.value2 = this.value + getRandomInt(10)+1;
        this.tier = getRandomInt(7)+1;
        this.type = getRandomInt(mods); // this helps to create string chain for each mod 
        this.tags = []; 
    }
}

class Item{
    rarity; // 1(normal), 2(magic), 3(rare)
    name; // Just "crafting project", Not useful for crafting app 
    ilvl; // item level 
    lvl_required; // IT'S A STRING, CAREFUL "level required : xx"
    attributes_required;// strength, dexterity, intelligence
    implicit; // a special mod on top of the others 
    category; // boots, gloves ... 
    subcategory; // type of boots ? example : dragonscale boots

    modList; // List of Mod class, useful for easy mod manipulation 

    constructor(){
        //get a name 
        this.name = "Crafting project"
        this.category = "Boots"; 
        this.subcategory ="Slink"; 
        this.rarity = 1; 
        this.modList = []; 
        var temp = getRandomInt(mods); 
        this.implicit = implicits[temp]; 
    }

    update(){
        document.getElementById("item_name").innerHTML = this.name; 
        document.getElementById("lvl_required").innerHTML = this.lvl_required; 
        document.getElementById("implicit").innerHTML = this.implicit; 
    
        let list = document.getElementById("mod_list");
        list.innerHTML = "";
 
        // Create a HTML line for each mod 
        this.modList.forEach((item)=>{
            let li = document.createElement("li");
            li.innerText = item.text;
            list.appendChild(li);
        })

    }

    craft_alchemy(){ //from normal to rare, with 3 mods 
        if(this.rarity==1){
            this.rarity = 3; 
            this.craft_chaos(); 
            this.update_rarity_css(); 
        } else alert("Item is not normal!");
    }

    craft_transmutation(){ //from normal to magic, with 1 or 2 mods
        if(this.rarity==1){
            this.rarity = 2; 
            this.lvl_required = "Level required: " + (getRandomInt(69)+1); 

            //mods
            this.modList.push(roll_numeric_mod()); 
            this.modList.push(roll_numeric_mod()); 
            this.update(); 
            this.update_rarity_css(); 
        } else alert("Item is not normal!");
    }

    craft_alteration(){ //rerolls magic, with 1 or 2 mods 
        if(this.rarity==2){
            this.modList = []; 
            var temp = getRandomInt(2); 
            for (let i = 0; i <= temp; i++) {
                this.modList.push(roll_numeric_mod()); 
            }
            this.update(); 
            this.update_rarity_css(); 
        } else alert("Item is not magic!");
    }

    craft_chaos(){ // rerolls a rare item with new rare modifiers.
        if(this.rarity==3){
            this.lvl_required = "Requires level: " + (getRandomInt(69)+1); 
        
            //3 mods 
            this.modList = []; 
            this.modList.push(roll_numeric_mod()); 
            this.modList.push(roll_numeric_mod()); 
            this.modList.push(roll_numeric_mod()); 

            this.update(); 
        } else alert("Item is not rare!");
    }

    craft_exalt(){ // Adds a mod to a rare item, with up to 6 mods. 
        if(this.rarity==3){
            if(this.modList.length < 6){
                this.modList.push(roll_numeric_mod()); 
                this.update(); 
            } else alert("No space for more mods."); 
        } else alert("Item is not rare!");
    }

    craft_scouring(){ // From rare to normal, removing mods. 
        if(this.rarity != 1){
            this.rarity = 1; 
            this.update_rarity_css(); 
            this.modList = []; 
            this.update(); 
        } else alert("Item should be magic or rare"); 
    }

    craft_regal(){ // From magic to rare, adding a mod. 
        if(this.rarity == 2){
            this.rarity = 3; 
            this.update_rarity_css(); 
            this.modList.push(roll_numeric_mod()); 
            this.update(); 
        } else alert("Item should be magic"); 
    }
    
    reroll_name(){
        var temp = getRandomInt(mods);
        this.name = name_prefixes[temp]; 
        temp = getRandomInt(mods);
        this.name += " " + name_suffixes[temp]; 
    }

    update_rarity_css(){
        var res = ""; 
        if(this.rarity==1) res = "normal"; 
        if(this.rarity==2) res = "magic"; 
        if(this.rarity==3) res = "rare"; 
        document.getElementById("item").className = res;
    }
}

// MAIN FUNCTION
let item = new Item(); 


/**
 * @param {number} max
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function roll_numeric_mod(){
    var mod = new Mod(); 
    var temp = getRandomInt(mods); 
    mod.text = "Adds " + mod.value + " to " + prefixes_numeric[temp]; 
    return mod; 
}

//Transforms a mod and its properties into a readable string for HTML 
function ModToString(mod){
    if(mod.type == "resistance"){
        // Example: +29% to Fire resistance 
        return "+" + mod.value + "% to " + mod.name + " resistance"; 
    }
    else if(mod.type == "attribute_flat"){
        // Example: +29 to Dexterity
        return "+" + mod.value + " to " + mod.name; 
    }
    else if(mod.type == "damage"){
        // Example: Adds 12 to 24 to Physical Damage
        return "Adds " + mod.value + " to " + mod.value2 + " to " + mod.name; 
    }
}
