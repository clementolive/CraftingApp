<!DOCTYPE html>
<html>
<?php include "./header.html" ?>

<body>
    <?php include "./navbar.html" ?>

    <div class = searchbar><input type="text" id="search_input" onkeyup="search()" placeholder="Search.."></div>

    <ul id="mod_list"></ul>

    <table>
        <tr>
            <th>Name </th>
            <th>Description </th>
            <th>Category </th>
            
        </tr>
        <tr>
            <td> Rolling magma </td>
            <td> A rolling flame with a big explosion </td>  
            <td> Spell </td>
        </tr>
        <tr>
            <td> Fireball </td>  
            <td> A single burning flame </td>
            <td> Spell </td>
        </tr>
        <tr>
            <td> Spectral throw </td>  
            <td> A spectral copy of weapon </td>
            <td> Attack </td>
        </tr>

    <script src="scripts/mods.js"></script>
</body>
</html>