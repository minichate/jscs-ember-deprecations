# jscs-ember-deprecations

[![Build Status](https://travis-ci.org/minichate/jscs-ember-deprecations.svg?branch=master)](https://travis-ci.org/minichate/jscs-ember-deprecations)
[![Dependency Status](https://david-dm.org/minichate/jscs-ember-deprecations.svg)](https://david-dm.org/minichate/jscs-ember-deprecations)
[![devDependency Status](https://david-dm.org/minichate/jscs-ember-deprecations/dev-status.svg)](https://david-dm.org/minichate/jscs-ember-deprecations#info=devDependencies)

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
```

## Supported deprecations

### Deprecations added in Ember 1.11

 `disallowObjectController` will warn you if you use the deprecated Ember.ObjectController. See http://emberjs.com/deprecations/v1.x/#toc_objectcontroller for details.

 `disallowInstanceInInitializer` will warn you if you are looking up instances within an initializer. See http://emberjs.com/deprecations/v1.x/#toc_access-to-instances-in-initializers for details.

### Other Ember best practices

`disallowPrototypeExtension` will warn you if you are using `.property()` or `.observes()`. See http://guides.emberjs.com/v1.10.0/configuring-ember/disabling-prototype-extensions/#toc_functions for details.

# Licence

 This library is lovingly brought to you by @minichate. It is released under the MIT license.