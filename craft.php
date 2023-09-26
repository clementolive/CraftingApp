<!DOCTYPE html>

<html>
<?php include "./header.html" ?>

<body>
   
    <?php include "./navbar.html" ?>
    <div class="crafting_simulator" >
        <img src="images/transmutation-upscaled.png" onclick="item.craft_transmutation()">
        <img src="images/alchemy_upscaled.png" onclick="item.craft_alchemy()">
        <img src="images/alteration.png" onclick="item.craft_alteration()">
        <img src="images/regal.png" onclick="item.craft_regal()">
        <img src="images/chaos.png" onclick="item.craft_chaos()" >
        <img src="images/exalt.png" onclick="item.craft_exalt()">
        <img src="images/divine.png" onclick="item.craft_divine()">
        <img src="images/scouring.png" onclick="item.craft_scouring()">
    </div>

    <ul id="item" class="normal">
        
        <div id="item_title">
            <li id="item_name"></li>
            <li id="item_category"></li>
        </div>
    
        <li id="item_quality"></li>
        <li id="item_armour"></li>
        <li id="item_evasion"></li>
        <li id="item_energy_shield"></li>

        <hr>
        <li id="item_level"></li>
        <li id="lvl_required"></li>
        <hr>
        <li class="mod" id="implicit"></li>
        <hr>
        <ul class = "mod" id="mod_list"></ul>
        <li id="flavour" class="flavour"></li>
    </ul>



    <script src="scripts/crafting.js"></script>
</body>
</html>