const HomeFirst = () => import('@/views/ui_demo/workbench/home_first')
const HomeSecond = () => import('@/views/ui_demo/workbench/home_second')
const HomeThird = () => import('@/views/ui_demo/workbench/home_third')
const SystemSettings = () => import('@/views/ui_demo/workbench/system_settings')
const DefaultForm = () => import('@/views/ui_demo/forms/default_form')
const DrawerForm = () => import('@/views/ui_demo/forms/drawer_form')
const TreeForm = () => import('@/views/ui_demo/forms/tree_form')
const CategoryListFirst = () => import('@/views/ui_demo/lists/category_list_first')
const CategoryListSecond = () => import('@/views/ui_demo/lists/category_list_second')
const CustomListFirst = () => import('@/views/ui_demo/lists/custom_list_first')
const CustomListSecond = () => import('@/views/ui_demo/lists/custom_list_second')
const CustomListThird = () => import('@/views/ui_demo/lists/custom_list_third')
const BusinessNode = () => import('@/views/ui_demo/details/business_node')
const OperationLog = () => import('@/views/ui_demo/details/operation_log')
const ResultPage = () => import('@/views/ui_demo/results/index')
const ExceptionPage = () => import('@/views/ui_demo/exceptions/index')
const ChartPages = () => import('@/views/ui_demo/charts/index')

export const frameRouter = [{
    path: '/',
    name: 'HomeFirst',
    component: HomeFirst,
    meta: {
        title: '首页1'
    }
},
{
    path: '/home',
    name: 'HomeFirst',
    component: HomeFirst,
    meta: {
        title: '首页1'
    }
},
{
    path: '/homeSecond',
    name: 'HomeSecond',
    component: HomeSecond,
    meta: {
        title: '首页2'
    }
},
{
    path: '/homeThird',
    name: 'HomeThird',
    component: HomeThird,
    meta: {
        title: '首页3'
    }
},
{
    path: '/systemSettings',
    name: 'SystemSettings',
    component: SystemSettings,
    meta: {
        title: '系统设置'
    }
},
{
    path: '/defaultForm',
    name: 'DefaultForm',
    component: DefaultForm,
    meta: {
        title: '表单-默认'
    }
},
{
    path: '/drawerForm',
    name: 'DrawerForm',
    component: DrawerForm,
    meta: {
        title: '表单-抽屉'
    }
},
{
    path: '/treeForm',
    name: 'TreeForm',
    component: TreeForm,
    meta: {
        title: '表单-树'
    }
},
{
    path: '/categoryListFirst',
    name: 'CategoryListFirst',
    component: CategoryListFirst,
    meta: {
        title: '分类列表1'
    }
},
{
    path: '/categoryListSecond',
    name: 'CategoryListSecond',
    component: CategoryListSecond,
    meta: {
        title: '分类列表2'
    }
},
{
    path: '/customListFirst',
    name: 'CustomListFirst',
    component: CustomListFirst,
    meta: {
        title: '自定义内容列表1'
    }
},
{
    path: '/customListSecond',
    name: 'CustomListSecond',
    component: CustomListSecond,
    meta: {
        title: '自定义内容列表2'
    }
},
{
    path: '/customListThird',
    name: 'CustomListThird',
    component: CustomListThird,
    meta: {
        title: '自定义内容列表3'
    }
},
{
    path: '/businessNode',
    name: 'BusinessNode',
    component: BusinessNode,
    meta: {
        title: '业务树-节点详情'
    }
},
{
    path: '/operationLog',
    name: 'OperationLog',
    component: OperationLog,
    meta: {
        title: '操作日志'
    }
},
{
    path: '/resultPage',
    name: 'ResultPage',
    component: ResultPage,
    meta: {
        title: '结果页'
    }
},
{
    path: '/exceptionPage',
    name: 'ExceptionPage',
    component: ExceptionPage,
    meta: {
        title: '异常页'
    }
},
{
    path: '/chartPage',
    name: 'ChartPages',
    component: ChartPages,
    meta: {
        title: '图表页'
    }
}
]

// 导航栏
export const adminRouteConfig = [{
    name: '工作台',
    icon: 'iconfont icon-mianxingtubiao-shezhi',
    id: 'workbench',
    children: [{
        name: '首页1',
        id: 'HomeFirst',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        active: true,
        url: '/home'
    },
    {
        name: '首页2',
        id: 'HomeSecond',
        icon: 'iconfont icon-mianxingtubiao-riqi',
        url: '/homeSecond'
    },
    {
        name: '首页3',
        id: 'HomeThird',
        icon: 'iconfont icon-mianxingtubiao-danju',
        url: '/homeThird'
    },
    {
        name: '系统设置页',
        icon: 'iconfont icon-iconfontgengduo',
        id: 'SystemSettings',
        url: '/systemSettings'
    }
    ]
},
{
    name: '列表类',
    icon: 'iconfont icon-mianxingtubiao-riqi',
    id: 'list',
    children: [{
        name: '分类列表1',
        id: 'CategoryListFirst',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        url: '/categoryListFirst'
    },
    {
        name: '分类列表2',
        id: 'CategoryListSecond',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        url: '/categoryListSecond'
    },
    {
        name: '自定义内容列表1',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        id: 'CustomListFirst',
        url: '/customListFirst'
    },
    {
        name: '自定义内容列表2',
        id: 'CustomListSecond',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        url: '/customListSecond'
    },
    {
        name: '自定义内容列表3',
        id: 'CustomListThird',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        url: '/customListThird'
    }
    ]
},
{
    name: '表单类',
    icon: 'iconfont icon-mianxingtubiao-danju',
    id: 'form',
    children: [{
        name: '表单-默认',
        id: 'DefaultForm',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        url: '/defaultForm'
    },
    {
        name: '表单-抽屉',
        id: 'DrawerForm',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        url: '/drawerForm'
    },
    {
        name: '表单-树',
        id: 'TreeForm',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        url: '/treeForm'
    }
    ]
},
{
    name: '详情类',
    icon: 'iconfont icon-iconfontgengduo',
    id: 'details',
    children: [{
        name: '操作日志',
        id: 'OperationLog',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        url: '/operationLog'
    },
    {
        name: '业务树-节点详情',
        id: 'BusinessNode',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        url: '/businessNode'
    }
    ]
},
{
    name: '结果类',
    icon: 'iconfont icon-mianxingtubiao-yanzhonggaojing',
    id: 'result',
    children: [{
        name: '结果页',
        id: 'ResultPage',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        url: '/resultPage'
    }]
},
{
    name: '异常类',
    icon: 'iconfont icon-mianxingtubiao-tishi',
    id: 'exception',
    children: [{
        name: '异常页',
        id: 'ExceptionPage',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        url: '/exceptionPage'
    }]
},
{
    name: '图表类',
    icon: 'iconfont icon-tubiaohei',
    id: 'chart',
    children: [{
        name: '图表页',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        id: 'ChartPages',
        url: '/chartPage'
    }]
}
]

export const createAdminRouteConfig = () => adminRouteConfig
