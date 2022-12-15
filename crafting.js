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

class Mod{
    constructor(){
        type = getRandomInt(2)+1; //prefix (1) or suffix (2)
        value = getRandomInt(mod_max_value)+1;
    }
}

class Item{
    constructor(){
        //get a name 
        this.rarity = 3; // rare by default
        var temp = getRandomInt(mods);
        this.name = name_prefixes[temp]; 
        temp = getRandomInt(mods);
        this.name += " " + name_suffixes[temp]; 

        //mods 
        this.lvl_required = "Level required: " + (getRandomInt(69)+1); 
        this.prefix1 = roll_numeric_mod(); 
        this.prefix2 = roll_numeric_mod(); 
        temp = getRandomInt(mods); 
        this.prefix3 = prefixes_basic[temp];
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function roll_numeric_mod(){
    var temp = getRandomInt(mod_max_value)+1;
    var temp2 = getRandomInt(mods);
    return "Adds " + temp + " to " + prefixes_numeric[temp2]; 
}

function craft_chaos(){
    var item = new Item(); 
    document.getElementById("item_name").innerHTML = item.name; 
    document.getElementById("lvl_required").innerHTML = item.lvl_required; 
    document.getElementById("prefix1").innerHTML = item.prefix1; 
    document.getElementById("prefix2").innerHTML = item.prefix2; 
    document.getElementById("prefix3").innerHTML = item.prefix3; 
}

