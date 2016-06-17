# bobonroast

> A place to record and keep track of your coffee roast profiles in real-time.

This is the codebase for [Bobon Profiles](https://roast.bobon.coffee)

## Prerequisite

Bobon Profiles is a React - Redux app built on top of a Firebase database.

### If you are developing a separate project from this (using a different database)

Create your own Firebase project. After that, update FIREBASE constant in `src/constants.js` with your own info.

Enable Google and Facebook authentication for the Firebase App.

## Development

```sh
$ npm install
$ npm run watch
```

After that, access the site at https://localhost:8080 (IMPORTANT: HTTPS, not HTTP - so we can use Firebase redirect authentication with Facebook and Google from the development site)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/nathandao/bobonroastprofile/issues)

## Author

**Nathan Dao**

* [github/nathandao](https://github.com/nathandao)
* [twitter/nathan_dao](http://twitter.com/nathan_dao)

## License

Copyright © 2016 [Nathan Dao](https://guynathan.com)
Licensed under the MIT license.
