#!/bin/bash

# Setup script for initializing the analytics-sdk package

# Create directories if they don't exist
mkdir -p src/core src/types src/utils src/__tests__ examples dist

# Install dependencies
npm install

# Create initial files
echo "Setting up the package..."

# Run build and tests
npm run build
npm test

echo "Setup complete! 🎉"
echo "To start development:"
echo "  npm run dev"
echo ""
echo "To build the package:"
echo "  npm run build"
echo ""
echo "To publish to NPM:"
echo "  npm publish" 