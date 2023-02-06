import "@/styles/globals.css";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Goerli}
      chainRpc={{
        [ChainId.Goerli]:
          "https://goerli.infura.io/v3/1ad23bb5016a4630aa6141ed368aa603",
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
