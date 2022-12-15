// PoE-like crafting App 12/2022
const mods = 4; // keep at least this amount for ALL arrays 
const mod_limit = 6; 
const mod_max_value = 50; 

name_prefixes = ["Spiked", "Rusted", "Shiny", "Scuffed"]; 
name_suffixes = ["Gloves", "Mitts", "Boots", "Greaves"]; 

implicits = ["Projectile damage", "Global defenses", "Mana regeneration", "Armour"]; 

prefixes_numeric = ["Fire damage", "Cold damage",
 "Lightning damage", "Chaos damage"]; 

prefixes_basic = ["Burning footsteps", "Onslaught", "Your Hits can't be evaded", 
"Critical chance is lucky", "Point blank", "Blind on hit"]; 

suffixes_numeric = ["Dexterity", "Strength", "Intelligence", "Rage"]; 

// CLASSES

class Mod{
    constructor(){
        this.prefix_suffix = getRandomInt(2)+1; //prefix (1) or suffix (2)
        this.value = getRandomInt(mod_max_value)+1;
        this.type = getRandomInt(mods); 
    }
}

class Item{
    rarity; 
    name; 
    lvl_required; // IT'S A STRING, CAREFUL "level required : xx"
    implicit; 
    prefix1; 
    prefix2; 
    prefix3; 

    constructor(){
        //get a name 
        this.rarity = 1; // normal by default
    }

    update(){
        document.getElementById("item_name").innerHTML = this.name; 
        document.getElementById("lvl_required").innerHTML = this.lvl_required; 
        document.getElementById("implicit").innerHTML = this.implicit; 
        document.getElementById("prefix1").innerHTML = this.prefix1; 
        document.getElementById("prefix2").innerHTML = this.prefix2; 
        document.getElementById("prefix3").innerHTML = this.prefix3; 
    }

    craft_chaos(){
        //get name
        var temp = getRandomInt(mods);
        this.name = name_prefixes[temp]; 
        temp = getRandomInt(mods);
        this.name += " " + name_suffixes[temp]; 
        this.lvl_required = "Level required: " + (getRandomInt(69)+1); 
    
        //3 mods 
        temp = getRandomInt(mods); 
        this.implicit = implicits[temp]; 
    
        this.prefix1 = roll_numeric_mod(); 
        this.prefix2 = roll_numeric_mod(); 
        temp = getRandomInt(mods); 
        this.prefix3 = prefixes_basic[temp]; 
        item.update(); 
    }
}

// MAIN FUNCTION
let item = new Item(); 


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function roll_numeric_mod(){
    var temp = getRandomInt(mod_max_value)+1;
    var temp2 = getRandomInt(mods);
    return "Adds " + temp + " to " + prefixes_numeric[temp2]; 
}



function craft_scouring(){

}
