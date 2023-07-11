import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { Box, Card, CardBody, Container, Flex, Heading, Input, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress(); // check if wallet is connected

  const contractAddress = "0x4aaea4260f7fD11c02983Dd67372c837F929fFd4";

  const {contract} = useContract(contractAddress);

  const { data: totalTips, isLoading: loadingTotalTips } = useContractRead(contract, "getTotalTips");
  const { data: recentTips, isLoading: loadingRecentTips } = useContractRead(contract, "getAllTips");

  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // clear fields from entered data
  function clearValues() {
    setMessage("");
    setName("");
  }

  return (
    <Container maxW={"1200px"} w={"full"}>
      <Flex justifyContent={"space-between"} alignItems={"center"} py={"20px"} height={"80px"} bg={"blue.500"} color={"white"} borderRadius={"md"} >
      <Box pr={4}
          borderRadius={"md"} // Rounded edges
          // bg={"green.200"} // Background color
          px={4} // Horizontal padding
          py={2} // Vertical padding
        >
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Leave a tip for Daniel
          </Text>
        </Box>
        <Box pr={4}> {/* Added padding */}
          <ConnectWallet />
        </Box>
      </Flex>
      <SimpleGrid columns={2} spacing={10} mt={"40px"}>
        <Box>
          <Card>
            <CardBody>
              <Heading mb={"20px"} color={"blue.500"}>
                Leave a tip
              </Heading>
              <Flex direction={"row"} color={"gray.600"}>
                <Text>Total Tips: </Text>
                <Skeleton isLoaded={!loadingTotalTips} width={"20px"} ml={"5px"}>
                  {totalTips?.toString()}
                </Skeleton>
              </Flex>
              <Text fontSize={"2xl"} py={"10px"} color={"gray.600"}>Name:</Text>
              <Input 
                placeholder="John Doe"
                maxLength={16} 
                value={name} 
                onChange={handleNameChange}
              />
              <Text fontSize={"2xl"} mt={"10px"} py={"10px"} color={"gray.600"}>Message:</Text>
              <Input 
                placeholder="Hello" 
                maxLength={80} 
                value={message} 
                onChange={handleMessageChange}
              />
              <Box mt={"20px"}>
                {address ? (
                  <Web3Button
                    contractAddress={contractAddress}
                    action={(contract) => {
                      contract.call("leaveTip", [message, name], {value: ethers.utils.parseEther("0.01")})
                    }}
                    onSuccess={() => clearValues()}
                    colorScheme={"blue"}
                    size={"lg"}
                  >
                    {"Leave a 0.01 ETH tip"}
                  </Web3Button>
                ) : (
                  <Text>Please connect your wallet</Text>
                )}
              </Box>
            </CardBody>
          </Card>
        </Box>

        {/* <-- // Display messages --> */}
        <Box>
          <Card maxH={"60vh"} overflow={"scroll"}>
            <CardBody>
              <Text fontWeight={"bold"} color={"blue.500"}>Recent Messages:</Text>
              {!loadingRecentTips ? (
                <Box>
                  {recentTips && recentTips.map((tips:any, index:number) => {
                    return (
                      <Card key={index} my={"10px"} bg={"blue.100"} p={"10px"} borderRadius={"md"}>
                        <CardBody>
                          <Text fontSize={"xl"} fontWeight={"bold"} color={"blue.500"}>{tips[1]}</Text>
                          <Text fontSize={"md"}>From: {tips[2]}</Text>
                        </CardBody>
                      </Card>
                    )
                  }).reverse()}
                </Box>
              ) : (
                <Stack>
                  <Skeleton height={"100px"} />
                  <Skeleton height={"100px"} />
                  <Skeleton height={"100px"} />
                </Stack>
              )}
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default Home;