import "./header.scss"
import NavItem from "./NavItem/navItem";
import UserBlock from "./UserBlock/userBlock";


const Header = () => {
    return (
        <div className="background">
            <div className="container">
                <div className="main-block">
                    <nav>
                        <ul>
                            <li>
                                <NavItem name="Мои проекты" status="0"/>
                            </li>
                            <li>
                                <NavItem name="Горящие работы" count="123" status="1"/>
                            </li>
                            <li>
                                <NavItem name="Запросы" count="123" status="1"/>
                            </li>
                        </ul>
                    </nav>
                    <UserBlock/>
                </div>
            </div>
        </div>
    )
}

export default Header;