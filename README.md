# jscs-ember-deprecations

[![Build Status](https://travis-ci.org/minichate/jscs-ember-deprecations.svg?branch=master)](https://travis-ci.org/minichate/jscs-ember-deprecations)
[![Dependency Status](https://david-dm.org/minichate/jscs-ember-deprecations.svg)](https://david-dm.org/minichate/jscs-ember-deprecations)
[![devDependency Status](https://david-dm.org/minichate/jscs-ember-deprecations/dev-status.svg)](https://david-dm.org/minichate/jscs-ember-deprecations#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/minichate/jscs-ember-deprecations/badge.svg?branch=master&service=github)](https://coveralls.io/github/minichate/jscs-ember-deprecations?branch=master)

This is a JSCS plugin to include errors for features that are deprecated in Ember.js

## Installation

```bash
npm install jscs-ember-deprecations --save-dev
```

You'll also need to tell JSCS to load the plugin. Modify your `.jscsrc` file to include

```json
"plugins": [
  "jscs-ember-deprecations"
],
"disallowObjectController": true,
"disallowInstanceInInitializer": true,
"disallowPrototypeExtension": true,
"disallowAtEachLeafNode": true,
// ...
```

If you invoke JSCS with `--fix` (see http://jscs.info/overview#cli) some deprecation errors can be fixed automatically.

See [Supported deprecations](#supported-deprecations) for valid keys

## Why

Migrating to a newer Ember version can be tricky if you haven't already gone back and removed all uses of deprecated features. Instead, this plugin intends to enable a migration path in a codebase, where developers can be warned when they use deprecated features.

A sample use case is to:

- Use a tool like [Lint Review](https://github.com/markstory/lint-review) to automagically annotate pull requests. Developers will be warned if they're using a feature that is deprecated. Put these "aspirational" rules in `.toolbot_jscsrc`
- Use `broccoli-jscs` so that JSCS gets run at the same time you're running unit tests. Put rules that are "mandatory" in your codebase's `.jscsrc`. Any violations of those rules will result in the test suite failing.

This way a codebase can be gradually brought into compliance over time.

## Supported deprecations

### Deprecations added in Ember 1.11

- `disallowObjectController` will warn you if you use the deprecated `Ember.ObjectController`. See http://emberjs.com/deprecations/v1.x/#toc_objectcontroller for details.

- `disallowInstanceInInitializer` will warn you if you are looking up instances within an initializer. See http://emberjs.com/deprecations/v1.x/#toc_access-to-instances-in-initializers for details.

### Deprecations added in Ember 1.12

- `disallowCoreView` will warn you if you use the deprecated `Ember.CoreView`. See https://github.com/emberjs/ember.js/pull/10585 for details.

- `disallowEmberTryCatch` will warn you if you use the deprecated `Ember.tryCatch` or `Ember.tryCatchFinally` helpers. See https://github.com/emberjs/ember.js/pull/10667 for details.

- `disallowEmberRequired` will warn you if you use the deprecated `Ember.required()` helper. See https://github.com/emberjs/ember.js/pull/10668 for details.

- `disallowDualGetterSetter` will warn you if you use a dual setter/getter function argument to `Ember.computed()`. See http://emberjs.com/deprecations/v1.x/#toc_computed-properties-with-a-shared-getter-and-setter for details.

### Deprecations added in Ember 1.13

- `disallowAtEachLeafNode` will warn you if you use the deprecated `foo.@each` notation. See https://github.com/emberjs/ember.js/pull/11994 for details.

- `disallowArrayComputed` will warn you if you use the deprecated `Ember.ArrayComputedProperty` or `Ember.arrayComputed()`. See https://github.com/emberjs/ember.js/pull/11403 for details.

- `disallowReduceComputed` will warn you if you use the deprecated `Ember.ReduceComputedProperty` or `Ember.reduceComputed()`. See https://github.com/emberjs/ember.js/pull/11403 for details.

- `disallowEmberCreate` will warn you if you use the deprecated `Ember.create()` function. See http://emberjs.com/deprecations/v1.x/#toc_ember-create for details.

- `disallowEmberKeys` will warn you if you use the deprecated `Ember.keys()` function. See http://emberjs.com/deprecations/v1.x/#toc_ember-keys for details.

- `disallowEmberOneway` will warn you if you use the deprecated `Ember.oneWay()` function. See http://emberjs.com/deprecations/v1.x/#toc_ember-oneway for details.

- `disallowEmberView` will warn you if you use the deprecated `Ember.View`, `Ember.LinkView`, `Ember.Select`, `Ember.ContainerView`, or `Ember.CollectionView` classes. See http://emberjs.com/deprecations/v1.x/#toc_ember-view for details.

- `disallowPositionalParamsExtend` will warn you if you use `positionalParams`
within `.extend()` instead of setting it as a static property on the class
itself. See http://emberjs.com/deprecations/v1.x/#toc_set-code-positionalparams-code-as-a-static-property-on-the-class for details.

- `disallowBeforeObserver` will warn you if you use the deprecated `Ember.addBeforeObserver()`, `Ember.removeBeforeObserver()`, or `Ember.beforeObserversFor()` functions. Additionally, it will warn you if you use the deprecated `.observesBefore()` prototype extenion. Note that `.observesBefore()` is also deprecated in [disallowPrototypeExtension](#other-ember-best-practices). See http://emberjs.com/deprecations/v1.x/#toc_beforeobserver for details.

- `disallowImmediateObserver` will warn you if you use the deprecated `Ember.immediateObserver` helper. See http://emberjs.com/deprecations/v1.x/#toc_ember-immediateobserver for details.

- `disallowArrayController` will warn you if you use the deprecated `Ember.ArrayController`. See http://emberjs.com/deprecations/v1.x/#toc_arraycontroller for details.

- `disallowControllerNeeds` will warn you if you're doing dependency injection via the `needs` property on a controller. See http://emberjs.com/deprecations/v1.x/#toc_controller-needs for details.

- `disallowFreezableMixin` will warn you if you use the deprecated `Ember.Freezable` mixin. See http://emberjs.com/deprecations/v1.x/#toc_ember-freezeable for details.

- `disallowObserverArgumentOrdering` requires that `Ember.observer()` takes callable argument as the final argument. See http://emberjs.com/deprecations/v1.x/#toc_reversed-ember-observer-arguments for details.

- `disallowCreateWithMixins` will warn you if you use the deprecated `Ember.Object.createWithMixins` method. See http://emberjs.com/deprecations/v1.x/#toc_ember-createwithmixins for details.

- `disallowComputedAny` will warn you if you use the deprecated `Ember.computed.any()` helper. See http://emberjs.com/deprecations/v1.x/#toc_ember-computed-any for details.

- `disallowHandlebarsHelpers` will warn you if you use the deprecated `Ember.HTMLBars.makeBoundHelper()` or `Ember.Handlebars.registerHelper()` helpers. See http://emberjs.com/deprecations/v1.x/#toc_handlebars-htmlbars-helpers for details.

### Deprecations added in Ember 2.0

None. Ember 2.0 removed support for the above deprecations.

### Deprecations added in Ember 2.1

- `disallowInitializerArity` will warn you if you have more than 1 argument to an initializer. See http://emberjs.com/deprecations/v2.x/#toc_initializer-arity for details.

- `disallowPrivateRegistryProperty` will warn you if you use one of the private `app.registry.*` deprecations. See http://emberjs.com/deprecations/v2.x/#toc_ember-application-registry-ember-applicationinstance-registry for details.

- `disallowAppInstanceContainer` will warn you if you use the private `app.container.lookup()` depreprecation in an initializer. See http://emberjs.com/deprecations/v2.x/#toc_ember-applicationinstance-container for details.

- `disallowDebugMissingArguments` will warn you if you use one of the `Ember.warn()`, `Ember.deprecate()`, `Ember.deprecateFunc()` or `Ember.computed.deprecatingAlias()` function without passing in an options object that at a minimum contains an `id` property. See http://emberjs.com/deprecations/v2.x/#toc_ember-debug-function-options for details.

- `disallowDefaultLayout` will warn you if you use the `defaultLayout` property inside a Component. See http://emberjs.com/deprecations/v2.x/#toc_ember-component-defaultlayout for details.

- `disallowCurrentState` will warn you if you use the private `currentState` or `_currentState` property inside a Component. See http://emberjs.com/deprecations/v2.x/#toc_ember-component-currentstate for details.

### Other Ember best practices

- `disallowPrototypeExtension` will warn you if you are using `.property()`, `.observes()` or `observesBefore()`. See http://guides.emberjs.com/v1.10.0/configuring-ember/disabling-prototype-extensions/#toc_functions for details.

### Deprecations added in Ember 2.3

- `disallowInjectedContainerAccess` will warn you if you are using the injected container (`this.container`). See http://emberjs.com/deprecations/v2.x/#toc_injected-container-access for details.

# License

This library is lovingly brought to you by [@minichate](https://twitter.com/minichate). It is released under the MIT license.
