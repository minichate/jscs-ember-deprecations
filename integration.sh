#!/bin/bash

OUTPUT=$(./node_modules/jscs/bin/jscs --config .integration_jscsrc -m -1 $@ | grep "internalError" | wc -l)

echo "${OUTPUT} deprecation warnings found"

if [ "$OUTPUT" -gt 0 ]; then
  exit 1
fi

exit 0
