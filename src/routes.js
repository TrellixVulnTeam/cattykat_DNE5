import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

export default(
    <Route path="/" component={App} />
);
/*export default(
    <Route path="/" component={App}>
        <IndexRoute component={App} />
        <Route path="posts/new" component={PostsNew} />
        <Route path="posts/:id" component={PostsShow} />
    </Route>
);*/