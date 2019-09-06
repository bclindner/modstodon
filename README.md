# Modstodon

Modstodon is a super simple app for handling Mastodon reports! Log in, list out your instance's unresolved reports and act on any them as necessary, refresh and repeat ad infinitum.

## Technical Details

Modstodon is a React Native application. Partly to push to both platforms, but mostly because I'm a lazy web developer that just needs an app to handle reports.

* `redux` and `react-redux` is used to store and handle global app information.
* `redux-persist` handles saving auth data.
* `redux-thunk` is used for handling API actions in Redux.
* `react-native-paper` is used for almost all of the UI.
* `react-native-htmlview` is used to render HTML posts.
* `react-native-vector-icons` is used for the occasional icon or two, as required by `react-native-paper` when you want to use icons in their components.
* `react-navigation` is used to more elegantly handle routing in the app.
* `react-native-app-auth` is used for handling OAuth authorization.
* `axios` is used to make API requests.
* `url` is used to resolve API paths and and validate instance URLs.
* `querystring` is used to safely generate query string parameters.
* `moment` is used for parsing out dates and displaying them in a more human-readable format.
* `prop-types` is used for obvious reasons.

Other dependencies are sub-dependencies or were included with the react-native-cli toolchain.

## Maintainers

This is currently solely maintained by me,
[@bclindner@mastodon.technology](http://mastodon.technology/@bclindner), for myself and my mod/admin friends at Mastodon.

## Bugs

Got bugs or a feature request? File them as a GitHub issue and I'll address them when I can.

## Contributing

Want to contribute? Just use Prettier and follow best practices, and drop in a PR. I'm not exactly a professional PO/lead, but I'll do everything I can to keep the code here decently clean. 
