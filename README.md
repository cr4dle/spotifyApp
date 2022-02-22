# Spotify app


This is a simple app to display recently played tracks using Spotify API.

There are some areas that I would have approached differently in a production application. I have opted this way to showcase and overengineer the solution to demonstrate multiple skills. Due to limited time, I have included a "TODO" list with my next logical steps to follow.


## Features
- Grid view of recently played tracks.
- The grid view shows the image and track's title.
- Each recently played track is wrapped in a `Card` style.
- Pagination on recently played tracks.
- Side menu list with the recently played artist.
- Side menu artist click filters recently played tracks for that artist.
- Refresh prevail filter status (using query params).
- Automatically display currently playing track.
- Song preview is available when clicking on a song.
- Routes are controlled using middleware:
  - `guest` for unprotected view
  - `auth` for users that have logged in using their Spotify account
- Unknown routes display a `NotFound` page.
- Remember session using `localStorage`
- "Theme" colour.

## TODO
### General
- Move secrets out of `.env` files.
- Moving towards pure function to ease testing.
- Favour immutable as much as possible.
- Extract repeated logic into a `"util"`
- Give UI option to change the number of tracks displayed per page. There is a `constant` variable in place.
- Change logo.
- Containerised image (`Docker`).
- Create pipeline (`yml`).
- Bundle size improvements.
- Server-side rendering.

### Testing
- Increase unit test to 100% coverage.
- Create some business integration tests.

### Router
- Create `Vue.router` enum for each router name.
- Move API calls to `beforeEnter` router lifecycle instead of `Vue` `created` lifecycle.
- Improve security as it only checks a specific localStorage cookie exists. We could create a JWT token that the BackEnd signs. The check could be to:
  - check if the cookie exists.
  - token has been signed and valid.
  - the issuer is who we are expecting to be.
  - check the expiry token.
  - additional group checks (like guest, admin, etc)

### API
- `getProfile` is called on a `guest` route but it requires the user to be authenticated. I would need to create a specific component to encapsulate the logic and render it only when the `localStorage` cookie is present.

### Vuex
- Next step would be to take the above point and move it to `Vuex`.
- Vuex has not been utilised as the application is small. My next step would be to use `@provide` `@inject` and once the application grows more, I would start using `Vuex`.

### Features
- Use [`toastr`](https://www.npmjs.com/package/toastr) (or similar) to display feedback.
- Side menu filter when selecting an artist. I would like the filter to be paged. Unfortunately, I can't find a clean Spotify API to return that data. Currently, it does filtering per page on that artist.

### Styles
- Create `theme.scss` file to hold theme colours.
- Styles to be compatible with older browsers.

### Typescript
- Aim to avoid usage of `// @ts-ignore` and similars.
- I would change the rules set

---
## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your unit test and create a coverage

```
npm run coverage
```

### Lints and fixes files

```
npm run lint
```

### Format files

```
npm run format
```

### Customize configuration
