# FluenceBounty

### Work flow

1. Create new counter service for counting number of characters in message. Service is implemented in rust programming language.
   Compile services to wasm files
  
  ```
   cd quickstart/2-hosted-services
   ```
   ```
   ./scripts/build_all.sh
   ```
2. Deploy service to the network node
  
  ```
  fldist --node-id 12D3KooWFEwNWcHqi9rtsmDhsYcDbRUCDXH84RC4FW6UfsFWaoHi new_service --ms artifacts/counter.wasm:configs/counter_cfg.json --name counter
  ```
3. Add service id to 3-browser-to-service/aqua/getting-started.aqua file. Recompile aqua file
  
  ```
  nmp run compile-aqua
  ```
4. Run the server
  
  ```
  npm run start
  ```
5. Now user should be able to see the message count next to the message.


### My expressions about Fluence

I just heard about Fluence at the start of this hackaton. I have some experience in building microservice arhitectures and I think that the general idea is awesome.
For developers it's much easier to orchestrate services through Aqua programming language and not to worry about details while writing services.

I want to thank to your team for this bounty. I really enjoyed while trying to figure out solution. You have nice community (team members). Just keep going!
Aleksandar.
    
