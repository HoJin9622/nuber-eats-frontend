import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import { Restaurants } from '../pages/client/restaurants'
import { Header } from '../components/header'
import { useMe } from '../hooks/useMe'
import { NotFound } from '../pages/404'
import { ConfirmEamil } from '../pages/user/confirm-email'
import { EditProfile } from '../pages/user/edit-profile'
import { Search } from '../pages/client/search'

const ClientRoutes = [
  <Route key={1} path='/' exact>
    <Restaurants />
  </Route>,
  <Route key={2} path='/confirm' exact>
    <ConfirmEamil />
  </Route>,
  <Route key={3} path='/edit-profile' exact>
    <EditProfile />
  </Route>,
  <Route key={3} path='/search'>
    <Search />
  </Route>,
]

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe()
  if (!data || loading || error) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className='font-medium text-xl tracking-wide'>Loading...</span>
      </div>
    )
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'Client' && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}
