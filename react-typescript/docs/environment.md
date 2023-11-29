# Environment description

- create react app using create-react-app with TypeScript template -> [React](https://create-react-app.dev/docs/getting-started)
- app is using styled-components -> [StyledComponents](https://styled-components.com/)
- app is using service mocker -> [ServiceMocker](https://mswjs.io/) -> However app does not have BE
- app is using rtk query for api state -> [RTKQuery](https://redux-toolkit.js.org/rtk-query/overview)
- app is using slices from redux toolkit -> [RTKQuery](https://redux-toolkit.js.org/api/createSlice)
- code formatting and static code analysis are done with ESLint with Prettier plugin [ESLint](https://github.com/eslint/eslint) & [Prettier](https://github.com/prettier/eslint-plugin-prettier)
- integration and unit tests are done with React Testing Library [Test](https://testing-library.com/docs/)
- navigation is done with React Router [Router](https://reactrouter.com/en/main)
- node version v19.3.0
- rect version v18.2.0
- ui component library [MUI](https://mui.com)

#env

`.env.development`

- REACT_APP_ENABLE_MOCKS = {true, false} - enables or disables mocks
