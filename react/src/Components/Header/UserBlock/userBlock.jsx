import css from "./userBlock.module.scss";

export default function UserBlock() {
    
    return (
        <div className={css.register_block}>
            <button>
                Регистрация
            </button>
            <div></div>
            <button>
                Вход
            </button>

        </div>
    )
}