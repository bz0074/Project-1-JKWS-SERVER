# Project-1-JWKS-SERVER

This project implements a RESTful JWKS server that provides public keys with unique identifiers (kid) for verifying JSON Web Tokens (JWTs). It also includes an authentication endpoint and handles the issuance of JWTs with expired keys based on a query parameter.

## Table of Contents

- [Background](#background)
- [Requirements](#requirements)
  - [Key Generation](#key-generation)
  - [Web Server with Two Handlers](#web-server-with-two-handlers)
  - [Documentation](#documentation)
  - [Tests](#tests)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Running the Test Suite](#running-the-test-suite)
- [Contributing](#contributing)
- [License](#license)

## Background

This project aims to implement a secure JWT and JWKS server using RESTful principles. Familiarity with HTTP/web services, REST, JOSE, JWT, and JWK is recommended.

## Requirements

### Key Generation

- Implement RSA key pair generation.
- Associate a Key ID (kid) and expiry timestamp with each key.

### Web Server with Two Handlers

- Serve HTTP on port 8080.
- Implement a RESTful JWKS endpoint that serves only unexpired public keys in JWKS format.
- Implement a /auth endpoint that returns an unexpired, signed JWT on a POST request.
  - If the "expired" query parameter is present, issue a JWT signed with the expired key pair and expiry.

### Documentation

- Code should be organized.
- Code should be commented where needed.
- Code should be linted per your language/framework.

### Tests

- Test suite for your given language/framework with tests for you.
- Test coverage should be over 80%.

## Usage

Describe how to use your server and any additional setup/configuration needed.

## Dependencies

List the main dependencies your project relies on.

## Installation

Provide instructions on how to install any dependencies and set up the project.

## Running the Server

Explain how to run your JWKS server.

## Running the Test Suite

Explain how to run your test suite and check coverage.

## Contributing

Explain how others can contribute to your project.

## License

This project is licensed under the [MIT License](LICENSE).

