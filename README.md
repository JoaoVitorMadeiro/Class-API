# Class API

Este projeto implementa uma API para gerenciamento de classes, utilizando Java com Spring Boot. A API foi projetada com base nos princípios RESTful e é configurada para facilitar a criação, leitura, atualização e exclusão de dados relacionados a classes e seus atributos.

## Funcionalidades

- **Gerenciamento de Classes**: Criar, listar, editar e excluir classes.
- **Integração com Banco de Dados**: Persistência dos dados usando JPA/Hibernate.
- **Boas Práticas RESTful**: Implementação de padrões recomendados para APIs.

## Tecnologias Utilizadas

- **Java 17**
- **Spring Boot** 2.7
- **Maven** para gerenciamento de dependências
- **H2 Database** (em ambiente de desenvolvimento)
- **Swagger/OpenAPI** para documentação da API
- **JUnit** e **Mockito** para testes

## Estrutura do Projeto

A estrutura do projeto segue as boas práticas do Spring Boot:

```
src/
├── main/
│   ├── java/
│   │   └── com/example/classapi/
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       └── model/
│   └── resources/
│       ├── application.properties
├── test/
    └── java/
        └── com/example/classapi/
```

- **controller/**: Contém as classes de controle que expõem os endpoints.
- **service/**: Contém a lógica de negócios.
- **repository/**: Interfaces de acesso aos dados.
- **model/**: Representação dos objetos de dados.
- **resources/**: Configurações da aplicação.

## Como Executar

1. **Clonar o Repositório**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd Class-API-main
   ```

2. **Executar com Maven**:
   ```bash
   ./mvnw spring-boot:run
   ```

3. **Acessar a Documentação**:
   A API oferece uma interface Swagger acessível em:
   [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## Configuração do Banco de Dados

A aplicação utiliza o banco H2 para fins de desenvolvimento. As configurações podem ser encontradas em `src/main/resources/application.properties`.

Exemplo:
```
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

Para usar um banco de dados diferente, ajuste as configurações acima conforme necessário.

## Testes

Para executar os testes:
```bash
./mvnw test
```

## Licença

Este projeto é licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para mais informações.
