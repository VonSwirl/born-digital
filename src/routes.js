import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Users = React.lazy(() => import('./views/Users/Users'))
const User = React.lazy(() => import('./views/Users/User'))
const CreateUser = React.lazy(() => import('./views/UserCreate/CreateUser'))
const SignIn = React.lazy(() => import('./views/FirebaseUI/FirebaseUI'))
const EditUser = React.lazy(() => import('./views/EditUser/EditUser'))
const ShowUser = React.lazy(() => import('./views/ShowUser/ShowUser'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/create-user', exact: true, name: 'Create User', component: CreateUser },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/sign-in', exact: true, name: 'Sign In', component: SignIn },
  { path: '/edit-user/:id', exact: true, name: 'Edit User', component: EditUser },
  { path: '/show-user/:id', exact: true, name: 'Show User', component: ShowUser }
]

export default routes
