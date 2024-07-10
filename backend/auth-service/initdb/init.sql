CREATE USER IF NOT EXISTS 'mysqlusr'@'%' IDENTIFIED WITH 'caching_sha2_password' BY 'mysqlpwd';
CREATE USER IF NOT EXISTS 'keycloak_usr'@'%' IDENTIFIED WITH 'caching_sha2_password' BY 'keycloak_pwd';

CREATE DATABASE IF NOT EXISTS keycloak CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON keycloak.* TO 'keycloak_usr'@'%';
FLUSH PRIVILEGES;
