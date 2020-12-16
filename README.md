# Vidar

[![](https://img.shields.io/npm/v/vidar)](https://www.npmjs.com/package/vidar)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fclabe45%2Fvidar%2Fbadge&style=flat)](https://actions-badge.atrox.dev/clabe45/vidar/goto)

> A video editor for developers

![Screenshot](screenshots/2019-08-17_0.png)

Vidar is a completely in-browser video-editing framework. Similar to GUI-based video-editing software, it lets you layer media and other content on a timeline. Audio, image, video and other tracks are supported, along with powerful video and audio manipulation to existing tracks. Being very flexible and extendable, you can choose to only use the core components or define your own.

## Features

- Export video to blob
- Write your own layers and effects
- Write a function for a property
- Keyframes
- Built-in hardware accelerated visual effects
- More coming soon

## Installation

```
npm install vidar
```

## Usage

You can use CommonJS syntax:
```js
import vd from 'vidar'
```

Or include it as a global `vd`:
```html
<script src="node_modules/vidar/dist/vidar-iife.js"></script>
```

Then, to create a movie (a Vidar "project")
```js
var movie = new vd.Movie(canvas);
```

Then, add layers
```js
movie
  // add a solid blue layer starting at 0s and lasting 3s and filling the entire screen
  .addLayer(new vd.layer.Visual(0, 3, {background: 'blue'}))
  // add a cropped video layer starting at 2.5s
  .addLayer(new vd.layer.Video(2.5, video, {mediaX: 10, mediaY: -25}));
```

Finally, start the movie
```js
movie.play();
```

## Further Reading

- [Documentation](https://clabe45.github.io/vidar)
- [Wiki (WIP)](https://github.com/clabe45/vidar/wiki)

## Contributing

See the [contributing guide](CONTRIBUTING.md)

## License

Distributed under GNU General Public License v3. See `LICENSE` for more information.
