/*global angular*/

/*---------------------------bar---------------------------*/
angular.module('lxNav/tpls/lxnavbar/outer.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('lxNav/tpls/lxnavbar/outer.html',
        '<ul class="nav {{type}}">\n' +
            '<li class="{{data.hide}}" ng-class="{active: $uiRoute, dropdown: data.children.length}" ui-route="{{data[linkAttr]}}" ng-repeat="data in treeData"  ng-include="\'lxNav/tpls/lxnavbar/inner.html\'"></li>\n' +
            '</ul>');
}]);

angular.module('lxNav/tpls/lxnavbar/inner.html', []).run(['$templateCache', function ($templateCache) { //
    $templateCache.put('lxNav/tpls/lxnavbar/inner.html',
        '<a ng-href="{{data[linkAttr]}}" ui-if="!data.children.length" target="_self" translate>{{data[labelAttr]}} <b class="caret" ui-if="data.children.length"></b></a>\n' +
            '<a ng-href="{{data[linkAttr]}}" ui-if="data.children.length" class="dropdown-toggle" translate>{{data[labelAttr]}} <b class="caret" ui-if="data.children.length"></b></a>\n' +
            '<ul class="dropdown-menu" ui-if="data.children.length">\n' +
            '<li ng-class="{ \'dropdown-submenu\' : data.children.length}" ng-repeat="data in data.children" ng-include="\'lxNav/tpls/lxnavbar/inner.html\'">\n' +
            '</li>\n' +
            '</ul> ');
}]);
/*---------------------------tree---------------------------*/

angular.module('lxNav/tpls/lxtreeview/outer.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('lxNav/tpls/lxtreeview/outer.html',
        '<ul>\n' +
            '<li ng-repeat="data in treeData"  ng-include="\'lxNav/tpls/lxtreeview/inner.html\'"></li>\n' +
            '</ul>');
}]);

angular.module('lxNav/tpls/lxtreeview/inner.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('lxNav/tpls/lxtreeview/inner.html',
        '<div class="list-item"  ng-class="{active: $uiRoute}" ui-route="{{data[linkAttr]}}">\n' +
            '<div class="opensub {{data.hide}}" ng-show="data.children" ng-click="toggleShow(data)"></div>\n' +
            '<div class="nav-icon {{data[iconAttr]}}"></div>\n' +
            '<a ui-if="!ngClickable" ng-href="{{data[linkAttr]}}"><span translate>{{data[labelAttr]}}</span></a>\n' +
            '<a ui-if="ngClickable" ng-click="methodAttr({name: data[linkAttr]})"><span translate>{{data[labelAttr]}}</span></a>\n' +
            '</div>\n' +
            '<ul class="display {{data.hide}}" ui-if="data.children.length">\n' +
            '<li ng-repeat="data in data.children" ng-include="\'lxNav/tpls/lxtreeview/inner.html\'">\n' +
            '</li>\n' +
            '</ul> ');
}]);
