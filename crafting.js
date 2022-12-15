// PoE-like crafting App 12/2022
// @ts-check 
const mods = 4; // keep at least this amount for ALL arrays 
const item_mod_limit = 6; 
const mod_max_value = 50; 

const name_prefixes = ["Spiked", "Rusted", "Shiny", "Scuffed"]; 
const name_suffixes = ["Gloves", "Mitts", "Boots", "Greaves"]; 

const implicits = ["Projectile damage", "Global defenses", "Mana regeneration", "Armour"]; 

const prefixes_numeric = ["Fire damage", "Cold damage",
 "Lightning damage", "Chaos damage"]; 

const prefixes_basic = ["Burning footsteps", "Onslaught", "Your Hits can't be evaded", 
"Critical chance is lucky", "Point blank", "Blind on hit"]; 

const suffixes_numeric = ["Dexterity", "Strength", "Intelligence", "Rage"]; 

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

    modList; 

    constructor(){
        //get a name 
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

        document.getElementById("mod_list").innerHTML = "";
 
        this.modList.forEach((item)=>{
            let li = document.createElement("li");
            li.innerText = item;
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
            //get name and lvl requirement 
            var temp = getRandomInt(mods);
            this.name = name_prefixes[temp]; 
            temp = getRandomInt(mods);
            this.name += " " + name_suffixes[temp]; 
            this.lvl_required = "Level required: " + (getRandomInt(69)+1); 

            //mods
            this.modList.push(roll_numeric_mod()); 
            this.modList.push(roll_numeric_mod()); 
            this.update(); 
            this.update_rarity_css(); 
        } else alert("Item is not normal!");
    }

    craft_alteration(){ //removes mods, adds 1 or 2 mods
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
            //get name and lvl requirement 
            var temp = getRandomInt(mods);
            this.name = name_prefixes[temp]; 
            temp = getRandomInt(mods);
            this.name += " " + name_suffixes[temp]; 
            this.lvl_required = "Level required: " + (getRandomInt(69)+1); 
        
            //3 mods 


            this.modList = []; 
            this.modList.push(roll_numeric_mod()); 
            this.modList.push(roll_numeric_mod()); 
            this.modList.push(roll_numeric_mod()); 

            this.update(); 
        } else alert("Item is not rare!");
    }

    craft_exalt(){
        if(this.rarity==3){
            if(this.modList.length < 6){
                this.modList.push(roll_numeric_mod()); 
                this.update(); 
            } else alert("No space for more mods."); 
        } else alert("Item is not rare!");
    }

    craft_scouring(){
        if(this.rarity != 1){
            this.rarity = 1; 
            this.update_rarity_css(); 
            this.modList = []; 
            this.update(); 
        } else alert("Item should be magic or rare"); 
    }

    craft_regal(){
        if(this.rarity == 2){
            this.rarity = 3; 
            this.update_rarity_css(); 
            this.modList.push(roll_numeric_mod()); 
            this.update(); 
        } else alert("Item should be magic"); 
    }

    update_rarity_css(){
        var res = ""; 
        if (this.rarity==1) res = "normal"; 
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
    var temp = getRandomInt(mod_max_value)+1;
    var temp2 = getRandomInt(mods);
    return "Adds " + temp + " to " + prefixes_numeric[temp2]; 
}
