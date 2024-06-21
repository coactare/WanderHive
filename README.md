
---
# Project Name - WanderHive

## Overview

The project aims to develop a premier online sports shopping experience that awaits sports enthusiasts!, comprising a web-based client application, an admin portal, and a blog section. The system will be built using a microservices architecture to ensure scalability, modularity, and maintainability. It will also leverage, C#, React, Angular, Kubernetes (K8s), Kafka, Docker, Azure DevOps for CI/CD, Git for version control, and Istio for service mesh capabilities.

## Technologies Used

- **Frontend Technologies:**
  - React with Redux for Client App
  - Angular with NGRX for Admin Portal
  
- **Backend Technologies:**
  - Language: C# with ASP.NET Core
  - Databases:
    - SQL Server for structured data 
    - MongoDB for semi-structured data 
    - Redis
    - PostgreSQL

- **Microservices Infrastructure:**
  - Kubernetes (K8s) for container orchestration
  - Istio for service mesh capabilities, including traffic management, security, and observability.
  - Kafka for event streaming and message queueing
  - Docker for containerization

- **DevOps:**
  - Azure DevOps for continuous integration and continuous deployment (CI/CD)
  - Git for version control

## Architecture

The project will be structured as a collection of loosely coupled microservices, each responsible for specific business functions:

1. **Basket Service:**
   - Language: C# with ASP.NET Core
   - Database: Redis
 

2. **Catalog Service:**
   - Language: C# with ASP.NET Core
   - Database: MongoDB

3. **Discount Service:**
   - Language: GRPC with C# with ASP.NET Core
   - Database: PostgreSQL

4. **Ordering Service:**
   - Language: C# with ASP.NET Core
   - Database: Sql Server


## Getting Started

1. **Clone the Repository:**
   ```
   git clone https://github.com/coactare/WanderHive.git
   ```

2. **Setup Environment:**
   - Install necessary dependencies for each microservice.
   - Configure database connections, Kafka, Istio, and Docker settings.

3. **Run Microservices:**
   - Start each microservice individually using their respective commands or scripts.

4. **Access Applications:**
   - Admin Portal: http://localhost:4200
   - Client App: http://localhost:5173
   - Backend : https://localhost:9010/

## Contributing

Contributions to the project are welcome! If you encounter any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue on the repository.

## License

N/A

---