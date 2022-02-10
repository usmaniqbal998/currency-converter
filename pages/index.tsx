import type { NextPage } from "next";
import { useEffect } from "react";
import Fetch from "../src/axios";

const Home: NextPage = () => {
  useEffect(() => {
    Fetch.get("/currencies/ticker", { params: { ids: "BTC" } })
      .then((data: any) => {
        console.log(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return <div>Hello Payconiq</div>;
};

export default Home;
