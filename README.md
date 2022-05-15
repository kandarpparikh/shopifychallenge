# Shopifychallenge
Shopify Production Engineer Intern  Challenge - Fall 2022

# How to run the application

## Install Docker

From `https://get.docker.com`:
```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

## Pull the docker image and run it

```
docker pull kandarpparikh/shopifychallenge
```

## Run image
```
docker run -ti -p 3000:3000 -p 3001:3001 kandarpparikh/shopifychallenge
```

## Access the application 

Open browser and navigate to 
Application Home Page & Filters : [http://localhost:3000/home/](http://localhost:3000/home/)
To add inventory : [http://localhost:3000/addinventory/](http://localhost:3000/addinventory/)
To edit inventory : [http://localhost:3000/editinventory/](http://localhost:3000/editinventory/)
To delete inventory : [http://localhost:3000/deleteinventory/](http://localhost:3000/deleteinventory/)

## Feature Developed 

-> Filtering based on fields/inventory count/tags/other metadata