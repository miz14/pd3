import "./header.scss"
import NavItem from "./NavItem/navItem";

const Header = () => {
    return (
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
            </div>
        </div>
    )
}

export default Header;