FROM openjdk:11-jdk

ARG JAR_FILE="build/libs/*.jar"

COPY ${JAR_FILE} .

RUN mkdir articles

ENTRYPOINT ["java", "-jar","/app.jar"]