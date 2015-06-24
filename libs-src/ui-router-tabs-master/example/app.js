'use strict';

var app = angular.module('example', [
  'ui.router',
  'ui.bootstrap',
  'ui.router.tabs'
]);

app.config(function($stateProvider) {
  $stateProvider.state('user', {
    url:         '',
    controller: 'ExampleCtrl',
    templateUrl: 'example.html'
  }).state('user.accounts', {
    url:         '/user/accounts',
    templateUrl: 'user/accounts.html'
  }).state('user.settings', {
    url:         '/user/settings',
    controller: 'SettingsCtrl',
    templateUrl: 'user/settings/settings.html'
  }).state('user.settings.one', {
    url:         '/user/settings/one',
    template: '<div>Settings nested route 1</div>'
  }).state('user.settings.two', {
    url:         '/user/settings/two',
    template: '<div>Settings nested route 2</div>'
  });
});
