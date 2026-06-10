# 📝 TaskList API

Uma API RESTful profissional desenvolvida em **Java** com **Spring Boot** para gerenciamento de tarefas personalizadas por usuário. O projeto adota padrões de arquitetura de mercado, separação clara de camadas e segurança robusta.
---

## 🚀 Camadas e Arquitetura do Projeto

O projeto foi reestruturado para seguir o padrão de responsabilidade única e desacoplamento de dados:

* **Controllers:** Responsáveis estritamente pelo protocolo HTTP (receber requisições e responder com os status adequados). Nenhum `try-catch` ou lógica de banco fica aqui.
* **Services:** Centralizam toda a lógica de negócio, validações e orquestração dos dados.
* **Repositories:** Interfaces que utilizam o Spring Data JPA para comunicação direta com o banco de dados.
* **DTOs (Data Transfer Objects):** Implementados utilizando Java **Records** para blindar a entrada de dados (`TaskCreateDTO`) e isolar atualizações parciais (`TaskUpdateDTO`), evitando vulnerabilidades como *Mass Assignment* e loops de serialização JSON.

---

## 🗄️ Modelo de Dados (Relacionamento JPA)

O sistema possui uma relação de **1 para Muitos** entre Usuários e Tarefas:
* Um **Usuário** (`UserModel`) pode ter uma lista de várias tarefas associadas.
* Uma **Tarefa** (`TaskModel`) pertence obrigatoriamente a um único usuário através de um relacionamento `@ManyToOne` mapeado com carregamento preguiçoso (*Lazy Loading*) para otimização de performance.

---

## 🛠️ Tecnologias Utilizadas

* **Java 21+** 
* **Spring Boot 4.0.6**
* **Spring Data JPA**
* **Lombok**

---

## 💾 Como Executar o Projeto

1. Clone e instale as dependências:
   ```bash
   mvn clean install
   ```

2. Inicie o container:
   ```bash
   docker compose up -d
   ```

3. Execute a aplicação:
   ```bash
   mvn spring-boot:run
   ```