# demagog-image-service

Proxy for fetching images from the legacy server.

![Schema](https://www.lucidchart.com/publicSegments/view/70c6e47e-41fb-445c-beb2-1fe7c96d4ed8/image.png)

## Install:

```sh
$ yarn install --pure-lockfile
```

## Building

```sh
$ yarn run tsc
```

## Configuration:

Configuration is done via ENV properties:

* *SERVER_URI* - target server (http://demagog.cz or http://demagog.sk)
* *PORT* - service port (default is `3001`)

## Running:

```sh
PORT=3000 SERVER_URI=http://demagog.cz node dist/index.js
```
HTTP server will be running on port 3000 proxying images from http://demagog.cz
