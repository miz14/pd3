import css from "./header.module.scss"
import NavItem from "./NavItem/navItem";
import UserBlock from "./UserBlock/userBlock";


export default function Header() {
    return (
        <div className={css.background}>
            <div className="container">
                <div className={css.main_block}>
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