
export interface RouteRecord extends RouteRecordRaw {

  meta: {

    title: string

    icon: string

    affix: boolean

    noCache: boolean

    breadcrumb: boolean

    activeMenu: string

    hidden: boolean

  }

}
