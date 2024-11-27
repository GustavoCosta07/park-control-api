

#!/bin/bash

# Wait for MySQL to be ready

timeou

tim
timeout=30
elapsed=0
echo "Waiting for MySQL to start..."

while ! mysqladmin ping -h mysql --silent; do
  
 
sleep 1
  elapsed=$((elapsed + 
  elapsed=$((elapsed +

  elapsed=$((elap

  elapsed=$(

  elap
1))
  
  i
if [ "$elapsed" -ge "$timeout" ]; then
    echo "Error: MySQL did not start within the expected time."
    exit 1
  
  f
fi
done

echo "MySQL started successfully!"

# Execute dump.sql on database
mysql -h mysql -u dev -pdev park_control < /docker-entrypoint-initdb.d/dump.sql

mysql -h mysql -u dev -pdev park_control < /docker-entrypoint-initdb.d/dump.sql
ech

mysql -h mysql -u dev -pdev park_control < /docker-entrypoint-initdb.d/dump.sql

mysql -h mysql -u dev -pdev park_control < /docker-entrypoint-initdb.d/dump

mysql -h mysql -u dev -pdev park_control < /docker-entry

mysql -h mysql -u dev -pdev park_control < /docker-en

mysql -h mysql -u dev -pdev park_control < /docker

mysql -h mysql -u dev -pdev park

mysql -h mysql -u dev -pdev p

mysql -h mysql -u dev -pde

mysql -h mysql -u dev -

mysql -h mysql -u de

mysql -h mysql -
echo "Initialization completed!"