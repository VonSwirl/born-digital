export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      }
    },
    {
      name: 'Sign In',
      url: '/sign-in',
      icon: 'icon-user-follow',
      badge: {
        variant: 'info'
      }
    },
    {
      name: 'Create User',
      url: '/create-user',
      icon: 'icon-user-follow',
      badge: {
        variant: 'info'
      }
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Tables',
          url: '/base/tables',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell'
        }
      ]
    }
  ]
}
