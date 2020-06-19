import { Router, Scene } from 'react-native-router-flux';
import React from 'react';

import CharacterConstructor from './components/constructer/constructer';
import CreateCharacter      from './components/creationCharacterMenu/creationCharacterMenu';
import CharacterMenu        from './components/characterMenu/chracterMenu';
import About                from './components/registrationMenu/RegistrationMenu'
import Home                 from './components/startMenu/startMenu';

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "LogIn"                component = {Home}                 hideNavBar = {true} title = "Home" initial = {true} />
         <Scene key = "SigIn"                component = {About}                hideNavBar = {true} title = "About" />
         <Scene key = "CharacterMenu"        component = {CharacterMenu}        hideNavBar = {true} title = "About" />
         <Scene key = "CharacterConstructor" component = {CreateCharacter}      hideNavBar = {true} title = "About" />
         <Scene key = "CreateCharacter"      component = {CharacterConstructor} hideNavBar = {true} title = "About" />
      </Scene>
   </Router>
);

export default Routes;