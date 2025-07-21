##Use an official Maven image to build the Spring Boot app
#FROM maven:3.8.4-openjdk-21 AS build
## Set the working directory
#WORKDIR /app
##Copy the pom.xml and install dependencies
#COPY pom.xml
#RUN mvn dependency:go-offline
## Copy the source code and build the application
#COPY src./src
#RUN mvn clean package -DskipTests
#
## Use an official OpenJDK image to run the application
#FROM openjdk:21 jdk-slim
#
## Set the working directory
#WORKDIR /app
## Copy the built JAR file from the build stage
#COPY --from=build /app/target/chat-0.0.1-SNAPSHOT.jar
#
## Expose port 8080
#EXPOSE 8080
## Specify the command to run the application
#ENTRYPOINT ["java", "-jar", "/app/chat-0.0.1-SNAPSHOT.jar"]

# Stage 1: Build the app
FROM maven:3.9.6-eclipse-temurin AS build

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]




#
# #extend image
# FROM openjdk:21
# #working directory
# WORKDIR /app
# COPY .mvn/ .mvn
# COPY mvnw pom.xml ./
# #Run mvn to dowload dependency
# RUN ./mvnw dependency:go-offline
# COPY src ./src
# #Run spring boot project
# CMD ["./mvnw", "spring-boot:run"]