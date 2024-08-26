#!/bin/bash

# Ensure build-obfuscated directory exists
mkdir -p build-obfuscated

# Copy all assets except the JS directory
cp -r build/* build-obfuscated/

# Remove the static/js directory if it exists
rm -rf build-obfuscated/static/js/

# Recreate the js directory to prepare for the minified JS file
mkdir -p build-obfuscated/static/js