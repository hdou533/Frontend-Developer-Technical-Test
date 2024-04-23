# MR Frontend Developer Technical Test

[Check the Demo](https://frontend-developer-technical-test.vercel.app/)

## Built with

- Next.js
- React
- tailwindCSS
 
## Features

- A customer can add a product with a selected size to the cart
- When the page is first loaded there is no size selected.
- Successfully adding a product to the cart will populate this sized product in the mini cart section.
- Clicking Add to Cart without the size option selected will show an error message.
- Only one row for each product size selected within the mini cart. Quantities will be updated as the product is added multiple times.
- A customer can view a mini-cart of their selections.


### tailwindCSS config

Define customized colors
```
theme: {
    colors: {
      header: '#F6F6F7',
      fontDark: '#222222',
      fontGrey: '#888888',
      requiredStar: '#C90000',
      borderLight: '#CCCCCC',
      borderDark: '#222222',
      white: '#FFFFFF'
    },
}
```

### nextjs config

Configure image host 

```
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com',
             
            },
        ],
    }
};
```
## Usage

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
