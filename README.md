This is a server side rendered app based on [Next.js](https://nextjs.org/) and Typescript

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Propblems with Nomics api

This app is using free tier of nomics api for currency conversion and currency history. Free tier has some problems that are stated below

- only 1 api call is allowed per second . therefore you might see setTimeout of 1 sec around my api calls else api give back errors
- I dont know why but currency to currency conversion is not possible for now , currency to crypto-currency is only allowed . try following url in your browser and you will see empty data in response. https://api.nomics.com/v1/currencies/ticker?key=4465e0ac22021c66a32691e2e3a4641d39c557ca&ids=EUR&convert=USD.

For further queries you can reach out to me anytime . Following is also a short video of project https://drive.google.com/file/d/1c_xNlZyZuYp-sPy8snDJWpE4xmwgAGZK/view?usp=sharing
