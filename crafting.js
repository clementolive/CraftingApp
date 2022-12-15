// PoE-like crafting App 12/2022
const mods = 4; // keep at least this amount for ALL arrays 
const mod_limit = 6; 

name_prefixes = ["Spiked", "Rusted", "Shiny", "Scuffed"]; 
name_suffixes = ["Gloves", "Mitts", "Boots", "Greaves"]; 

prefixes_numeric = ["Fire damage", "Cold damage",
 "Lightning damage", "Chaos damage"]; 

prefixes_basic = ["Burning footsteps", "Onslaught", "Your Hits can't be evaded", 
"Critical chance is lucky", "Point blank", "Blind on hit"]; 

suffixes_numeric = ["Dexterity", "Strength", "Intelligence", "Rage"]; 

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

class Item{
    constructor(){
        //get a name 
        this.rarity = 3; // rare by default
        var temp = getRandomInt(mods);
        var temp2 = getRandomInt(mods);
        this.name = name_prefixes[temp]; 
        temp = getRandomInt(mods);
        this.name += " " + name_suffixes[temp]; 

        //mods 
        this.lvl_required = "Level required: " + (getRandomInt(69)+1); 
        temp = getRandomInt(40);
        temp2 = getRandomInt(mods);
        this.prefix1 = "Adds " + temp + " to " + prefixes_numeric[temp2]; 
        temp = getRandomInt(40);
        temp2 = getRandomInt(mods);
        this.prefix2 = "Adds " + temp + " to " + prefixes_numeric[temp2]; 
        temp = getRandomInt(mods); 
        this.prefix3 = prefixes_basic[temp];
    }
}

function craft_chaos(){
    var item = new Item(); 
    document.getElementById("item_name").innerHTML = item.name; 
    document.getElementById("lvl_required").innerHTML = item.lvl_required; 
    document.getElementById("prefix1").innerHTML = item.prefix1; 
    document.getElementById("prefix2").innerHTML = item.prefix2; 
    document.getElementById("prefix3").innerHTML = item.prefix3; 
}

