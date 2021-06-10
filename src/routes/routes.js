import { Route, View } from '../setup/routes'

Route.set('/', View.Sigin);

Route.set(['auth'], [
    ['/products', View.Products],
]);

export { Route };