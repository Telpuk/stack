# stack
app running steps:
1. change .env.sample into .env
2. docker-compose build
3. docker-compose run package-manager npm install
4. docker-compose up

running tests:
docker-compose run package-manager npm run test

swagger url: 
/api-docs