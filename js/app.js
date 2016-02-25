/**
* ScubaBrain AngularJS Application
*
**/
angular.module('scubabrain', ['ionic', 'scubabrain.controllers', 'scubabrain.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent' :{
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.disclaimer', {
      url: '/disclaimer',
      views: {
        'menuContent' :{
          templateUrl: 'templates/disclaimer.html',
          controller: 'DisclaimerCtrl'
        }
      }
    })

    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent' :{
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })

    .state('app.emergency-contacts', {
      url: '/emergency-contacts',
      views: {
        'menuContent' :{
          templateUrl: 'templates/emergency-contacts.html',
          controller: 'EmergencyContactsCtrl'
        }
      }
    })

    .state('app.nitrox-ead', {
      url: '/nitrox-ead',
      views: {
        'menuContent' :{
          templateUrl: 'templates/nitrox-ead.html',
          controller: 'NitroxEadCtrl'
        }
      }
    })

    .state('app.maxdepth', {
      url: '/max-depth',
      views: {
        'menuContent' :{
          templateUrl: 'templates/max-depth.html',
          controller: 'MaxDepthCtrl'
        }
      }
    })

    .state('app.partial-pressure', {
      url: '/partial-pressure',
      views: {
        'menuContent' :{
          templateUrl: 'templates/partial-pressure.html',
          controller: 'PartialPressureCtrl'
        }
      }
    }) 

    .state('app.maxdepthtable', {
      url: '/max-depth-table',
      views: {
        'menuContent' :{
          templateUrl: 'templates/max-depth-table.html',
          controller: 'MaxDepthTableCtrl'
        }
      }
    })    

    .state('app.bar-psi', {
      url: '/bar-psi',
      views: {
        'menuContent' :{
          templateUrl: 'templates/bar-psi.html',
          controller: 'BarPsiCtrl'
        }
      }
    })  

    .state('app.feet-metres', {
      url: '/feet-metres',
      views: {
        'menuContent' :{
          templateUrl: 'templates/feet-metres.html',
          controller: 'FeetMetresCtrl'
        }
      }
    })   
    /** Start the miscellanous static pages **/

  // Default route (used as a fallback should the request not match any of the defined routes)
  $urlRouterProvider.otherwise('/app/home');
});
