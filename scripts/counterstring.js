/*
Copyright 2018 Sebastian Lindholm

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

(function() {
  'use strict';

  var app = {
    isLoading: true,
    visibleCards: {},
    selectedStrings: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container'),
    infoDialog: document.querySelector('.dialog-info'),
    helpDialog: document.querySelector('.dialog-help'),
  };

  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  document.getElementById('butInfo').addEventListener('click', function() {
    app.hideDialog();
    app.toggleInfoDialog(true);
  });

  document.getElementById('butHelp').addEventListener('click', function() {
    app.hideDialog();
    app.toggleHelpDialog(true);
  });

  document.getElementById('butAdd').addEventListener('click', function() {
    // Open/show the add new string dialog
    app.hideDialog();
    app.toggleAddDialog(true);
  });

  document.getElementById('butAddString').addEventListener('click', function() {
    // Add the newly selected string

    var length = document.getElementById('inputLength').value;
    var divider = document.getElementById('inputDivider').value;
    var key = length+divider
    var data = [length, divider]

    if (!app.selectedStrings) {
      app.selectedStrings = [];
    }

    app.getCounterString(key, data);
    app.updateCounterStrings(key, data);
    app.hideDialog();

  });

  document.getElementById('butAddCancel').addEventListener('click', function() {
    // Close the add new string dialog
    app.toggleAddDialog(false);
  });

  document.getElementById('butInfoOk').addEventListener('click', function() {
    // Close the info dialog
    app.toggleInfoDialog(false);
  });

  document.getElementById('butHelpOk').addEventListener('click', function() {
    // Close the info dialog
    app.toggleHelpDialog(false);
  });

  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/
   app.hideDialog = function() {
     app.toggleInfoDialog(false);
     app.toggleAddDialog(false);
     app.toggleHelpDialog(false);
   }

  // Toggles the visibility of the add new string dialog.
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  // Toggles the visibility of the help dialog.
  app.toggleHelpDialog = function(visible) {
    if (visible) {
      app.helpDialog.classList.add('dialog-help--visible');
    } else {
      app.helpDialog.classList.remove('dialog-help--visible');
    }
  };

  // Toggles the visibility of the info dialog.
  app.toggleInfoDialog = function(visible) {
    if (visible) {
      app.infoDialog.classList.add('dialog-info--visible');
    } else {
      app.infoDialog.classList.remove('dialog-info--visible');
    }
  };

  // Save list of strings to localStorage.
  app.saveSelectedStrings = function() {
    var selectedStrings = JSON.stringify(app.selectedStrings);
    localStorage.selectedStrings = selectedStrings;
  };

  // Adds card with counterstring
  app.updateCounterStrings = function(key, data) {
    var key = key;
    var length = data[0];
    var divider = data[1];

    var card = app.visibleCards[key];
    if (!card) {
      var cstring = app.generateString(key, data);
      card = app.cardTemplate.cloneNode(true);
      card.classList.remove('cardTemplate');
      card.querySelector('.cstring').textContent = cstring;
      card.querySelector('.description .length').textContent = length;
      card.querySelector('.description .divider').textContent = divider;
      card.removeAttribute('hidden');
      app.container.appendChild(card);
      app.visibleCards[key] = card;
    }
  };
  //};

  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

   app.getCounterString = function(key, label) {

   };

   app.reverseString = function(str) {
     var strArray = str.split("");
     strArray.reverse();

     var strReverse = strArray.join("");

     return strReverse;
   };

   app.generateString = function(key, data) {
     var targetLength = data[0];
     var divider = data[1];

     var length = 0;
     var cstring = "";
     var position = 0;
     var number = "";
     var numberPosition = 0;

     while(cstring.length < targetLength){
       position = targetLength-length;
       number = position.toString();
       numberPosition = number.length;

       cstring = cstring + app.reverseString(divider);
       if (cstring.length < targetLength) {
         cstring = cstring + app.reverseString((targetLength-cstring.length +
           divider.length).toString());
       }

       length++;
     }

     var finalString = app.reverseString(cstring)
     if(finalString.length > targetLength){
       finalString = finalString.substring(finalString.length - targetLength);
     }
     return finalString;

   };

})();
