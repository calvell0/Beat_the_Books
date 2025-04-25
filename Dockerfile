
# ----------build stage-----------

FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /workspace

COPY pom.xml .
RUN mvn -q dependency:go-offline

COPY src ./src
RUN mvn -q package -DskipTests

# ----------run stage-----------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /workspace/target/*.jar app.jar

RUN adduser -D spring && \
    mkdir -p /home/spring && \
    chown spring:spring /home/spring
RUN chown spring:spring app.jar
USER spring

ENV JAVA_TOOL_OPTIONS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75"
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

HEALTHCHECK CMD wget -qO- http://localhost:8080/actuator/health || exit 1

