# Imagem usada pelo Render. O Render não tem Java nativo, então o deploy é feito com Docker.

# Etapa 1: compila o projeto com Maven e gera o .jar
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -B -q dependency:go-offline
COPY src ./src
RUN mvn -B -q clean package -DskipTests

# Etapa 2: imagem final, só com o Java e o .jar (menor e mais segura)
FROM eclipse-temurin:17-jre
WORKDIR /app
RUN useradd --system --no-create-home spring
USER spring
COPY --from=build /app/target/portfolio-api.jar app.jar
EXPOSE 8080
# O plano gratuito do Render tem 512 MB de memória
ENV JAVA_OPTS="-Xmx300m"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
