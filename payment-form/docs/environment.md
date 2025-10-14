# Environment description

- create react app using create-react-app with TypeScript template -> [React](https://vite.dev/guide/)
- app is using service mocker -> [ServiceMocker](https://mswjs.io/) -> However app does not have BE
- code formatting and static code analysis are done with ESLint with Prettier plugin [ESLint](https://github.com/eslint/eslint) & [Prettier](https://github.com/prettier/eslint-plugin-prettier)
- integration and unit tests are done with Jest [Test](https://jestjs.io/)
- node version v22.0.0
- rect version v19.0.0
- mui components -> [MUI](https://mui.com/)
- state with redux -> [Redux](https://redux.js.org/)
- form hook -> [React Hook Form](https://react-hook-form.com/)
- form validation -> [Zod](https://zod.dev/)


#env

`.env.development`

- VITE_ENABLE_MOCKS = {true, false} - enables or disables mocks

both `.env.development` && `.env.production`

- VITE_IBAN_API_URL = {string} url for BE to check iban
- VITE_API_URL = {string} url for BE to get accounts and perform payments

`.env.test`

- VITE_API_URL = {string} url for BE to get accounts and perform payments