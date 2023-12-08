#!/bin/sh
rm -r ../artfans/public/static
rsync -av ./build/static ../artfans/public/
cd ../artfans/public/static/js
mv *.chunk.js chunk.js
mv *.chunk.js.map chunk.js.map
mv main.*.js main.js
mv main.*.js.map main.js.map

cd ../css
mv main.*.css main.css
mv main.*.css.map main.css.map

