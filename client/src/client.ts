import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "61d941252b3c2ee1b017e5ce82faab7a";

export const client = createThirdwebClient({
  clientId: clientId,
});
