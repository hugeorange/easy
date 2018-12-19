import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';


const Navbar = () => {
    return (
        <nav className="nav-bar">
            <img src="//webresource-test.st.9now.net/bmanage/v_20180615182244/img/logo_c9795359.png" className="logo"/>
            <ul>
                <li><NavLink isActive={(match, location) => location.pathname.includes('/home/')} activeClassName="nav-active" to="/home/menu1">Home</NavLink></li>
                <li><NavLink isActive={(match, location) => location.pathname.includes('/about/')} strict activeClassName="nav-active" to='/about/menu1'>About</NavLink></li>
                <li><NavLink isActive={(match, location) => location.pathname.includes('/contact/')} strict activeClassName="nav-active" to="/contact/menu1">Contact</NavLink></li>
            </ul>
        </nav>
    )
}


const SIDEMENU = {
    home: [
        { name: 'home-菜单一', icon: "weixin", path: '/home/menu1' }, // match 取值
        { name: 'home-菜单二(全屏)', icon: "weibo", path: '/home/menu2'},
        {
            name: 'home-菜单三', icon: "weixin", toggle: "toggle-hide", children: [
            { name: "子home", path: '/home/menu3/meun3-1' },
            { name: "子home", path: '/home/menu3/meun3-2' },
            { name: "子home", path: '/home/menu3/meun3-3' }
        ]},
        {
            name: 'home-菜单四', icon: "weibo", toggle: "toggle-hide", children: [
            { name: "子home,", path: '/home/menu4/meun4-1' },
            { name: "子home,", path: '/home/menu4/meun4-2' },
            { name: "子home,", path: '/home/menu4/meun4-3' },
        ]},
        { name: 'home-菜单五', path: '/home/menu5', icon: "weixin", },
    ],
    about: [
        { name: 'about-菜单一', path: '/about/menu1' },
        { name: 'about-菜单二', path: '/about/menu2' },
        { name: 'about-菜单三', path: '/about/menu3' },
        { name: 'about-菜单四', path: '/about/menu4' },
        { name: 'about-菜单五', path: '/about/menu5' },
    ],
    contact: [
        { name: 'cont-菜单一', path: '/contact/menu1' },
        { name: 'cont-菜单二', path: '/contact/menu2' },
        { name: 'cont-菜单三', path: '/contact/menu3' },
        { name: 'cont-菜单四', path: '/contact/menu4' },
        { name: 'cont-菜单五', path: '/contact/menu5' },
    ]
}

// 多级路由还得再考究下
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuArr: [],
        }
        this.currIndex = -1;
    }
    componentDidMount() {
        this.getSideMenu();
    }
    componentWillReceiveProps(nextProps) {
        this.getSideMenu();
    }
    getSideMenu = () => {
        this.locaName = location.pathname;
        const pathName = this.locaName.split("/")[1];
        const currPath = pathName ? pathName : "home";
        this.setState({
            menuArr: SIDEMENU[currPath] // 浅复制会改变数据的 SIDEMENU
        })
    }
    toggleClass = (index) => {
        const { menuArr } = this.state;
        if (index == this.currIndex) {
            if (menuArr[index].toggle == "toggle-show") {
                menuArr[index].toggle = "toggle-hide";
            } else {
                menuArr[index].toggle = "toggle-show";
            }
        } else {
            menuArr.forEach(item => {
                if (Array.isArray(item.children)) {
                    item.toggle = "toggle-hide";
                }
            });
            menuArr[index].toggle = "toggle-show";
        }
        this.setState({ menuArr }, () => {
            this.currIndex = index;
        });

    }
    render() {
        const { menuArr} = this.state;
        return (
            <div className="side-bar">
                <ul className="nav-list">
                    {
                        menuArr.map((route, index) => (
                            <li key={index} className={classnames("li-p", (this.locaName === route.path) && "active")}>
                                {
                                    Array.isArray(route.children) && 
                                    <p className={classnames("li-c")} onClick={() => { this.toggleClass(index) }}>
                                        <i className={classnames(route.icon && `fa fa-${route.icon}`)}></i>
                                        {route.name}
                                    </p>
                                }
                                {
                                    Array.isArray(route.children) &&
                                    <ul className={classnames("ul-c", route.toggle)} number={route.children.length}>
                                        {
                                            route.children.map((citem, cindex) => (
                                                <li key={cindex}>
                                                    <NavLink activeClassName="sidebar-active" to={citem.path} >{citem.name}</NavLink>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                }
                                {
                                    !Array.isArray(route.children) && 
                                    <NavLink activeClassName="sidebar-active" to={route.path} >
                                        <i className={classnames(route.icon && `fa fa-${route.icon}`)}></i>
                                        {route.name}
                                    </NavLink>}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}


class Layout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { children, layout } = this.props;
        return (
            <div className="base-layout">
                {layout === "default" && <Navbar />}
                {layout === "default" && <Sidebar />}
                {children}
            </div>
        )
    }
}
export default Layout;