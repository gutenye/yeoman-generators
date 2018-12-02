export default function findRouteDeep(routes, path) {
  for (let route of routes) {
    if (route.routes) {
      const found = findRouteDeep(route.routes, path)
      if (found) {
        return found
      }
    } else {
      if (route.path === path) {
        // found
        return route
      }
    }
  }
  return null
}
