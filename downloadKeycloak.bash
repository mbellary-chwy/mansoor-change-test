#!/bin/bash
keycloakVersion='13.0.1'
# Download Keycloak
mkdir -p ./build/keycloak
curl -o ./build/keycloak/keycloak.tar.gz -s -L -X GET "https://github.com/keycloak/keycloak/releases/download/${keycloakVersion}/keycloak-${keycloakVersion}.tar.gz"
pushd ./build/keycloak
gzip -cd ./keycloak.tar.gz | tar -x
mv "./keycloak-${keycloakVersion}/" ./keycloak-dist
cp "../../standalone-custom-${keycloakVersion}.xml" ./keycloak-dist/standalone/configuration/
popd