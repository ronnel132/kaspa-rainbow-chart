#!/bin/bash
# Copy all assets except the JS directory
cp -r build/* build-obfuscated/
rm -rf build-obfuscated/static/js/
mkdir -p build-obfuscated/static/js
