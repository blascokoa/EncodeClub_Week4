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

Minting hashes:

1. `0x4daa7111de5428d9feedf5a17c57b922bfc04580abf4aa243b97c98a2036f579`
2. `0x2224df8ac1aabfe0e0ef8ee72247edf63bd4cf811a918cbe74648c521eb1db93`
3. `0x12cdd8528fc4d417ecc46dfc0aa3c31db8d6794eb01ec43457cb1b69d540470a`
4. `0x8af899625d2671b0c3603b48959c2489ac341baf0fae2c3a13a81361d90b61b2`
5. `0x7eef84be0367044c013bb21f60b1ef149d38218b5fb151ec37211ce12ec5cd95`
6. `0xdd545e104a375a982333a1fdbce3bfcadd4f86795a16fabb03fb8a46611eca39`
7. `0x7a85f907936d4b1ebbaa45a05c6e9542314a3fbb05458a012714911e5860a439`
8. `0xa7fdb60c8953112e419e9f4b52e0aaa278f496fdc1d2bff9b28249f533033b67`
9. `0x093df2acb446a4789a8611eb825285dd0a81666c3d8461f1abd8c61dcb939189`
10. `0x9019c43bae31f2b7c7584ae3d7769fd47a9ee222321cbbc5c3cdfd248759bfc1`

-------------------
#### 7. Integrate this NFT Collection contract and APIs in a frontend application to display NFTs metadata and images
Not finished.
