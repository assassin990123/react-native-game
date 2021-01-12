import { Router, Scene }    from 'react-native-router-flux';
import React                from 'react';

import CharacterConstructor from './components/HeroConstructer/HeroConstucter';
import RegistrationMenu     from './components/RegistrationMenu/RegistrationMenu';
import CreateCharacter      from './components/CreationCharacterMenu/CreationCharacterMenu';
import ShopComponent        from './components/ShopComponent';
import InventoryComponent   from './components/InventoryComponent';
import GameComponent        from './components/GameComponent/GameComponent';
import CharacterMenu        from './components/CharacterMenu/CharacterMenu';
import Headphones           from './components/Games/Headphones/Headphones';
import LogInMenu            from './components/LogInMenu/LogInMenu';
import Ducks                from './components/Games/Ducks/Ducks';
import Darts                from './components/Games/Darts/Darts';
import Tower                from './components/Games/Tower/Tower';
import Maze                 from './components/Games/Maze/Maze';

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "LogIn"                component = {LogInMenu}            hideNavBar = {true} title = "LogIn" />
         <Scene key = "SignIn"               component = {RegistrationMenu}     hideNavBar = {true} title = "SignIn" />
         <Scene key = "CharacterMenu"        component = {CharacterMenu}        hideNavBar = {true} title = "HeroMenu" />
         <Scene key = "CharacterConstructor" component = {CreateCharacter}      hideNavBar = {true} title = "Construct" />
         <Scene key = "CreateCharacter"      component = {CharacterConstructor} hideNavBar = {true} title = "Create" initial = {true}/>
         <Scene key = "GameComponent"        component = {GameComponent}        hideNavBar = {true} title = "Game" />
         <Scene key = "Shop"                 component = {ShopComponent}        hideNavBar = {true} title = "Shop"/>
         <Scene key = "Inventory"            component = {InventoryComponent}   hideNavBar = {true} title = "Inventory"  />
         <Scene key = "Darts"                component = {Darts}                hideNavBar = {true} title = "Darts" />
         <Scene key = "Ducks"                component = {Ducks}                hideNavBar = {true} title = "Ducks" />
         <Scene key = "Headphones"           component = {Headphones}           hideNavBar = {true} title = "Headphones"/>
         <Scene key = "Tower"                component = {Tower}                hideNavBar = {true} title = "Tower" />
         <Scene key = "Maze"                 component = {Maze}                 hideNavBar = {true} title = "Maze" />
      </Scene>
   </Router>
);

export default Routes;
