'use strict';

angular.module('bbc.inline.edit', [])
    /**
     * @ngdoc object
     * @name bbc.inline.edit.bbcInlineEdit
     *
     * @description
     * Service for editing which allow reset the object and populates validation errors.
     *
     */
    .factory('bbcInlineEdit', function () {
        return function () {
            var pub = {},
                master = {};

            // the data
            pub.model = {};

            /**
             * Checks if the model has changes.
             *
             * @returns {boolean}
             */
            pub.isUnchanged = function () {
                return angular.equals(pub.model, master);
            };

            /**
             * Resets the model to the master.
             *
             * @param {object} model The current data.
             * @param {object} form The angularjs formcontroller.
             */
            pub.reset = function (form) {
                if (form) {
                    // reset form errors
                    form.errors = {};

                    // set form to pristine state
                    form.$setPristine();
                }

                // reset model
                pub.model = angular.copy(master);
            };

            /**
             * Sets the model.
             *
             * @param {object} model The model.
             */
            pub.setModel = function (model) {
                pub.model = model;
                master = angular.copy(model);
            };

            /**
             * Add server validation to form.
             *
             * @param {object} form The angularjs form controller.
             * @param {array} errors The validation errors.
             */
            pub.populateValidation = function (form, errors) {
                if (errors) {
                    form.errors = {};

                    for (var i = 0; i < errors.length; i++) {
                        form.errors[errors[i].property] = errors[i].attribute + ' ' + errors[i].message;
                    }
                }
            };

            return pub;
        };
    });