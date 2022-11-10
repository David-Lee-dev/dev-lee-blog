FROM openjdk:11-jdk

WORKDIR /app

ARG JAR_FILE="build/libs/*.jar"

COPY ${JAR_FILE} /

ENTRYPOINT ["java", "-jar","/app.jar"]