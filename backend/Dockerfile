FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /workspace
ARG SERVICE_NAME

COPY backend/${SERVICE_NAME}/pom.xml pom.xml
COPY backend/${SERVICE_NAME}/src src

RUN mvn -B -DskipTests package

FROM eclipse-temurin:17-jre-jammy

WORKDIR /app
COPY --from=build /workspace/target/*.jar app.jar

USER 10001:10001
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]
