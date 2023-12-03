import css from "./header.module.scss"
import NavItem from "./NavItem/navItem";
import UserBlock from "./UserBlock/userBlock";
import { Link } from "react-router-dom";


export default function Header({selected}) {
    return (
        <header className={css.background}>
            <div className="container">
                <div className={css.main_block}>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/proj">
                                    <NavItem name="Мои проекты" status={selected == 1? 1 : 0}/>
                                </Link>
                            </li>
                            <li>
                                <Link to="/hotworks">
                                    <NavItem name="Горящие работы" count="123" status={selected == 2? 1 : 0}/>
                                </Link>
                            </li>
                            <li>
                                <Link to="/req">
                                    <NavItem name="Запросы" count="123" status={selected == 3? 1 : 0}/>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <UserBlock/>
                </div>
            </div>
        </header>
    )
}