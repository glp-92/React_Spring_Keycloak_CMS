# Deploy Backend

Backend runs with `MySQL` database for `Keycloak` and `blog-service`

## Blog service to Docker

1. Generate `jar` file from the application that will be placed on `./target`
```bash
cd backend/blog-service
./mvnw clean install # with ls a mvnw file should be placed
```
2. Dockerfile to build the image
```dockerfile
FROM openjdk:17-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring # Using user different from root
USER spring:spring
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```