FROM openjdk:11-jdk

WORKDIR /app

RUN apt-get update && apt-get -y install sudo

RUN ./gradlew clean build --exclude-task test

ARG JAR_FILE="build/libs/*.jar"

COPY ${JAR_FILE} /app/app.jar

ENTRYPOINT ["java", "-jar","/app.jar"]