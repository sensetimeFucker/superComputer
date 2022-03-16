import Index from '../pages/Index.vue'
import City from '../pages/City.vue'
import Parrots from '../pages/Children/Parrots.vue'
const routers = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/city/:id',
    name: 'city',
    component: City
  },
  {
    path: '/parrots',
    name: 'Parrots',
    component: Parrots
  },
  {
    path: '/test',
    component: () => import('@/pages/Test')
  }
];

export default routers
