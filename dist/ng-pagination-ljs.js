(function() {
	'use strict';

	angular.module('ng-pagination-ljs')
		.directive('ljsPagination', [

			'$window',

			function($window) {
				return{
					restrict: 'A',
					transclude: true,
    				replace: true,
					templateUrl: function(element, attrs) {
						return attrs.templateUrl;
					},
					scope:{
						config: '='
					},

					link: function(scope, element, attrs) {
						void 0;

						scope.paginationArray = scope.config.paginationArray;
						scope.itemsPerPage = scope.config.itemsPerPage;
						scope.currentPage = 1;
						scope.numberOfPages = function() {
							return Math.ceil(scope.paginationArray.length / scope.itemsPerPage);
						};
						scope.pageItems = [];
						scope.paginationNumberList = [];

						scope.nextPage = function(page) {
							if(page && scope.currentPage <= scope.numberOfPages()) {
								getPage(page);
								scope.currentPage = page;
								scrollTop();
							}else if(scope.currentPage < scope.numberOfPages()) {
								scope.currentPage++;
								getPage(scope.currentPage);
								scrollTop();
							}
						};

						scope.prevPage = function() {
							if(scope.currentPage > 1) {
								scope.currentPage--;
								getPage(scope.currentPage);
								scrollTop();
							}
						};

						function getPage(currentPage) {
							var end = (currentPage * scope.itemsPerPage);
							var start = (end - scope.itemsPerPage);
							void 0;

							scope.pageItems = scope.paginationArray.slice(start, end);

							void 0;
						}

						function getPaginationNumberList(currentPage) {
							for(var i = 0; i < scope.numberOfPages(); i++) {
								scope.paginationNumberList.push(currentPage + i);
							}
						}

						function scrollTop(){
							$window.scrollTo(0, element);
						}

						getPage(scope.currentPage);
						getPaginationNumberList(scope.currentPage);

						void 0;
						void 0;
					}
				};
			}
		]);

})();
