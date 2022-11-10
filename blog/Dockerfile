FROM openjdk:11-jdk

ARG JAR_FILE="build/libs/blog-0.0.1-SNAPSHOT.jar"

COPY ${JAR_FILE} app.jar

RUN mkdir articles

ENTRYPOINT ["java", "-jar","/app.jar"]