# EncodeClub Solidity Bootcamp - Project Week 4


### Collaborators:
- David Blasco (Group 18)

### Google Doc:
https://docs.google.com/document/d/1-csgHGY3F1wR_icLbxD9q4NSZGeLE40J83Jva0SdhFQ/edit?usp=sharing

## Tasks:

1. Build a web server and API for providing the features using the RESTful architecture
2. Run a local node of IPFS
3. Upload 10 images to this node
4. Create a JSON and build metadata descriptions for 10 NFTs, each using one unique image
5. Make a GET method in the API to get the metadata by id
6. Deploy a NFT Collection and mint 10 NFTs, and assign the API endpoint to the token URI
7. Integrate this NFT Collection contract and APIs in a frontend application to display NFTs metadata and images
8. (Bonus) provide wallet functions in the frontend to buy, transfer, allow, transfer from and burn NFTs


## Details

-------------------

#### 1. Build a web server and API for providing the features using the RESTful architecture.

Server can be found into the folder `./ipfs_server`.

-------------------

#### 2. Run a local node of IPFS

Go to the server folder mentioned above, run `yarn install` and `yarn start`, access on http://localhost:3000, for swagger UI: http://localhost:3000/docs

-------------------

#### 3. Upload 10 images to this node
Images can be uploaded directly from the swagger UI, a few screenshots can be found in the google doc


-------------------

#### 4. Create a JSON and build metadata descriptions for 10 NFTs, each using one unique image

JSON file built on `./db` folder

-------------------

#### 5. Make a GET method in the API to get the metadata by id

On **app.controller.ts**:
```ts
@Get('metadata/:id')
@ApiOperation({
  summary: 'Get metadata by id',
  description: 'Gets the metadata info at the requested index',
})
@ApiResponse({
  status: 200,
  description: 'MetaData',
})
@ApiResponse({
  status: 503,
  description: 'The server is not configured correctly',
  type: HttpException,
})
async getMetaData(@Param('id') id: number) {
  try {
    const result = this.appService.getMetaData(id);
    return result;
  } catch (error) {
    throw new HttpException(error.message, 503);
  }
}
```

On **app.service.ts**:
```ts
getMetaData(fileId: number) {
  let metadata: any;
  try {
    metadata = this.db.getData(`/${fileId}/metadata`);
  } catch (error) {
    return { error };
  }
  if (!metadata) return 'error';
  return metadata;
}
```

-------------------
#### 6. Deploy a NFT Collection and mint 10 NFTs, and assign the API endpoint to the token URI


-------------------
#### 7. Integrate this NFT Collection contract and APIs in a frontend application to display NFTs metadata and images


-------------------
#### 8. (Bonus) provide wallet functions in the frontend to buy, transfer, allow, transfer from and burn NFTs

