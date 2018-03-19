'use strict';

angular.module('insight.networks')
	.factory('Networks',
		function(Constants, siriusCoreLib) {
			return {
				getCurrentNetwork: function () {
					return siriusCoreLib.Networks.get(Constants.NETWORK);
				}
			}
		});
