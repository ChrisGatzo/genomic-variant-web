# genomic-variant-web
Search through a directory of genes

# Running the server
First you need to install dotnet core cli for your platform. The .NET sdk installation can be found [here](https://www.microsoft.com/net/learn/get-started/macos). Then to run the app navigate to `src/server/genomic-variant-server/genomic-variant-server` and run

```sh
dotnet run
```

This will implictly run `dotnet restore` and `dotnet build`. The web api will start running on `localhost:5000`. To test that it actually works you can hit the endpoint with your browser `localhost:5000/api/genes/search?searchTerm=ABAT`.

Note: The first call might take a while because it's the first time the tsv file is loaded and cached but then every other request will use the server's in-memory cache and will be much faster.

# Running the web client
Make sure you have yarn installed by running `yarn -v`. If not you can find installation instructions [here](https://yarnpkg.com/lang/en/docs/install/#mac-stable). To run the app execute the following from the root folder

```sh
yarn install
yarn start
```
