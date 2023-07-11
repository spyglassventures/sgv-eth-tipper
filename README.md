Create
--------------------------------------
- npx thirdweb create contract
    - hardhat
    - EmptyContract

(optional: test compile on remix with inject web provider, Metamask)
--------------------------------------

Deploy
--------------------------------------
- login to thirdweb
- navigate to main folder (one above contract folder)
- npx thirdweb deploy
- (optional: test functionality on third web GUI)

git
--------------------------------------
-echo "# sgv-eth-tipper" >> README.md  <- replace with own
- git init
- git add README.md
- git commit -m "first commit"
- git branch -M main
- git remote add origin https://github.com/spyglassventures/sgv-eth-tipper.git  <- replace with own
- git push -u origin main

create frontend
--------------------------------------
- npx thirdweb create app
    - EVM
    - next.js
    - TypeScript
cd to app name


install charka css framework
--------------------------------------
- (make sure you are in the folder of the app you created for the frontend)
- yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
- (later: import { ChakraProvider } from "@chakra-ui/react"; in _app.txs and import { Container } from "@chakra-ui/react" to actual pages)

Debugging / Development
--------------------------------------
- yarn dev (in the app) to open developper environment



(Optional) VS Configuration:
--------------------------------------
- Material Icon Them to see fancy folder symbols




ToDo:
-------------------------------------
- verify
- defintion of event -> tipper new
- defintion of struct and when to use it
- tests
- extensions forge for testing
- pretty readme
- create an invidual field to enter eth

Sources:
--------------------------------------
- https://www.youtube.com/watch?v=3vaMzK5SDuQ