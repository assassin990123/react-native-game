import { Router, Scene }    from 'react-native-router-flux';
import React                from 'react';

import CharacterConstructor from './components/HeroConstructer/HeroConstucter';
import RegistrationMenu     from './components/registrationMenu/RegistrationMenu';
import CreateCharacter      from './components/creationCharacterMenu/CreationCharacterMenu';
import ShopComponent        from './components/ShopComponent/ShopComponent';
import GameComponent        from './components/gameComponent/GameComponent';
import CharacterMenu        from './components/characterMenu/CharacterMenu';
import Headphones           from "./components/games/headphones/Headphones";
import StartMenu            from './components/startMenu/StartMenu';
import Ducks                from './components/games/ducks/Ducks';
import Darts                from './components/games/darts/Darts';
import Tower                from './components/games/tower/Tower';

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "LogIn"                component = {StartMenu}            hideNavBar = {true} title = "LogIn"  />
         <Scene key = "SignIn"               component = {RegistrationMenu}     hideNavBar = {true} title = "SignIn" />
         <Scene key = "CharacterMenu"        component = {CharacterMenu}        hideNavBar = {true} title = "HeroMenu" />
         <Scene key = "CharacterConstructor" component = {CreateCharacter}      hideNavBar = {true} title = "Construct" />
         <Scene key = "CreateCharacter"      component = {CharacterConstructor} hideNavBar = {true} title = "Create" />
         <Scene key = "GameComponent"        component = {GameComponent}        hideNavBar = {true} title = "Game" />
         <Scene key = "Shop"                 component = {ShopComponent}        hideNavBar = {true} title = "Shop" />
         <Scene key = "Darts"                component = {Darts}                hideNavBar = {true} title = "Darts" />
         <Scene key = "Ducks"                component = {Ducks}                hideNavBar = {true} title = "Ducks" />
         <Scene key = "Headphones"           component = {Headphones}           hideNavBar = {true} title = "Headphones"/>
         <Scene key = "Tower"                component = {Tower}                hideNavBar = {true} title = "Tower" initial = {true}/>
      </Scene>
   </Router>
);

export default Routes;
