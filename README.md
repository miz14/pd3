Для запуска:
pip install -r requirements.txt
alembic upgrade 2c2e26e18a58

создаем в корне файл .env

в него пишем

DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASS="тут без ковычек свой пароль"

SECRET_AUTH=e95a3684b9982fcfd46eea716707f80cef515906eb49c4cb961dfde39a41ce21

переходим в src
cd .\src\
запускаем сервер
uvicorn main:app --reload