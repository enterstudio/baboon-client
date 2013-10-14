/*global angular, describe, beforeEach, inject, it, expect, spyOn */
describe('lxPager', function () {
    var element, compile, scope;

    beforeEach(module('lx.pager'));

    beforeEach(inject(function ($compile, $rootScope) {
        compile = $compile;

        // init scope
        scope = $rootScope.$new();
        scope.count = 10;
        scope.getData = function (pagingOptions) {
            console.log(pagingOptions);
        };

        spyOn(scope, 'getData');

        // create pager element
        element = angular.element('<lx-pager count="count" current-page="currentPage" page-sizes="[1, 5, 10]" on-paging="getData(pagingOptions)"></lx-pager>');
        compile(element)(scope);
        scope.$digest();
    }));

    it('should be initialized correctly', function () {
        var elementScope = element.scope();

        expect(elementScope.count).toBe(0);
        expect(elementScope.currentPage).toBe(1);
        expect(scope.getData).not.toHaveBeenCalled();

        setTimeout(function () {
            expect(elementScope.pageSize).toBe(10);
            expect(elementScope.pageSizeOptions).toEqual([1, 5, 10]);
            expect(scope.getData).not.toHaveBeenCalled();
        }, 750);
    });

    it('should use the default page-Sizes if the page-Sizes injected through the attrs are no array', function () {
        element = angular.element('<lx-pager count="count" current-page="currentPage" page-sizes="23" on-paging="getData(pagingOptions)"></lx-pager>');
        compile(element)(scope);
        scope.$digest();
        var elementScope = element.scope();

        setTimeout(function () {
            expect(elementScope.pageSizeOptions).toEqual([1, 5, 10, 25, 100]);
        }, 750);
    });

    it('should use the pageSize attribute when specified', function () {
        element = angular.element('<lx-pager count="count" current-page="currentPage" page-size="50" on-paging="getData(pagingOptions)"></lx-pager>');
        compile(element)(scope);
        scope.$digest();
        var elementScope = element.scope();

        setTimeout(function () {
            expect(elementScope.pageSizeOptions).toEqual([1, 5, 10, 25, 50, 100]);
            expect(elementScope.pageSize).toBe(50);
            expect(scope.getData).toHaveBeenCalled();
        }, 750);
    });

    it('should parse the page-Sizes if the page-Sizes injected through the attrs is a ng-model', function () {
        scope.pages = [1, 2, 3];
        element = angular.element('<lx-pager count="count" current-page="currentPage" page-sizes="{{ pages }}" on-paging="getData(pagingOptions)"></lx-pager>');
        compile(element)(scope);
        scope.$digest();
        var elementScope = element.scope();

        setTimeout(function () {
            expect(elementScope.pageSizeOptions).toEqual([1, 2, 3]);
        }, 1200);
    });

    it('should have a function skip() which returns the skip value', function () {
        var elementScope = element.scope();

        expect(elementScope.skip()).toBe(0);

        elementScope.currentPage = 5;

        expect(elementScope.skip()).toBe(40);

        elementScope.pageSize = 1;

        expect(elementScope.skip()).toBe(4);
    });

    it('should have a function numberOfPages() which returns number of pages', function () {
        var elementScope = element.scope();

        expect(elementScope.numberOfPages()).toBe(0);

        elementScope.count = 5;

        expect(elementScope.numberOfPages()).toBe(1);

        elementScope.pageSize = 0;

        expect(elementScope.numberOfPages()).toBe(5);
    });

    it('should have a function getOptions() which returns the paging options', function () {
        var elementScope = element.scope();

        expect(elementScope.getOptions()).toEqual({limit: 10, skip: 0});

        elementScope.pageSize = 3;

        expect(elementScope.getOptions()).toEqual({limit: 3, skip: 0});

        elementScope.currentPage = 5;

        expect(elementScope.getOptions()).toEqual({limit: 3, skip: 12});
    });

    it('should have a function nextPage() which should page to the next page', function () {
        var elementScope = element.scope();
        elementScope.nextPage();
        expect(elementScope.currentPage).toBe(1);

        elementScope.count = 50;
        elementScope.nextPage();

        expect(elementScope.currentPage).toBe(2);
    });

    it('should have a function previousPage() which should page to the previousPage page', function () {
        var elementScope = element.scope();
        elementScope.previousPage();
        expect(elementScope.currentPage).toBe(1);

        elementScope.count = 50;
        elementScope.currentPage = 3;
        elementScope.previousPage();

        expect(elementScope.currentPage).toBe(2);
    });

    it('should have a function firstPage() which should page to the first page', function () {
        var elementScope = element.scope();
        elementScope.firstPage();
        expect(elementScope.currentPage).toBe(1);

        elementScope.count = 50;
        elementScope.currentPage = 3;
        elementScope.firstPage();

        expect(elementScope.currentPage).toBe(1);
    });

    it('should have a function lastPage() which should page to the last page', function () {
        var elementScope = element.scope();

        elementScope.lastPage();
        expect(elementScope.currentPage).toBe(1);

        elementScope.count = 50;
        elementScope.currentPage = 3;
        elementScope.lastPage();

        expect(elementScope.currentPage).toBe(5);
    });

    it('should change the number of pages', function () {
        var elementScope = element.scope();

        expect(elementScope.numberOfPages()).toBe(0);
        elementScope.count = 19;

        expect(elementScope.numberOfPages()).toBe(2);
        elementScope.currentPage = 3;
        elementScope.count = 2;

        setTimeout(function () {
            expect(elementScope.currentPage).toBe(1);
        }, 750);
    });

    describe('has a function refresh() which', function () {
        it('should call the controller function', function () {
            var elementScope = element.scope();
            var spy = scope.getData;
            elementScope.refresh();

            setTimeout(function () {
                expect(spy).toHaveBeenCalled();
            }, 750);
        });

        it('should refresh the data when the pageSize changes', function () {
            var elementScope = element.scope();
            spyOn(elementScope, 'refresh');
            var spy = elementScope.refresh;
            elementScope.pageSize = 7;

            setTimeout(function () {
                expect(spy).toHaveBeenCalled();
                expect(spy.calls.length).toEqual(1);
            }, 500);
        });

        it('should refresh the data when the count changes', function () {
            var elementScope = element.scope();
            elementScope.currentPage = 99;
            elementScope.count = 20;

            setTimeout(function () {
                expect(elementScope.numberOfPages()).toBe(4);
                expect(elementScope.currentPage).toBe(4);
                expect(elementScope.refresh).toHaveBeenCalled();
                expect(elementScope.refresh.calls.length).toEqual(1);
            }, 500);
        });

        it('should not refresh the data when the count changes but the current page is smaller than the number of pages', function () {
            var elementScope = element.scope();
            spyOn(elementScope, 'refresh');
            var spy = elementScope.refresh;
            elementScope.count = 7;

            setTimeout(function () {
                expect(spy).not.toHaveBeenCalled();
                expect(spy.calls.length).toEqual(0);
            }, 750);
        });

        it('should refresh the data when thr current page is changed', function () {
            var elementScope = element.scope();
            spyOn(elementScope, 'refresh');
            var spy = elementScope.refresh;
            scope.currentPage = 55;

            setTimeout(function () {
                expect(spy).toHaveBeenCalled();
                expect(spy.calls.length).toEqual(1);
            }, 500);
        });
    });
});