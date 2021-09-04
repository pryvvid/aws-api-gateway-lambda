## AWS API GATEWAY LAMBDA

Products API - https://fmfiacgetl.execute-api.eu-west-1.amazonaws.com/products

### Local invoke

getProductsList
```
sls invoke local -f getProductsList
```

getProductsById
```
sls invoke local -f getProductsById -p test/localPathParams.json
```

createProduct
```
sls invoke local -f createProduct -p test/localBody.json
```