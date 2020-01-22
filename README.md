# Redfin Gallery Challenge

This is a project prepared for Redfin Gallery Challenge. The project is live at [https://redfin.joedevcls.be/](https://redfin.joedevcls.be/)

The API for photos.json can be accessed at [https://redfin.joedevcls.be/photos.json](https://redfin.joedevcls.be/photos.json)

# Tech Stack

- **Vanilla JavaScript**: No framework is used in this project. No React, Angular or Vue. Instead, I'm using the native [shadow dom](https://www.webcomponents.org/introduction) API for creating and manipulating DOM. The native Fetch API is used for calling the API endpoint
- **ES6**: The project is written in ES6.
- **Webpack**: [Webpack](https://webpack.js.org/) is used as a static module bundler. I'm also using webpack-dev-server to provide Hot Module Replacement(HMR) to speed up development
- **AWS**: The final build is uploaded to AWS S3. I also have a custom CloudFront distribution setup so that the project is available behind CDN and custom domain [http://redfin.joedevcls.be/](http://redfin.joedevcls.be/). Also, here is the raw S3 link: [my-redfin-gallery-example-bucket.s3-website-us-east-1.amazonaws.com/](http://my-redfin-gallery-example-bucket.s3-website-us-east-1.amazonaws.com/)

# Available Commands

### Install development dependencies

```
yarn install
```

### Start Development with HMR

```
yarn start
```

### Build

```
yarn build
```

### Deploy

```
yarn deploy
```

# Possible Improvements

### Maintainability

- **Unit Test**: Currently the CI/CD pipeline is only checking if build is success for each commit. Ideally we should have unit test for every component and integrate it with CI/CD. However, because the web components community is not as big as those of React or Angulars, currently there is not many good unit test solutions. If it's a customer facing product, we should investigate more into unit test frameworks around web component/
- **End-to-End Test**: To make sure our build is working properly across browsers(e.g. Cypress.JS)
- **CSS-in-JS**: Currently the project is using inline styles. We could consider using scss or less. However, I often find external styles hard to maintain. For the purpose of maintainability, we should use CSS-in-JS. My suggestion is [emotion.js](https://emotion.sh/docs/introduction) for its friendly syntax and framework agnostic
- **Code Formatter**: Use tool like [Husky](https://github.com/typicode/husky) and [Prettier](https://prettier.io/) to ensure commited code are formatted correctly and consistently
- **State Management**: Because the project is tiny, I chose to call API and fetch data directly in component life cycle. This would become impossible for large projects. We should consider using a mature statement management technique such as Redux, MobX. Personally I'm a big fan of [Apollo GraphQL](https://www.apollographql.com/).

### Reusability

- **Shadow DOM**: The project uses shadow DOM for better reusability and mitigate the global nature of HTML, CSS and JS. Shadow DOM fixes CSS and DOM by instroducing scoped styles, with which we can bundle CSS with markup, hide implementation details and author self-contained components in vanilla js
- **Component registry**: the `customElements` global is used for defining element in the browser. the usage would be something like `window.customElements.define('your-custom-element', YourCustomCompnentClass)` and the component is defined using the ES2015 `class` which extends `HTMLElement`. I'm not seeing a common standard in terms of how to register the component. But registering and using component with string is clearly not scalable and should be an area for improvement

### Design

- **Save or Favor**: User should be able save or set favorite picture
- **Scrolling in full screen**: User should be able to go the next or previous image even in full screen mode
- **Pagination**: Display a huge amount of images at once is not ideal. We should have pagination logic
- **Accessibility**: Consider adding Accessible Rich Applications(ARIA) labels to the project for better accessibility

### Additional Technical Implementation

- **Progressive Image Loading**: When loading hi-res images, we should consider using progressive loading and lazy loading for better user experience even in low band-width network
- **Modern Image Format**: For such a image heavy site, we should consider adopting more advanced image format (e.g WebP). It helps loading speed and improved user experience and SEO
- **Server side rendering**: For the best performance and SEO, we can consider render the HTML markup in server-side
- **Transpiler(Babel)**: The current project does not have any external dependecies. However, for any large project, it would be impossible to have zero dependencies. A mature project should use webpack together with Babel for transpiling and bundling
