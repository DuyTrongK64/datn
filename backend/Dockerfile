{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
FROM maven:3.9.9-eclipse-temurin-21 AS build\
\
WORKDIR /app\
\
COPY pom.xml .\
COPY src ./src\
\
RUN mvn clean package -DskipTests\
\
FROM eclipse-temurin:21-jre\
\
WORKDIR /app\
\
COPY --from=build /app/target/*.jar app.jar\
\
EXPOSE 8080\
\
CMD ["java", "-jar", "app.jar"]}