#!/bin/bash
keycloakVersion='13.0.1'
# Run Keycloak to test theme
cd ./build/keycloak/
./keycloak-dist/bin/add-user-keycloak.sh -r=master -u=admin -p=admin # Adds the Keycloak Admin Console admin user to the master realm
export NODE_IP="127.0.0.1"
echo "Host IP is ${NODE_IP}"
echo 'Starting keycloak...'
cp "../../standalone-custom-${keycloakVersion}.xml" ./keycloak-dist/standalone/configuration/
exec ./keycloak-dist/bin/standalone.sh --server-config="standalone-custom-${keycloakVersion}.xml" -b="${NODE_IP}" -bmanagement="${NODE_IP}" \
  -Djboss.tx.node.id="${NODE_IP}" \
  -Dorg.wildfly.sigterm.suspend.timeout=20