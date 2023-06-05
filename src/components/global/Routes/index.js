import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useRoutes } from '../../../core/hooks'

const Routes = () => {
    const routes = useRoutes()

    return (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={`route-${index}`}
                    path={route.path}
                    exact={true}
                    render={(props) => (
                        <route.component {...props}/>
                    )}
                />
            ))}
        </Switch>
    )
}

export default Routes
