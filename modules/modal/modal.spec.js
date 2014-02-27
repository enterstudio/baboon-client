'use strict';

describe('baboon message box', function () {
    var service, scope, $compile;

    beforeEach(function () {
        module('ui.bootstrap.modal');
        module('bbc.modal');
    });

    describe('bbcModal', function () {
        beforeEach(function () {
            inject(function ($injector, _$rootScope_, _$compile_, $templateCache) {
                service = $injector.get('bbcModal');
                scope = _$rootScope_;
                $compile = _$compile_;
                $templateCache.put('/baboon_msgBox/msgBox.html', '<p>Hello</p>');
            });
        });

        it('should be initialized correctly', function () {
            expect(service).toBeDefined();
//            expect(service.opts).toBeDefined();
//            expect(service.close).toBeDefined();
//            expect(service.msgBox).toBeDefined();
//            expect(service.ok).toBeDefined();
        });
//
//        it('should open the dialog and set the message and headline', function () {
//            service.msgBox('header', 'wayne');
//            expect(service.headline).toBe('header');
//            expect(service.message).toBe('wayne');
//            expect(service.type).toBe('info');
////            expect(service.actionOk).toBeUndefined();
////            expect(service.actionClose).toBeUndefined();
////            expect(service.actionYes).toBeUndefined();
////            expect(service.actionNo).toBeUndefined();
//        });
//
//        it('should open the dialog and set the type', function () {
//            service.msgBox('', '', 'Warning');
//
//            expect(service.headline).toBe('');
//            expect(service.message).toBe('');
//            expect(service.type).toBe('Warning');
//            expect(service.action).toBeUndefined();
//        });
//
//        it('should open the dialog and set the callback', function () {
//            service.msgBox('header', 'wayne', 'Info', function () {});
//
//            expect(service.headline).toBe('header');
//            expect(service.message).toBe('wayne');
//            expect(service.type).toBe('Info');
//            expect(service.action).toBeDefined();
//            expect(typeof service.action).toBe('function');
//        });
//
//        it('should close the dialog', function () {
//            service.close();
//
//            expect(service.message).toBe('');
//            expect(service.type).toBe('');
//            expect(service.action).toBeNull();
//        });
//
//        it('should close the dialog and do nothing when no action is defined', function () {
//            service.msgBox('header', 'wayne');
//            service.ok();
//
//            expect(service.headline).toBe('');
//            expect(service.message).toBe('');
//            expect(service.type).toBe('');
//            expect(service.action).toBeNull();
//        });
//
//        it('should close the dialog and execute the action if an action is defined', function () {
//            var test = 1,
//                testFn = function () {
//                    test++;
//                };
//
//            service.msgBox('', 'wayne', 'Info', testFn);
//
//            expect(service.action).toBeDefined();
//            expect(typeof service.action).toBe('function');
//
//            service.ok();
//
//            expect(service.message).toBe('');
//            expect(service.type).toBe('');
//            expect(service.action).toBeNull();
//            expect(test).toBe(2);
//        });
    });
});