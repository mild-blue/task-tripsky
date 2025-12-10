## Architecture
I mainly wanted to keep the code minimalistic and efficient without any extra, flashy third-party libraries, etc. From my experience, such things add technical debt step-by-step and it is difficult to get rid of them, so I always think twice before installing new library.

- **Expo and Expo Router navigation** – Since I've did most of my coding on Nextjs where is routing done using /app folder and specific file names (page.tsx), I was looking for something that has similar structure and easy setup to start. Thans to this, I found Expo with its Expo Router and it seems like ideal combination for this task. Navigation is declarative and automatically serializes search params (e.g. `?q=cats`) so state is recovered when returning from details. Alternatives like manual state containers would require more boilerplate for the same behavior.
- **Hooks for data fetching** – `useRandomGif` encapsulates the 10s polling window, `useGifSearch` wraps search queries with react-query, and both expose a simple return shape to screens. This separates side effects from rendering and makes unit testing trivial.
- **Service + component layers** – `services/giphy.ts` centralizes axios calls, while `GifCard`, `GifImage`, and `SearchBar` deliver consistent UI across both screens. Adding new surfaces (e.g., favorites) would just reuse these pieces. If the project would start to get bigger, I would start doing specific folders for specific components. I can imagine GifCard and GifImage in one folder together.

## Third-Party Libraries

- **Expo + Expo Router** – Provides the RN runtime, bundler, and routing without configuring native projects manually.
- **@tanstack/react-query** – Handles caching, deduplication, retries, and background refetching so networking logic stays declarative.
- **axios** – Popular library, it was this or purely fetch but because we are using tests, I've decided for Axios since it is easier to mock.
- **react-native-safe-area-context** – I found recommendations that it is a good practice to use this, so I did. Ensures content isn't clipped by notches/home indicators on iOS/Android.
- **jest / jest-expo** – Supplies RN-aware test environment. `tests/giphy.test.ts`, `tests/useGifSearch.test.ts`, and `tests/ratingFilter.test.ts` verify service, hooks, and rating helpers.

## Design Decisions & Trade-offs

- **URL params for state retention** – Storing the search term in the route kept deep links and back-navigation in sync without adding global state.
- **Manual polling control** – React Query's `refetchInterval` doesn't pause mid-cycle when you toggle `enabled` to false, so it would continue firing network calls during the short "typing" window even though results are hidden. Implementing the 10-second timer with a vanilla `setInterval` lets the hook pause immediately whenever the user enters ≥2 characters, resume without duplicating requests, and keep ownership of the previously fetched GIF so there's no flashing or cache invalidation when search mode toggles back off.

## Possible improvements

- **React Query driven polling** – Revisit `useRandomGif` once Expo Router + React Query play nicely with conditional refetching. A shared cache would allow the random card to instantly render on other screens, but today it would require extra guards to stop background calls.
- **Optimistic navigation** – Preload GIF details (or reuse the search payload) when tapping a result to avoid the short loading state on the detail screen; a small React Query mutation or local cache would handle this.
- **Styling system** – As the screen count grows, migrate from local `StyleSheet` definitions to a centralized theme (Tailwind RN, Dripsy, or a simple design tokens module) to keep spacing/colors consistent.