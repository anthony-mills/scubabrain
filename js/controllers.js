angular.module('scubabrain.controllers', [])

.controller('AppCtrl', function( $scope ) {
})

.controller('HomeCtrl', function( $scope ) {

  var depthUnit = localStorage.getItem("depthUnit");

  if ( depthUnit == null || depthUnit.length === 0 ) {
    localStorage.setItem("depthUnit", "metric");

    console.log("Setting the depth unit to metric");
  } 
})

// Controller for the Emergency contacts page
.controller('EmergencyContactsCtrl', function( $scope) {
  
})

// Controller for the EAD depth page
.controller('NitroxEadCtrl', function( $scope, $state, nitroxCalculations ) {

    $scope.showForm = 1;
    $scope.depthUnit = localStorage.getItem("depthUnit");

    $scope.resetForm = function() {
      $scope.showForm = 1;

      $state.go($state.current, {}, { reload: true });
    }

    $scope.getEad = function(nitroxEad) {
      console.log(nitroxEad);
      $scope.mixEad = nitroxCalculations.mixEad(nitroxEad);
      $scope.showForm = 0;
    }
})

// Controller for the Partial Pressure calculator
.controller('PartialPressureCtrl', function( $scope, $state, nitroxCalculations ) { 

    $scope.showForm = 1;
    $scope.depthUnit = localStorage.getItem("depthUnit");

    $scope.resetForm = function() {
      $scope.showForm = 1;

      $state.go($state.current, {}, { reload: true });
    }

    $scope.partialPressure = function( inputValues ) {
      $scope.partialPressure = nitroxCalculations.partialPressure( inputValues );

      $scope.showForm = 0;
    }

})

// Controller for the max depth page
.controller('MaxDepthCtrl', function( $scope, $state, nitroxCalculations ) {

    $scope.showForm = 1;

    $scope.resetForm = function() {
      $scope.showForm = 1;

      $state.go($state.current, {}, { reload: true });
    }

    $scope.maxDepth = function(nitroxInput) {
      $scope.maxDepth = nitroxCalculations.maxDepth(nitroxInput);
      $scope.partialPressure = ( nitroxInput.pressure / 10 );
      $scope.nitroxMix = ( nitroxInput.mix * 100 );

      $scope.showForm = 0;
    }
})

// Controller for BAR - PSI page
.controller('BarPsiCtrl', function( $scope ) {

      $scope.convertBar = function( inputBar ) {        
        $scope.convertedBar = Math.round( inputBar * 14.5037738 );
      } 

      $scope.convertPsi = function( inputPsi ) {        
        $scope.convertedPsi = Math.round( inputPsi / 14.5037738 );
      }      
})

// Controller for Feet - Metres page
.controller('FeetMetresCtrl', function( $scope ) {

      $scope.convertMetres = function( inputMetres ) {        
        $scope.convertedMetres = Math.round( inputMetres * 3.2808399 );
      } 

      $scope.convertFeet = function( inputFeet ) {        
        $scope.convertedFeet = Math.round( inputFeet / 3.2808399 );
      }      
})

// Controller for the max depth page
.controller('MaxDepthTableCtrl', function( $scope, nitroxCalculations ) { 

      $scope.modData = nitroxCalculations.modTable();      
})

// Controller for the Disclaimer page
.controller('DisclaimerCtrl', function() {

})

// Controller for the Settings page
.controller('SettingsCtrl', function($scope) {

    var depthUnit = localStorage.getItem("depthUnit");

    if (depthUnit == "imperial") {
      $scope.depthUnit = true;
    } else {
      $scope.depthUnit = false;    
    }


    $scope.saveSettings = function(useImperial) {    
      if ( useImperial ) {
        localStorage.setItem("depthUnit", "imperial");
 
        console.log('Switching to imperial measurements');
      } else {
        localStorage.setItem("depthUnit", "metric");

        console.log('Switching to metric measurements');        
      }
    }
})

// Controller for the about page
.controller('AboutCtrl', function() {
 
})


