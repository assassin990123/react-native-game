import { Router, Scene } from 'react-native-router-flux';
import React from 'react';

import CharacterConstructor from './components/HeroConstructer/HeroConstucter';
import RegistrationMenu     from './components/RegistrationMenu/RegistrationMenu';
import CreateCharacter      from './components/CreationCharacterMenu/CreationCharacterMenu';
import ShopComponent        from './components/ShopComponent/ShopComponent';
import GameComponent        from './components/GameComponent/GameComponent';
import CharacterMenu        from './components/CharacterMenu/CharacterMenu';
import LogInMenu            from './components/LogInMenu/LogInMenu';

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "LogIn"                component = {LogInMenu}            hideNavBar = {true} title = "LogIn" initial = {true} />
         <Scene key = "SigIn"                component = {RegistrationMenu}     hideNavBar = {true} title = "SignIn" />
         <Scene key = "CharacterMenu"        component = {CharacterMenu}        hideNavBar = {true} title = "HeroMenu" />
         <Scene key = "CharacterConstructor" component = {CreateCharacter}      hideNavBar = {true} title = "Construct" />
         <Scene key = "CreateCharacter"      component = {CharacterConstructor} hideNavBar = {true} title = "Create" />
         <Scene key = "GameComponent"        component = {GameComponent}        hideNavBar = {true} title = "Game" />
         <Scene key = "Shop"                 component = {ShopComponent}        hideNavBar = {true} title = "Shop" />
      </Scene>
   </Router>
);

export default Routes;
