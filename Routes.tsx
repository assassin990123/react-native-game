import { Router, Scene } from 'react-native-router-flux';
import React from 'react';

import CharacterConstructor from './components/constructer/constructer';
import RegistrationMenu     from './components/registrationMenu/RegistrationMenu'
import CreateCharacter      from './components/creationCharacterMenu/creationCharacterMenu';
import GameComponent        from './components/gameComponent/gameComponent';
import CharacterMenu        from './components/characterMenu/chracterMenu';
import startMenu            from './components/startMenu/startMenu';

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "LogIn"                component = {startMenu}            hideNavBar = {true} title = "LogIn" initial = {true} />
         <Scene key = "SigIn"                component = {RegistrationMenu}     hideNavBar = {true} title = "SignIn" />
         <Scene key = "CharacterMenu"        component = {CharacterMenu}        hideNavBar = {true} title = "HeroMenu" />
         <Scene key = "CharacterConstructor" component = {CreateCharacter}      hideNavBar = {true} title = "Construct" />
         <Scene key = "CreateCharacter"      component = {CharacterConstructor} hideNavBar = {true} title = "Create" />
         <Scene key = "GameComponent"        component = {GameComponent}        hideNavBar = {true} title = "Game" />
      </Scene>
   </Router>
);

export default Routes;
