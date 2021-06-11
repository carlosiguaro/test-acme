import { Route, View } from '../setup/routes'

Route.set('/', View.Sigin);

Route.set(['auth'], [
    ['/home', View.Home],
    ['/manage-dashboard', View.RegisterDashboard],
]);





export { Route };