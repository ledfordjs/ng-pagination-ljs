(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('ng-pagination-ljs.config', [])
      .value('ng-pagination-ljs.config', {
          debug: true
      });

  // Modules

  angular.module('ng-pagination-ljs.controllers', []);
  angular.module('ng-pagination-ljs', []);




  angular.module('ng-pagination-ljs',
      [
        'ng-pagination-ljs.controllers',
        'ng-pagination-ljs.config',
        'ng-pagination-ljs'
      ]);

})(angular);
