import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumbs } from '@/base-ui/breadcrumb'
let firstMenu: any = null
export function mapMenuToRoutes(useMenus: RouteRecordRaw[]) {
  const routes: RouteRecordRaw[] = []
  //1 默认加载全部路由
  const allRoutes: RouteRecordRaw[] = []
  //文件上下文
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // key ---> ./src/main/product/goods
    // 一个个的模块
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  console.log(allRoutes)
  //2 属于menus的路由
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
        //第一条菜单 让空白路径能重定向
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(useMenus)

  return routes
}

// currentPath
/* export function pathToMenu(useMenus: any[], currentPath: string): any {
  for (const menu of useMenus) {
    if (menu.type === 1) {
      const findMenu = pathToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}
 */
export function pathToMenu(
  useMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumbs[]
): any {
  for (const menu of useMenus) {
    if (menu.type === 1) {
      const findMenu = pathToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        if (breadcrumbs) {
          breadcrumbs.push({ name: menu.name, path: menu.url })
          breadcrumbs.push({ name: findMenu.name, path: findMenu.url })
        }
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

//路径到面包屑
export function pathMapBreadcrumbs(useMenus: any[], currentPath: string): any {
  const Breadcrumbs: IBreadcrumbs[] = []
  pathToMenu(useMenus, currentPath, Breadcrumbs)
  return Breadcrumbs
}
//菜单映射权限
export function mapMenusToPermissions(useMenus: any[]): any {
  const permissions: string[] = []
  const _recurseGetPermissions = (useMenus: any[]) => {
    for (const item of useMenus) {
      if (item.type == 1 || item.type == 2) {
        _recurseGetPermissions(item.children ?? [])
      } else if (item.type == 3) {
        permissions.push(item.permission)
      }
    }
  }
  _recurseGetPermissions(useMenus)
  return permissions
}
//菜单映射到叶子结点，设置到 El-tree
export function menuMapLeafKeys(menusList: any[]): any {
  const leftKeys: number[] = []
  const _recurseGetLeaf = (menusList: any[]) => {
    for (const menu of menusList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menusList)
  return leftKeys
}

export { firstMenu }
