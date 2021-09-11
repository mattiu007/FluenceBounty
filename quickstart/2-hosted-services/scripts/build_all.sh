#!/usr/bin/env bash

mkdir -p artifacts
rm -f artifacts/*.wasm

cd hello-world
marine build --release
cp target/wasm32-wasi/release/hello_world.wasm ../artifacts/

cd ../counter
marine build --release
cp target/wasm32-wasi/release/hello_world.wasm ../artifacts/counter.wasm

cd ..
