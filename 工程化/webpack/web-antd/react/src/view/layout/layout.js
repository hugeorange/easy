import React from 'react';
import { NavLink } from 'react-router-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {
    LocaleProvider,
    Layout,
    Menu,
    Icon
} from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
import "@/css/layout";
import bs from "@/img/bs.jpg";


const NAVMENU = [
    { name: 'HOME', path: '/home' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTRACT', path: '/contact' }
]

const SIDEMENU = {
    home: [
        { name: 'home-菜单一', icon: "pie-chart", path: '/home/menu1', id: "menu-1" }, // match 取值
        { name: 'home-菜单二(全屏)', icon: "desktop", path: '/home/menu2', id: "menu-2" },
        {
            name: 'home-菜单三', icon: "team", id: "menu-3", children: [
                { name: "子home", path: '/home/menu3/meun3-1', id: "menu-3-1" },
                { name: "子home", path: '/home/menu3/meun3-2', id: "menu-3-2" },
                { name: "子home", path: '/home/menu3/meun3-3', id: "menu-3-3" }
            ]
        },
        {
            name: 'home-菜单四', icon: "user", id: "menu-4", children: [
                { name: "子home,", path: '/home/menu4/meun4-1', id: "menu-4-1" },
                { name: "子home,", path: '/home/menu4/meun4-2', id: "menu-4-2" },
                { name: "子home,", path: '/home/menu4/meun4-3', id: "menu-4-3" },
            ]
        },
        { name: 'home-菜单五', path: '/home/menu5', icon: "team", id: "menu-5" },
    ],
    about: [
        { name: 'about-菜单一', path: '/about/menu1', icon: "desktop", id: "menu-1" },
        { name: 'about-菜单二', path: '/about/menu2', icon: "desktop", id: "menu-2" },
        { name: 'about-菜单三', path: '/about/menu3', icon: "desktop", id: "menu-3" },
        { name: 'about-菜单四', path: '/about/menu4', icon: "desktop", id: "menu-4" },
        { name: 'about-菜单五', path: '/about/menu5', icon: "desktop", id: "menu-5" },
    ],
    contact: [
        { name: 'cont-菜单一', path: '/contact/menu1', icon: "desktop", id: "menu-1" },
        { name: 'cont-菜单二', path: '/contact/menu2', icon: "desktop", id: "menu-2" },
        { name: 'cont-菜单三', path: '/contact/menu3', icon: "desktop", id: "menu-3" },
        { name: 'cont-菜单四', path: '/contact/menu4', icon: "desktop", id: "menu-4" },
        { name: 'cont-菜单五', path: '/contact/menu5', icon: "desktop", id: "menu-5" },
    ]
}


class PageLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuArr: [],
            collapsed: false,
            navKey: [""],
            sideKey: [""],
            sideOpen: [""],
        }
    }
    componentDidMount() {
        console.log("componentDidMount");
        this.getSideMenu();
        this.setMenuLight();
    }
    componentWillReceiveProps(nextProps) {
        this.setMenuLight();
    }
    getSideMenu = () => {
        this.locaName = location.pathname;
        const pathName = this.locaName.split("/")[1];
        const currPath = pathName ? pathName : "home";
        this.menuArr = SIDEMENU[currPath];
        this.setState({
            menuArr: SIDEMENU[currPath]
        });
    }
    setMenuLight = () => {
        let navIndex;
        let sideKey;
        const pathName = location.pathname;
        // nav初始化高亮        
        const navArr = NAVMENU.map(item => item.path);
        navArr.some((item, index) => {
            if (pathName.includes(item)) navIndex = index;
            return pathName.includes(item);
        })
        // 侧边栏初始化高亮
        const sideArr = [];
        this.menuArr.forEach((pitem) => {
            if (pitem.children) {
                pitem.children.forEach((citem) => {
                    sideArr.push(citem);
                })
            } else {
                sideArr.push(pitem);
            }
        })
        for(let i=0; i<sideArr.length; i++) {
            if (sideArr[i].path.includes(pathName)) {
                sideKey = sideArr[i].id;
                break;
            }
        }
        // 侧边栏初始化展开
        let sideOpen;
        const len = pathName.split("/").length - 1;
        let sideOpenFlag = false;
        // 靠判断 pathname的长度判断是否展开有点low，存在潜在风险
        if (len > 2) {
            for (let i=0; i<this.menuArr.length; i++) {
                if (this.menuArr[i].children) {
                    const sideOpenArr = this.menuArr[i].children.map(item => {
                        return item.path;
                    })
                    sideOpenFlag = sideOpenArr.some(item => {
                        return item.includes(pathName);
                    })
                    if (sideOpenFlag) {
                        sideOpen = this.menuArr[i].id;
                        break;
                    }
                }
            }
        } 
        this.setState({
            navKey: [navIndex + ""],
            sideKey: [sideKey],
            sideOpen: [sideOpen]
        })
    } 
    onCollapse = () => {
        this.setState({ collapsed: !this.state.collapsed });
        this.setState({ sideOpen: [""]});
    }

    selectMenu = ({ item, key, selectedKeys }) => {
        // console.log(item, key, selectedKeys);
    }

    openSub = (openKeys) => {
        this.setState({ sideOpen: openKeys });
    }

    render() {
        const {menuArr, navKey, sideKey, sideOpen} = this.state;
        const { children } = this.props;
        return (
            <LocaleProvider locale={zhCN}>
                <Layout className="main-layout">
                    <Header className="header">
                        <img src={bs} className="logo" alt=""/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={navKey}
                            style={{ lineHeight: '64px' }}
                        >
                            {
                                NAVMENU.map((item, index) => {
                                    return (
                                        <Menu.Item key={index}>
                                            <NavLink to={item.path}>{item.name}</NavLink>
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider
                            collapsible
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}
                        >
                            <Menu
                                mode="inline"
                                theme="dark"
                                selectedKeys={sideKey}
                                onSelect={this.selectMenu}
                                openKeys={sideOpen}
                                onOpenChange={this.openSub}
                                style={{ height: '100%' }}
                            >
                                {
                                    menuArr.map((item, index) => {
                                        if (!item.children) {
                                            return (
                                                <Menu.Item key={item.id}>
                                                    <NavLink to={item.path}>
                                                        <Icon type={item.icon} /><span>{item.name}</span>
                                                    </NavLink>
                                                </Menu.Item>
                                            )
                                        } else {
                                            return (
                                                <SubMenu key={item.id} title={<span><Icon type={item.icon} /><span>{item.id}</span></span>}>
                                                    {
                                                        item.children.map((subItem) => {  
                                                            return (
                                                                <Menu.Item key={subItem.id}>
                                                                    <NavLink to={subItem.path}>{subItem.name}</NavLink>
                                                                </Menu.Item>
                                                            )
                                                        })
                                                    }
                                                </SubMenu>
                                            )
                                        }
                                    })
                                }
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content>{children}</Content>
                        </Layout>
                    </Layout>
                </Layout>
            </LocaleProvider>
        )
    }
}
export default PageLayout;
