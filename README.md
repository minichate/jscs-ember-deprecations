# jscs-ember-deprecations

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

# Licence

 This library is lovingly brought to you by @minichate. It is released under the MIT license.