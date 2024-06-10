# IoT Sensor Network Teaching Example

Quick implementation of a distributed system, with a mock producer component. Showcasing how a distributed system can look, with examples of descriptive applications and systems through containers and container orchestration.

## Startup

**Prerequisites**
- [Docker Compose](https://docs.docker.com/compose/)

### Steps

- Start the application set with `docker compose`

    ```sh
    docker compose --file deployements/development.yaml up
    ```

- Services:
    - Client-Static-Web should be accessible at [http://localhost:8080](http://localhost:8080)
    - Web Server should be listening at [http://localhost:9090/api/v1/weather](http://localhost:9090/api/v1/weather)

- Logs are emitted to `stdout` from the `docker compose up` command

- Clean up after work:

    ```sh
    docker compose --file deployements/development.yaml down
    ```

## Architecture

![bath overwatch architecture](documentation/images/bath-overwatch-architecture-draft-2024-06-06.png)

## Project Layout

```sh
├── applications
│   ├── client-static-web
│   ├── sensor-temperature
│   └── server
├── deployments
├── documentation
└── models
```

- **./applications**

    Contains the source code for the deployed services. Split into subdirectories for each project

- **./deployments**

    Contains a description for how a deployment looks using [Docker Compose](). Named after their deploy `<environment>.yaml`

- **./documentation**

    Contains any documentation files for this repository

- **./models**

    Contains the shape/type of any models which are used accross services
