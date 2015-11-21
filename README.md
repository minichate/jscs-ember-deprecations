# jscs-ember-deprecations

[![Build Status](https://travis-ci.org/minichate/jscs-ember-deprecations.svg?branch=master)](https://travis-ci.org/minichate/jscs-ember-deprecations)
[![Dependency Status](https://david-dm.org/minichate/jscs-ember-deprecations.svg)](https://david-dm.org/minichate/jscs-ember-deprecations)
[![devDependency Status](https://david-dm.org/minichate/jscs-ember-deprecations/dev-status.svg)](https://david-dm.org/minichate/jscs-ember-deprecations#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/minichate/jscs-ember-deprecations/badge.svg?branch=master&service=github)](https://coveralls.io/github/minichate/jscs-ember-deprecations?branch=master)

This plugin extends JSCS to include errors for features that are deprecated in Ember.js

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

See [Supported deprecations](#supported-deprecations) for valid keys

## Why

Migrating to a newer Ember version can be tricky if you haven't already gone back and removed all uses of deprecated features. Instead, this plugin intends to enable a migration path in a codebase, where developers can be warned when they use deprecated features.

A sample use case is to:

- Use a tool like [Lint Review](https://github.com/markstory/lint-review) to automagically annotate pull requests. Developers will be warned if they're using a feature that is deprecated. Put these "aspirational" rules in `.toolbot_jscsrc`
- Use `broccoli-jscs` so that JSCS gets run at the same time you're running unit tests. Put rules that are "mandatory" in your codebase's `.jscsrc`. Any violations of those rules will result in the test suite failing.

This way a codebase can be gradually brought into compliance over time.

## Supported deprecations

### Deprecations added in Ember 1.11

`disallowObjectController` will warn you if you use the deprecated `Ember.ObjectController`. See http://emberjs.com/deprecations/v1.x/#toc_objectcontroller for details.

`disallowInstanceInInitializer` will warn you if you are looking up instances within an initializer. See http://emberjs.com/deprecations/v1.x/#toc_access-to-instances-in-initializers for details.

### Deprecations added in Ember 1.12

`disallowCoreView` will warn you if you use the deprecated `Ember.CoreView`. See https://github.com/emberjs/ember.js/pull/10585 for details.

`disallowEmberTryCatch` will warn you if you use the deprecated `Ember.tryCatch` or `Ember.tryCatchFinally` helpers. See https://github.com/emberjs/ember.js/pull/10667 for details.

`disallowEmberRequired` will warn you if you use the deprecated `Ember.required()` helper. See https://github.com/emberjs/ember.js/pull/10668 for details.

### Deprecations added in Ember 1.13

`disallowAtEachLeafNode` will warn you if you use the deprecated `foo.@each` notation. See https://github.com/emberjs/ember.js/pull/11994 for details.

`disallowArrayComputed` will warn you if you use the deprecated `Ember.ArrayComputedProperty` or `Ember.arrayComputed()`. See https://github.com/emberjs/ember.js/pull/11403 for details.

`disallowReduceComputed` will warn you if you use the deprecated `Ember.ReduceComputedProperty` or `Ember.reduceComputed()`. See https://github.com/emberjs/ember.js/pull/11403 for details.

`disallowEmberCreate` will warn you if you use the deprecated `Ember.create()` function. See http://emberjs.com/deprecations/v1.x/#toc_ember-create for details.

`disallowEmberKeys` will warn you if you use the deprecated `Ember.keys()` function. See http://emberjs.com/deprecations/v1.x/#toc_ember-keys for details.

`disallowEmberOneway` will warn you if you use the deprecated `Ember.oneWay()` function. See http://emberjs.com/deprecations/v1.x/#toc_ember-oneway for details.

### Other Ember best practices

`disallowPrototypeExtension` will warn you if you are using `.property()`, `.observes()` or `observesBefore()`. See http://guides.emberjs.com/v1.10.0/configuring-ember/disabling-prototype-extensions/#toc_functions for details.

# Licence

This library is lovingly brought to you by @minichate. It is released under the MIT license.